#!/usr/bin/env node
/**
 * Compress report-card static media in public/:
 * - raster images → ~50% of original bytes (quality search)
 * - mp4 videos (except *_old*) → ~25% of original bytes (video bitrate from duration)
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

const videosOnly = process.argv.includes('--videos-only')
const imagesOnly = process.argv.includes('--images-only')
const dirsArg = process.argv.find((a) => a.startsWith('--dirs='))
const dirFilter = dirsArg
  ? dirsArg
      .slice('--dirs='.length)
      .split(',')
      .map((d) => d.replace(/^\/+/, ''))
  : null
const excludeArg = process.argv.find((a) => a.startsWith('--exclude-prefixes='))
const excludePrefixes = excludeArg
  ? excludeArg.slice('--exclude-prefixes='.length).split(',')
  : []

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.JPG', '.JPEG', '.PNG', '.WEBP', '.GIF'])
const IMAGE_DIRS = ['images', 'icons', 'logos', 'backgrounds'].map((d) => path.join(publicDir, d))
const VIDEO_DIR = path.join(publicDir, 'videos')
const SKIP_VIDEO = /^video_old/i

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts })
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} failed: ${r.stderr || r.stdout}`)
  }
  return r.stdout?.trim() ?? ''
}

function compressJpeg(inPath, targetBytes) {
  let lo = 35
  let hi = 92
  let best = null
  const tmp = `${inPath}.compress.tmp.jpg`
  while (lo <= hi) {
    const q = Math.floor((lo + hi) / 2)
    run('magick', [inPath, '-strip', '-interlace', 'Plane', '-quality', String(q), tmp])
    const sz = fs.statSync(tmp).size
    if (sz <= targetBytes) {
      best = { q, sz, tmp }
      lo = q + 1
    } else {
      hi = q - 1
    }
  }
  if (!best) {
    run('magick', [inPath, '-strip', '-quality', '50', tmp])
    best = { q: 50, sz: fs.statSync(tmp).size, tmp }
  }
  fs.renameSync(tmp, inPath)
  return best
}

function compressWebp(inPath, targetBytes) {
  let lo = 40
  let hi = 90
  let best = null
  const tmp = `${inPath}.compress.tmp.webp`
  while (lo <= hi) {
    const q = Math.floor((lo + hi) / 2)
    run('cwebp', ['-q', String(q), '-m', '6', inPath, '-o', tmp])
    const sz = fs.statSync(tmp).size
    if (sz <= targetBytes) {
      best = { q, sz, tmp }
      lo = q + 1
    } else {
      hi = q - 1
    }
  }
  if (!best) {
    run('cwebp', ['-q', '45', '-m', '6', inPath, '-o', tmp])
    best = { q: 45, sz: fs.statSync(tmp).size, tmp }
  }
  fs.renameSync(tmp, inPath)
  return best
}

function compressPng(inPath, targetBytes) {
  const tmp = `${inPath}.compress.tmp.png`
  // PNG: try JPEG-like quality via magick for photo PNGs; icons stay lossless-ish with max deflate
  let lo = 50
  let hi = 95
  let best = null
  while (lo <= hi) {
    const q = Math.floor((lo + hi) / 2)
    run('magick', [
      inPath,
      '-strip',
      '-define',
      'png:compression-level=9',
      '-quality',
      String(q),
      tmp,
    ])
    const sz = fs.statSync(tmp).size
    if (sz <= targetBytes) {
      best = { q, sz, tmp }
      lo = q + 1
    } else {
      hi = q - 1
    }
  }
  if (!best) {
    run('magick', [inPath, '-strip', '-define', 'png:compression-level=9', '-quality', '60', tmp])
    best = { q: 60, sz: fs.statSync(tmp).size, tmp }
  }
  fs.renameSync(tmp, inPath)
  return best
}

function compressGif(inPath, targetBytes) {
  // Avoid -coalesce on long animations (can hang / use huge RAM). Fast optimize only.
  const tmp = `${inPath}.compress.tmp.gif`
  run('magick', [inPath, '-layers', 'Optimize', tmp])
  const sz = fs.statSync(tmp).size
  if (sz < fs.statSync(inPath).size) {
    fs.renameSync(tmp, inPath)
  } else {
    fs.unlinkSync(tmp)
  }
  return { sz: fs.statSync(inPath).size }
}

function compressImage(inPath) {
  const before = fs.statSync(inPath).size
  if (before < 8 * 1024) return { before, after: before, skipped: 'tiny' }
  const target = Math.floor(before * 0.5)
  const ext = path.extname(inPath)
  if (ext === '.gif' || ext === '.GIF') {
    compressGif(inPath, target)
  } else if (ext === '.webp' || ext === '.WEBP') {
    compressWebp(inPath, target)
  } else if (ext === '.png' || ext === '.PNG') {
    compressPng(inPath, target)
  } else {
    compressJpeg(inPath, target)
  }
  const after = fs.statSync(inPath).size
  return { before, after }
}

function videoDurationSec(inPath) {
  const out = run('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    inPath,
  ])
  return parseFloat(out) || 0
}

function compressVideo(inPath) {
  const before = fs.statSync(inPath).size
  const target = Math.floor(before * 0.25)
  const duration = videoDurationSec(inPath)
  if (duration <= 0) throw new Error(`no duration: ${inPath}`)

  // Reserve ~96 kbps for audio if present
  const hasAudio =
    run('ffprobe', [
      '-v',
      'error',
      '-select_streams',
      'a',
      '-show_entries',
      'stream=codec_type',
      '-of',
      'csv=p=0',
      inPath,
    ]).length > 0

  const audioKbps = hasAudio ? 96 : 0
  const videoKbps = Math.max(
    200,
    Math.floor((target * 8) / duration / 1000 - audioKbps),
  )

  const tmp = `${inPath}.compress.tmp.mp4`
  const args = [
    '-y',
    '-i',
    inPath,
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-b:v',
    `${videoKbps}k`,
    '-maxrate',
    `${Math.floor(videoKbps * 1.45)}k`,
    '-bufsize',
    `${videoKbps * 2}k`,
  ]
  if (hasAudio) {
    args.push('-c:a', 'aac', '-b:a', `${audioKbps}k`)
  } else {
    args.push('-an')
  }
  args.push(tmp)

  run('ffmpeg', args, { stdio: 'pipe' })

  let after = fs.statSync(tmp).size
  // If still too large, second pass with lower bitrate
  if (after > target * 1.15) {
    const v2 = Math.max(150, Math.floor(videoKbps * 0.75))
    fs.unlinkSync(tmp)
    const args2 = [...args]
    const bi = args2.indexOf(`${videoKbps}k`)
    args2[bi] = `${v2}k`
    args2[bi + 2] = `${Math.floor(v2 * 1.45)}k`
    args2[bi + 4] = `${v2 * 2}k`
    run('ffmpeg', args2, { stdio: 'pipe' })
    after = fs.statSync(tmp).size
  }

  fs.renameSync(tmp, inPath)
  return { before, after, videoKbps, hasAudio }
}

function underDirFilter(relFromPublic) {
  if (!dirFilter?.length) return true
  return dirFilter.some((d) => relFromPublic === d || relFromPublic.startsWith(`${d}/`))
}

let imagePaths = IMAGE_DIRS.flatMap((d) => walk(d)).filter((p) => {
  if (!IMAGE_EXT.has(path.extname(p))) return false
  const base = path.basename(p)
  if (excludePrefixes.some((pre) => base.startsWith(pre))) return false
  return true
})
let videoPaths = walk(VIDEO_DIR).filter(
  (p) => path.extname(p).toLowerCase() === '.mp4' && !SKIP_VIDEO.test(path.basename(p)),
)

if (dirFilter) {
  imagePaths = imagePaths.filter((p) => underDirFilter(path.relative(publicDir, p)))
  videoPaths = videoPaths.filter((p) => underDirFilter(path.relative(publicDir, p)))
}
if (videosOnly) imagePaths = []
if (imagesOnly) videoPaths = []

console.log(`Images: ${imagePaths.length}, videos: ${videoPaths.length}\n`)

let imgBefore = 0
let imgAfter = 0
for (const p of imagePaths) {
  try {
    const rel = path.relative(root, p)
    process.stdout.write(`… ${rel}\r`)
    const r = compressImage(p)
    imgBefore += r.before
    imgAfter += r.after
    const pct = r.before ? Math.round((100 * r.after) / r.before) : 100
    console.log(`img ${rel}  ${formatKb(r.before)} → ${formatKb(r.after)} (${pct}%)`)
  } catch (e) {
    console.error(`img FAIL ${p}: ${e.message}`)
  }
}

let vidBefore = 0
let vidAfter = 0
if (videoPaths.length) console.log('--- videos (target ~25% of original size) ---')
for (const p of videoPaths) {
  try {
    const rel = path.relative(root, p)
    const r = compressVideo(p)
    vidBefore += r.before
    vidAfter += r.after
    const pct = r.before ? Math.round((100 * r.after) / r.before) : 100
    console.log(
      `vid ${rel}  ${formatMb(r.before)} → ${formatMb(r.after)} (${pct}%, ~${r.videoKbps}k v${r.hasAudio ? '+a' : ''})`,
    )
  } catch (e) {
    console.error(`vid FAIL ${p}: ${e.message}`)
  }
}

console.log('\n--- totals ---')
console.log(
  `images: ${formatMb(imgBefore)} → ${formatMb(imgAfter)} (${pct(imgBefore, imgAfter)}%)`,
)
console.log(
  `videos: ${formatMb(vidBefore)} → ${formatMb(vidAfter)} (${pct(vidBefore, vidAfter)}%)`,
)

function formatKb(n) {
  return `${(n / 1024).toFixed(0)} KB`
}
function formatMb(n) {
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}
function pct(a, b) {
  return a ? Math.round((100 * b) / a) : 100
}

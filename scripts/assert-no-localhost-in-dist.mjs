import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const BUILD_ROOTS = ['dist', 'dist-edition']

function collectAssetsDirs(dir) {
  const dirs = []
  if (!fs.existsSync(dir)) return dirs
  const assets = path.join(dir, 'assets')
  if (fs.existsSync(assets)) dirs.push(assets)
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!name.isDirectory() || name.name === 'assets') continue
    dirs.push(...collectAssetsDirs(path.join(dir, name.name)))
  }
  return dirs
}

const assetsDirs = BUILD_ROOTS.flatMap((name) =>
  collectAssetsDirs(path.join(root, name))
)

if (!assetsDirs.length) {
  console.warn('assert-no-localhost-in-dist: no build assets, skipping')
  process.exit(0)
}

const bad = []
for (const assetsDir of assetsDirs) {
  const rel = path.relative(root, assetsDir)
  for (const name of fs.readdirSync(assetsDir)) {
    if (!name.endsWith('.js')) continue
    const text = fs.readFileSync(path.join(assetsDir, name), 'utf8')
    if (/localhost:\d+/.test(text)) bad.push(`${rel}/${name}`)
  }
}

if (bad.length) {
  console.error(
    'Build embeds localhost in the bundle (map iframe will not work on Netlify):\n' +
      bad.map((f) => `  ${f}`).join('\n') +
      '\n\nUse `.env.development.local` for dev only, not `.env.local`.\n' +
      'Production map URL: `.env.production` or `.env.production.local`.'
  )
  process.exit(1)
}

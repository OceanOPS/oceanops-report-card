/**
 * npm run build           → /goosreport/              (dist/)
 * npm run build -- 2027   → /goosreport/ + edition   (dist/ + dist-edition/)
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

const EDITION_OUT_DIR = 'dist-edition'

const edition = process.argv[2]?.trim()
if (edition && !/^\d{4}$/.test(edition)) {
  console.error('Edition must be a 4-digit year, e.g. npm run build -- 2027')
  process.exit(1)
}

function run(command, args, extraEnv = {}) {
  const r = spawnSync(command, args, {
    stdio: 'inherit',
    env: { ...process.env, ...extraEnv },
  })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

run('npx', ['tsc'])

if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true })
if (fs.existsSync(EDITION_OUT_DIR)) fs.rmSync(EDITION_OUT_DIR, { recursive: true })

run('npx', ['vite', 'build'], { VITE_BASE_PATH: '/goosreport/' })

if (edition) {
  run('npx', ['vite', 'build', '--outDir', EDITION_OUT_DIR], {
    VITE_EDITION: edition,
  })
}

run('node', ['scripts/assert-no-localhost-in-dist.mjs'])

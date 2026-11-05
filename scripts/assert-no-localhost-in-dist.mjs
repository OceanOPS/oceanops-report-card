import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const assetsDir = path.join(root, 'dist', 'assets')

if (!fs.existsSync(assetsDir)) {
  console.warn('assert-no-localhost-in-dist: dist/assets missing, skipping')
  process.exit(0)
}

const bad = []
for (const name of fs.readdirSync(assetsDir)) {
  if (!name.endsWith('.js')) continue
  const text = fs.readFileSync(path.join(assetsDir, name), 'utf8')
  if (/localhost:\d+/.test(text)) bad.push(name)
}

if (bad.length) {
  console.error(
    'Build embeds localhost in the bundle (map iframe will not work on Netlify):\n' +
      bad.map((f) => `  dist/assets/${f}`).join('\n') +
      '\n\nUse `.env.development.local` for dev only, not `.env.local`.\n' +
      'Production map URL: `.env.production` or `.env.production.local`.'
  )
  process.exit(1)
}

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function normalizeBase(path: string | undefined): string {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path : `${path}/`
}

function resolveBase(mode: string, env: Record<string, string>): string {
  const explicit = env.VITE_BASE_PATH?.trim()
  if (explicit) return normalizeBase(explicit)
  const edition = env.VITE_EDITION?.trim()
  if (edition) return `/goosreport/${edition}/`
  if (mode === 'production') return '/goosreport/'
  return '/'
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: resolveBase(mode, env),
  }
})

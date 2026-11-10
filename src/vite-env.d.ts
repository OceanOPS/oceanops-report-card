/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_SRC?: string
  /** Optional; usually set at build time via env, not read in app code. */
  readonly VITE_BASE_PATH?: string
  readonly VITE_EDITION?: string
}

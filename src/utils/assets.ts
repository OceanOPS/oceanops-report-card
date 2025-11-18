/**
 * Asset path helper for base URL resolution
 *
 * Prepends the Vite base URL to asset paths for deployment to subdirectories.
 * When base is '/', paths remain unchanged.
 * When base is '/demos/report-card/', paths get that prefix.
 *
 * @param p - Asset path starting with '/'
 * @returns Full path with base URL prepended
 *
 * @example
 * // In staging (base = '/')
 * asset('/images/photo.jpg') // → '/images/photo.jpg'
 *
 * // In production (base = '/demos/report-card/')
 * asset('/images/photo.jpg') // → '/demos/report-card/images/photo.jpg'
 */
export const asset = (p: string) =>
  `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`

import { env } from "../config/env"

// The API is mounted under /api; static uploads are served from the API's origin, not under /api.
const API_ORIGIN = env.apiBaseUrl.replace(/\/api\/?$/, "")

/**
 * Resolves an image/asset URL stored on a record. Full external URLs (Cloudinary, Imgur, …)
 * pass through untouched; a relative path like "/uploads/projects/foo.jpg" is resolved
 * against the backend's origin, since that's where the shared uploads folder is served from.
 */
export function resolveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`
  return url
}

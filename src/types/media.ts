export interface MediaAsset {
  id: string;
  key: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedById: string | null;
  createdAt: string;
}

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB — matches backend default

export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

/** Human-readable list for the <input accept="..."> attribute. */
export const ACCEPTED_IMAGE_EXTENSIONS = ".png,.jpg,.jpeg,.webp,.gif,.avif";

/** Pretty-print a MIME type map → file extension. */
export function extensionForMime(mime: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
    "video/mp4": "mp4",
    "image/svg+xml": "svg",
  };
  return map[mime] ?? mime;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

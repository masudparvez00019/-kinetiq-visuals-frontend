import { apiClient } from "@/lib/axios";
import type { MediaAsset } from "@/types/media";

export const mediaService = {
  /**
   * Upload a single file to the backend's object storage.
   * Returns the asset record (id, url, key, mimeType, size, ...).
   *
   * The backend's `MediaService.upload` sniffs the file's actual content via
   * magic numbers rather than trusting the declared Content-Type, so we send
   * the original `File` object with its native MIME.
   */
  async upload(file: File): Promise<MediaAsset> {
    const form = new FormData();
    form.append("file", file);

    const { data } = await apiClient.post<MediaAsset>(
      "/admin/media/upload",
      form,
      {
        // Let the browser/axios set the correct multipart boundary.
        headers: { "Content-Type": undefined },
        // Multipart uploads are slower — give it more time.
        timeout: 60_000,
      },
    );
    return data;
  },
};

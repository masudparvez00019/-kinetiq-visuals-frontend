import { apiClient } from "@/lib/axios";
import type {
  SiteConfig,
  UpdateSiteConfigPayload,
} from "@/types/site-config";

export const siteConfigService = {
  /** Admin: fetch the singleton site config. */
  async get(): Promise<SiteConfig> {
    const { data } = await apiClient.get<SiteConfig>("/admin/site-config");
    return data;
  },

  /** Admin: partial update of any number of fields. */
  async update(payload: UpdateSiteConfigPayload): Promise<SiteConfig> {
    const { data } = await apiClient.patch<SiteConfig>(
      "/admin/site-config",
      payload,
    );
    return data;
  },
};
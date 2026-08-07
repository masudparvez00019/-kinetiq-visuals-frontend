import { apiClient } from "@/lib/axios";
import type {
  SiteConfig,
  UpdateSiteConfigPayload,
} from "@/types/site-config";

/** Module-level in-memory cache — persists for the lifetime of the JS bundle session. */
let _cache: SiteConfig | null = null;
/** Inflight promise — deduplicate simultaneous calls on the same tick. */
let _inflight: Promise<SiteConfig> | null = null;

export const siteConfigService = {
  /**
   * Fetch the public site config.
   * Uses the public /site-config endpoint (no auth needed).
   * Caches the result for the session lifetime — no repeated API calls.
   */
  async get(): Promise<SiteConfig> {
    if (_cache) return _cache;
    if (_inflight) return _inflight;

    _inflight = apiClient
      .get<SiteConfig>("/site-config")
      .then(({ data }) => {
        _cache = data;
        _inflight = null;
        return data;
      })
      .catch((err) => {
        _inflight = null;
        throw err;
      });

    return _inflight;
  },

  /** Admin: partial update. Updates the cache with saved data. */
  async update(payload: UpdateSiteConfigPayload): Promise<SiteConfig> {
    const { data } = await apiClient.patch<SiteConfig>(
      "/admin/site-config",
      payload,
    );
    _cache = data;
    return data;
  },

  /** Manually invalidate cache (e.g. after admin logout). */
  invalidate() {
    _cache = null;
    _inflight = null;
  },
};
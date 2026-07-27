import axios, { type AxiosError } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://kinetiq-api.saikat.com.bd/api/v1";

/**
 * The backend wraps every response (success + error) in an envelope:
 *   {
 *     success: boolean,
 *     statusCode: number,
 *     message: string | string[],
 *     data: <real payload>,
 *     meta: { timestamp, path, responseTime, requestId },
 *     error?: { code, details }
 *   }
 *
 * Unwrap `.data` on the way out so services can use the real payload type
 * directly (e.g. LoginResponse, DashboardStats) instead of dealing with the
 * envelope everywhere.
 */
type Envelope<T> = {
  success?: boolean;
  statusCode?: number;
  message?: string | string[];
  data?: T;
  error?: { code?: string; details?: unknown };
  meta?: Record<string, unknown>;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // backend sets HttpOnly session cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20_000,
});

/**
 * Attach the access token (from login response) to every request that
 * needs it. Reads from localStorage so it survives reloads.
 */
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("kq_access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/**
 * Unwrap the standard envelope so `response.data` becomes the real payload.
 *
 * Two envelope shapes are recognised:
 *  1. Plain envelope — `{ success, message, data: <payload>, meta }`
 *     → `response.data` becomes `<payload>`
 *  2. Paginated envelope — `{ success, message, data: T[], pagination: {...}, meta }`
 *     → `response.data` becomes `{ data: T[], total, page, limit, totalPages,
 *                                  hasNextPage, hasPrevPage }`
 *
 * If the response is not an envelope (e.g. a raw response), pass it through.
 */
type PaginatedEnvelope = Envelope<unknown[]> & {
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

function isPaginatedEnvelope(body: unknown): body is PaginatedEnvelope {
  return (
    body !== null &&
    typeof body === "object" &&
    "data" in (body as object) &&
    Array.isArray((body as PaginatedEnvelope).data) &&
    "pagination" in (body as object)
  );
}

function isPlainEnvelope(body: unknown): body is Envelope<unknown> {
  if (body === null || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const hasData = "data" in b;
  const looksLikeEnvelope =
    "success" in b || "message" in b || "meta" in b || "statusCode" in b;
  return hasData && looksLikeEnvelope;
}

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;

    if (isPaginatedEnvelope(body)) {
      const items = body.data ?? [];
      response.data = {
        data: items,
        total: body.pagination?.total ?? items.length,
        page: body.pagination?.page ?? 1,
        limit: body.pagination?.limit ?? items.length,
        totalPages: body.pagination?.totalPages ?? 1,
        hasNextPage: body.pagination?.hasNextPage ?? false,
        hasPrevPage: body.pagination?.hasPrevPage ?? false,
      };
      return response;
    }

    if (isPlainEnvelope(body)) {
      response.data = body.data ?? null;
    }
    return response;
  },
  (error) => {
    // 401 = token missing/invalid/expired. We catch this globally so the user
    // doesn't end up staring at a half-rendered admin page after a server-side
    // revocation, a password reset, or a tokenVersion bump in the backend.
    //
    // Only redirect from admin routes — never from the public storefront, the
    // login page, or the public `POST /messages` (contact form) so transient
    // 401s don't bounce users off pages that don't actually need auth.
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      // Clear the token everywhere before navigating so we don't loop.
      try {
        window.localStorage.removeItem("kq_access_token");
        window.localStorage.removeItem("kq_auth_user");
        window.sessionStorage.removeItem("kq_access_token");
        document.cookie =
          "kq_admin_token=; Path=/; SameSite=Lax; Max-Age=0";
      } catch {
        // Ignore storage clear failures — the navigation will still happen.
      }
      const target = `/login?from=${encodeURIComponent(window.location.pathname + window.location.search)}`;
      // Use replace-style assignment so the broken page doesn't sit in history.
      window.location.assign(target);
    }
    return Promise.reject(error);
  },
);

/** Normalize any axios error into a user-friendly message. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    const ax = error as AxiosError<Envelope<unknown>>;
    const data = ax.response?.data;

    if (data) {
      // Forge-style envelope: { message: "...", error: { code, details } }
      if (typeof data.message === "string") return data.message;
      if (Array.isArray(data.message) && data.message.length) return data.message[0];

      // Some Nest error shapes nest it under .data.message
      const inner = (data as Envelope<unknown>).data as
        | { message?: string | string[] }
        | undefined;
      if (inner) {
        if (typeof inner.message === "string") return inner.message;
        if (Array.isArray(inner.message) && inner.message.length) return inner.message[0];
      }
    }

    if (ax.code === "ERR_NETWORK") return "Network error. Check your connection.";
    if (ax.code === "ECONNABORTED") return "Request timed out. Please try again.";
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
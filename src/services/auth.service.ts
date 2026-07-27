import { apiClient } from "@/lib/axios";
import type { LoginPayload, LoginResponse } from "@/types/auth";

const TOKEN_KEY = "kq_access_token";
const USER_KEY = "kq_auth_user";

/**
 * Mirror the access token into a non-HttpOnly cookie so Next.js middleware
 * can read it on the server (Edge runtime). Middleware can't see
 * `localStorage`. We're keeping this in a parallel cookie *in addition to*
 * localStorage — the cookie is only used for the route-guard, while the
 * Authorization header on API calls still reads from localStorage.
 *
 * Notes:
 *  - `SameSite=Lax` allows the cookie to follow same-site navigations from
 *    `/login` to `/admin` (which is a same-site GET).
 *  - `Secure` is set in production so it only travels over HTTPS.
 *  - `Path=/` so middleware's `cookies().get()` picks it up regardless of
 *    the matched route prefix.
 */
const ADMIN_COOKIE = "kq_admin_token";

function writeAdminCookie(token: string, remember: boolean) {
  if (typeof document === "undefined") return;
  const maxAge = remember
    ? // 7 days — mirrors the persist lifespan localStorage already gives us.
      60 * 60 * 24 * 7
    : // Session cookie when "remember me" is unchecked.
      undefined;
  const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
  const maxAgeAttr = maxAge != null ? `; Max-Age=${maxAge}` : "";
  document.cookie = `${ADMIN_COOKIE}=${encodeURIComponent(token)}; Path=/; SameSite=Lax${secureFlag}${maxAgeAttr}`;
}

function clearAdminCookie() {
  if (typeof document === "undefined") return;
  // Past expiry drops the cookie regardless of Secure flag.
  document.cookie = `${ADMIN_COOKIE}=; Path=/; SameSite=Lax; Max-Age=0`;
}

/** Read the admin cookie (server- and client-safe, for shared logic). */
function readAdminCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${ADMIN_COOKIE}=`));
  if (!match) return null;
  const raw = match.slice(ADMIN_COOKIE.length + 1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", {
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
    });
    return data;
  },

  persistSession(response: LoginResponse, remember: boolean) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(TOKEN_KEY, response.accessToken);
    window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    if (!remember) {
      // Mirror token to sessionStorage so it's cleared when the tab closes.
      window.sessionStorage.setItem(TOKEN_KEY, response.accessToken);
    }
    // Also mirror to a cookie that Next middleware can read.
    writeAdminCookie(response.accessToken, remember);
  },

  clearSession() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    clearAdminCookie();
  },

  getStoredUser(): import("@/types/auth").AuthUser | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as import("@/types/auth").AuthUser;
    } catch {
      return null;
    }
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },

  /**
   * True if either storage (localStorage) or the mirrored cookie still has a
   * token. We accept the cookie as proof so server-side middleware has a
   * symmetric counterpart, but auth-guarded client code prefers localStorage
   * because the middleware cookie intentionally isn't HttpOnly (we want JS to
   * be able to clear it).
   */
  isAuthenticated(): boolean {
    const fromStorage = this.getStoredToken();
    if (fromStorage) return true;
    return readAdminCookie() != null;
  },
};

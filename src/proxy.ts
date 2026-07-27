import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge proxy that guards every `/admin/*` route (except the legacy
 * `/admin/login` redirect, which itself bounces to `/login`). Unauthenticated
 * visitors are redirected to `/login` with a `?from=…` query so the login
 * page can optionally bounce them back after a successful sign-in.
 *
 * Auth state is tracked via the `kq_admin_token` cookie, which `authService`
 * mirrors whenever it persists or clears the access token. Edge proxy runs
 * before the page renders and can't read `localStorage`, which is why we
 * keep the cookie in sync.
 *
 * The proxy intentionally does NOT validate the JWT signature. That's the
 * backend's job on the first authenticated request. Here we only check "is
 * there *any* token present" so we can short-circuit before the page renders.
 * The actual API calls (which DO validate signatures) will catch stale or
 * forged tokens and the axios interceptor will then route the user to
 * `/login`.
 */
const ADMIN_COOKIE = "kq_admin_token";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // The legacy `/admin/login` route renders a one-line redirect to /login,
  // so we let it pass through (it doesn't need a token).
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const hasToken = req.cookies.get(ADMIN_COOKIE)?.value;
  if (hasToken) {
    return NextResponse.next();
  }

  // Build the redirect target. Encode the current path (with query) so the
  // login page can route the user back after a successful sign-in.
  const target = new URL("/login", req.url);
  target.searchParams.set("from", pathname + search);
  return NextResponse.redirect(target);
}

/**
 * Only run this proxy on `/admin/*` so the public storefront
 * (`/`, `/products`, `/course`, `/contact`) isn't impacted by it.
 */
export const config = {
  matcher: ["/admin/:path*"],
};

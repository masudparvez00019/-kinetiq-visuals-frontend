import { redirect } from "next/navigation";

/**
 * Admin login is disabled. This single-admin app uses the unified
 * /login route (under the (auth-layout) group) for all authentication.
 * Visiting /admin/login simply bounces the user to /login.
 */
export default function AdminLoginPage(): never {
  redirect("/login");
}

"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppStore } from "@/context/store";
import { messagesService } from "@/services/messages.service";
import { realtime } from "@/services/realtime.service";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import {
  LayoutDashboard,
  Package,
  GraduationCap,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ExternalLink,
  Bell,
  Calendar as CalendarIcon,
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Course", href: "/admin/course", icon: GraduationCap },
  { name: "Inbox", href: "/admin/messages", icon: Inbox },
  { name: "Page Content", href: "/admin/content", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { messages: _legacyMessages } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  /**
   * Client-side auth gate. The Next middleware also guards `/admin/*` server
   * side, but this catches the corner case where someone hot-reloads the
   * page after clearing localStorage in DevTools, or where the cookie and
   * localStorage drift out of sync.
   *
   * The gate runs only on the client; on the very first render we don't yet
   * know the storage state (SSR has no `window`), so we wait one tick before
   * deciding to redirect.
   */
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      const target = `/login?from=${encodeURIComponent(pathname)}`;
      router.replace(target);
      return;
    }
    setAuthChecked(true);
  }, [pathname, router]);

  /**
   * Live unread badge count from `/admin/messages/unread-count`.
   * Refreshes on mount and whenever the user navigates within the dashboard
   * (so a freshly-read message in /admin/messages updates the bell).
   */
  const refreshUnread = useCallback(async () => {
    try {
      const count = await messagesService.unreadCount();
      setUnreadCount(count);
    } catch (err) {
      // Silent failure — the badge just won't update. Avoid spamming the user
      // with errors from a non-critical decoration.
      // eslint-disable-next-line no-console
      console.warn("Could not refresh unread count:", getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    refreshUnread();
  }, [refreshUnread, pathname]);

  /**
   * Open the realtime socket once the user is authenticated, keep the bell
   * badge + Sonner toasts in sync with backend events, and tear the
   * connection down on logout / unmount.
   */
  useEffect(() => {
    const token = authService.getStoredToken();
    if (!token) return;

    const socket = realtime.connect(token);

    const offNew = realtime.onNewMessage((payload) => {
      // Bump the badge locally so it updates instantly without re-fetching
      // the unread-count endpoint.
      setUnreadCount((prev) => prev + 1);
      const name = `${payload.firstName} ${payload.lastName}`.trim() || "Someone";
      toast.success(`New message from ${name}`, {
        description: payload.message.length > 80
          ? `${payload.message.slice(0, 80)}…`
          : payload.message,
        action: {
          label: "Open",
          onClick: () => {
            window.location.href = "/admin/messages";
          },
        },
      });
    });

    const offUpdated = realtime.onMessageUpdated((payload) => {
      // If the message just became read, drop the count; if it became
      // unread again, bump it. This mirrors the backend's source of truth.
      setUnreadCount((prev) => prev + (payload.isRead ? -1 : 1));
    });

    const offDeleted = realtime.onMessageDeleted(() => {
      // Best effort: re-sync from the server so we never over-count after a
      // delete (the optimistic decrement below would otherwise be wrong if
      // the deleted message was already read).
      refreshUnread();
    });

    const handleConnect = () => {
      // Quietly re-sync once we're sure the socket is authenticated so the
      // badge reflects the latest server state (covers cases where the bell
      // was stale before the socket came up).
      refreshUnread();
    };

    socket.on("connect", handleConnect);

    return () => {
      offNew();
      offUpdated();
      offDeleted();
      socket.off("connect", handleConnect);
      realtime.disconnect();
    };
  }, [refreshUnread]);

  const handleLogout = () => {
    // Drop the realtime connection first so the server doesn't keep emitting
    // to a dead admin, then wipe local credentials and bounce to /login.
    realtime.disconnect();
    authService.clearSession();
    window.location.href = "/login";
  };

  const getPageTitle = () => {
    if (pathname === "/admin") return "Overview Dashboard";
    if (pathname === "/admin/products") return "Product Catalog CMS";
    if (pathname === "/admin/course") return "Course Curriculum Builder";
    if (pathname === "/admin/messages") return "Inbox Messages";
    if (pathname === "/admin/content") return "Page Content Settings";
    return "Admin Portal";
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Render a neutral placeholder while we verify the session on the client.
  // The middleware handles the SSR case; this just covers the brief window
  // between hydration and the auth check so we don't flash the nav bar.
  if (!authChecked) {
    return (
      <div className="min-h-screen w-full bg-[#020310] flex items-center justify-center">
        <span className="font-satoshi text-xs text-slate-500">Loading…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020310] flex text-white font-sans relative overflow-x-hidden">
      {/* Background glow overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0040cc]/10 blur-[130px] rounded-full" />
      </div>

      {/* MOBILE HEADER BAR */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#070914]/90 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-5 z-40">
        <span className="font-logo font-normal tracking-wide text-white uppercase text-xl">
          KQ ADMIN
        </span>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-slate-400 hover:text-white p-1"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* SIDEBAR NAVIGATION (Desktop & Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 h-screen bg-[#070914] border-r border-white/5 flex flex-col pt-6 pb-0 px-5 z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:block"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between">
            <span className="font-logo font-normal tracking-normal text-white uppercase text-2xl">
              KQ VISUALS
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-2 mb-2">
              Management
            </span>
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-satoshi text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#0080ff] text-white shadow-[0_0_20px_rgba(0,128,255,0.30)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Profile / Logout) — anchored to the bottom with extra breathing room */}
        <div className="mt-auto flex flex-col gap-4 border-t border-white/5 pt-5 pb-24">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-2">
            Session
          </span>

          {/* Profile Card */}
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
              <User className="w-4 h-4 text-[#0080ff]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-satoshi text-xs font-bold text-white truncate leading-tight">
                Jowel Mahmud
              </span>
              <span className="font-satoshi text-[9px] text-slate-500 font-light truncate mt-0.5 leading-none">
                Founder & CEO
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2.5 w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/20 text-red-400 hover:text-red-300 font-heading font-normal text-xs py-3 rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* MAIN VIEWPORT */}
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 lg:pl-64 flex flex-col relative z-10">
        
        {/* DESKTOP/LAPTOP TOP NAVBAR */}
        <header className="w-full bg-[#070914]/40 border-b border-white/5 backdrop-blur-md sticky top-0 z-30 px-5 md:px-8 py-3.5 flex items-center justify-between">
          {/* Left: Active Section Title */}
          <span className="font-satoshi text-xs md:text-sm font-bold text-white select-none">
            {getPageTitle()}
          </span>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-4">
            {/* Calendar */}
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 font-satoshi text-[11px] text-slate-400">
              <CalendarIcon className="w-3.5 h-3.5 text-[#0080ff]" />
              <span>{currentDate}</span>
            </div>

            {/* Notification Bell */}
            <Link
              href="/admin/messages"
              className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 text-slate-300 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white font-satoshi font-bold text-[8px] rounded-full flex items-center justify-center border border-[#020310] animate-bounce">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* View Live Site — opens the public storefront in a new tab */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="View Live Site"
              aria-label="View Live Site"
              className="group relative w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-[#0080ff]/40 text-slate-300 hover:text-white transition-all duration-300 hover:shadow-[0_0_14px_rgba(0,128,255,0.18)]"
            >
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#0080ff] transition-colors" />
            </a>

            {/* User Badge */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl pl-2 pr-3 py-1 shrink-0">
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <User className="w-3 h-3 text-[#0080ff]" />
              </div>
              <span className="font-satoshi text-[11px] text-slate-300 font-semibold select-none hidden md:inline">
                Jowel Mahmud
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT CONTAINER */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-5 py-6 md:px-8 md:py-8 flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}
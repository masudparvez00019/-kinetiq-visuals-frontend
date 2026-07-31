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
  Sun,
  Moon,
} from "lucide-react";
import { AdminThemeProvider, useAdminTheme } from "@/context/admin-theme-context";

const MENU_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Course", href: "/admin/course", icon: GraduationCap },
  { name: "Inbox", href: "/admin/messages", icon: Inbox },
  { name: "Page Content", href: "/admin/content", icon: Settings },
];

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { messages: _legacyMessages } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { theme, toggleTheme } = useAdminTheme();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      const target = `/login?from=${encodeURIComponent(pathname)}`;
      router.replace(target);
      return;
    }
    setAuthChecked(true);
  }, [pathname, router]);

  const refreshUnread = useCallback(async () => {
    try {
      const count = await messagesService.unreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.warn("Could not refresh unread count:", getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    refreshUnread();
  }, [refreshUnread, pathname]);

  useEffect(() => {
    const token = authService.getStoredToken();
    if (!token) return;

    const socket = realtime.connect(token);

    const offNew = realtime.onNewMessage((payload) => {
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
      setUnreadCount((prev) => prev + (payload.isRead ? -1 : 1));
    });

    const offDeleted = realtime.onMessageDeleted(() => {
      refreshUnread();
    });

    const handleConnect = () => {
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

  if (!authChecked) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${
        theme === "light" ? "bg-[#f8fafc] text-slate-600" : "bg-[#020310] text-slate-400"
      }`}>
        <span className="font-satoshi text-xs">Loading…</span>
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <div className={`min-h-screen w-full flex font-sans relative overflow-x-hidden transition-colors duration-300 ${
      isLight ? "bg-[#f8fafc] text-slate-900" : "bg-[#020310] text-white"
    }`}>
      {/* Background glow overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-0 left-0 w-[400px] h-[400px] blur-[130px] rounded-full ${
          isLight ? "bg-blue-400/10" : "bg-[#0040cc]/10"
        }`} />
      </div>

      {/* MOBILE HEADER BAR */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 h-16 border-b backdrop-blur-md flex items-center justify-between px-5 z-30 transition-colors duration-300 ${
        isLight ? "bg-white/90 border-slate-200 text-slate-900" : "bg-[#070914]/90 border-white/5 text-white"
      }`}>
        <span className={`font-logo font-normal tracking-wide uppercase text-xl ${
          isLight ? "text-slate-900" : "text-white"
        }`}>
          KQ ADMIN
        </span>
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
            aria-label="Toggle Theme"
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
              isLight
                ? "bg-slate-100 border-slate-300 text-amber-600 hover:bg-slate-200"
                : "bg-white/5 border-white/10 text-amber-400 hover:bg-white/10"
            }`}
          >
            {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            className={isLight ? "text-slate-600 hover:text-slate-900 p-1" : "text-slate-400 hover:text-white p-1"}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* SIDEBAR NAVIGATION (Desktop & Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 h-screen border-r flex flex-col pt-6 pb-0 px-5 transition-all duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 z-50" : "-translate-x-full lg:block z-20"
        } ${
          isLight
            ? "bg-white border-slate-200/80 text-slate-900 shadow-sm"
            : "bg-[#070914] border-white/5 text-white"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between">
            <span className={`font-logo font-normal tracking-normal uppercase text-2xl ${
              isLight ? "text-slate-900" : "text-white"
            }`}>
              KQ VISUALS
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className={isLight ? "lg:hidden text-slate-500 hover:text-slate-900 p-1" : "lg:hidden text-slate-400 hover:text-white p-1"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-widest pl-2 mb-2 ${
              isLight ? "text-slate-400" : "text-slate-500"
            }`}>
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
                      ? "bg-[#0080ff] text-white shadow-md font-bold"
                      : isLight
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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

        {/* Sidebar Footer (Profile / Logout) */}
        <div className={`mt-auto flex flex-col gap-4 border-t pt-5 pb-24 ${
          isLight ? "border-slate-200" : "border-white/5"
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest pl-2 ${
            isLight ? "text-slate-400" : "text-slate-500"
          }`}>
            Session
          </span>

          {/* Profile Card */}
          <div className={`flex items-center gap-3 rounded-xl p-3 border ${
            isLight
              ? "bg-slate-100/70 border-slate-200/80 text-slate-900"
              : "bg-white/5 border-white/5 text-white"
          }`}>
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
              <User className="w-4 h-4 text-[#0080ff]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`font-satoshi text-xs font-bold truncate leading-tight ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                Jowel Mahmud
              </span>
              <span className={`font-satoshi text-[9px] font-light truncate mt-0.5 leading-none ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}>
                Founder & CEO
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className={`flex items-center justify-center gap-2.5 w-full font-heading font-normal text-xs py-3 rounded-xl transition-all ${
              isLight
                ? "bg-red-50 hover:bg-red-100 border border-red-200 text-red-600"
                : "bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 text-red-400"
            }`}
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
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 lg:pl-64 flex flex-col relative">
        
        {/* DESKTOP/LAPTOP TOP NAVBAR */}
        <header className={`w-full border-b backdrop-blur-md sticky top-0 z-20 px-5 md:px-8 py-3.5 flex items-center justify-between transition-colors duration-300 ${
          isLight
            ? "bg-white/80 border-slate-200 text-slate-900 shadow-xs"
            : "bg-[#070914]/40 border-white/5 text-white"
        }`}>
          {/* Left: Active Section Title */}
          <span className={`font-satoshi text-xs md:text-sm font-bold select-none ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            {getPageTitle()}
          </span>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Switcher Button (Desktop) */}
            <button
              type="button"
              onClick={toggleTheme}
              title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
              aria-label="Toggle Theme"
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
                  : "bg-white/5 border-white/10 text-amber-400 hover:bg-white/10"
              }`}
            >
              {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Calendar */}
            <div className={`hidden sm:flex items-center gap-2 border rounded-xl px-3 py-1.5 font-satoshi text-[11px] ${
              isLight
                ? "bg-slate-100 border-slate-200 text-slate-600"
                : "bg-white/5 border-white/5 text-slate-400"
            }`}>
              <CalendarIcon className="w-3.5 h-3.5 text-[#0080ff]" />
              <span>{currentDate}</span>
            </div>

            {/* Notification Bell */}
            <Link
              href="/admin/messages"
              className={`relative w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white font-satoshi font-bold text-[8px] rounded-full flex items-center justify-center border border-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* View Live Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="View Live Site"
              aria-label="View Live Site"
              className={`group relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-blue-500/40"
                  : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-[#0080ff]/40"
              }`}
            >
              <ExternalLink className={`w-4 h-4 transition-colors ${
                isLight ? "text-slate-600 group-hover:text-[#0080ff]" : "text-slate-300 group-hover:text-[#0080ff]"
              }`} />
            </a>

            {/* User Badge */}
            <div className={`flex items-center gap-2 border rounded-xl pl-2 pr-3 py-1 shrink-0 ${
              isLight
                ? "bg-slate-100 border-slate-200"
                : "bg-white/5 border-white/5"
            }`}>
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <User className="w-3 h-3 text-[#0080ff]" />
              </div>
              <span className={`font-satoshi text-[11px] font-semibold select-none hidden md:inline ${
                isLight ? "text-slate-800" : "text-slate-300"
              }`}>
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AdminThemeProvider>
  );
}
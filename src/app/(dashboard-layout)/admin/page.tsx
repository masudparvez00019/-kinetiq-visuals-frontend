"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Package,
  GraduationCap,
  Inbox,
  Plus,
  ChevronRight,
  DollarSign,
  Users,
  Download,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import { statsService } from "@/services/stats.service";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import type { DashboardStats } from "@/types/stats";

const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    // Guard: must have a token, otherwise bounce to login.
    if (!authService.getStoredToken()) {
      router.replace("/login");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await statsService.getDashboard();
      setStats(data);
    } catch (err) {
      // 401/403 = expired/invalid session → clear and bounce to login.
      const message = getErrorMessage(err, "Failed to load dashboard.");
      setError(message);
      if (/unauthor|forbidden|session|invalid/i.test(message)) {
        authService.clearSession();
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const productSubtext = stats
    ? `${stats.products.published} published • ${stats.products.categories} categories`
    : "—";

  const courseSubtext = stats
    ? `${stats.course.publishedChapters} of ${stats.course.chapters} chapters published`
    : "—";

  const messagesSubtext = stats
    ? `${formatNumber(stats.messages.total)} total messages`
    : "—";

  const downloadsSubtext = stats
    ? `across all published products`
    : "—";

  const revenueSubtext = stats?.revenue == null
    ? "Not connected yet"
    : "this month";

  const STATS = [
    {
      title: "Total Revenue",
      value: stats?.revenue == null ? "—" : `$${formatNumber(stats.revenue)}`,
      change: revenueSubtext,
      icon: DollarSign,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Downloads",
      value: stats ? formatNumber(stats.downloads) : "—",
      change: downloadsSubtext,
      icon: Download,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Active Products",
      value: stats ? formatNumber(stats.products.total) : "—",
      change: productSubtext,
      icon: Package,
      color: "text-[#0080ff] bg-[#0080ff]/10 border-[#0080ff]/20",
    },
    {
      title: "Unread Messages",
      value: stats ? formatNumber(stats.messages.unread) : "—",
      change: messagesSubtext,
      icon: Inbox,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading font-normal text-2xl md:text-3xl text-white">
            Dashboard Overview
          </h1>
          <p className="font-satoshi text-xs text-slate-500 font-light">
            Review your website metrics, active products, and student enrollment statistics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-heading font-normal text-xs px-4 py-3 rounded-xl transition-all disabled:opacity-50"
            aria-label="Refresh dashboard"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            href="/admin/products"
            className="flex items-center gap-2 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs px-5 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,128,255,0.25)]"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span className="font-satoshi text-xs text-red-400 font-light">
            {error}
          </span>
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          const isPlaceholder = stat.value === "—";
          return (
            <div
              key={i}
              className={`bg-[#070914] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-lg transition-colors ${
                loading ? "animate-pulse" : "hover:border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-satoshi text-xs text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={`font-heading font-semibold text-2xl ${
                    isPlaceholder ? "text-slate-600" : "text-white"
                  }`}
                >
                  {stat.value}
                </span>
                <span className="font-satoshi text-[10px] text-slate-400 font-light flex items-center gap-1">
                  {!isPlaceholder && (
                    <TrendingUp className="w-3 h-3 text-[#0080ff]" />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick info strip: course + staff */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#070914] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl border border-blue-500/20 bg-blue-500/10 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-satoshi text-[10px] text-slate-500 uppercase tracking-wider">
              Course Chapters
            </span>
            <span className="font-heading font-semibold text-lg text-white">
              {stats ? `${stats.course.publishedChapters} / ${stats.course.chapters}` : "—"}
            </span>
            <span className="font-satoshi text-[10px] text-slate-400 font-light">
              {courseSubtext}
            </span>
          </div>
        </div>

        <div className="bg-[#070914] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-satoshi text-[10px] text-slate-500 uppercase tracking-wider">
              Active Staff
            </span>
            <span className="font-heading font-semibold text-lg text-white">
              {stats ? formatNumber(stats.staff) : "—"}
            </span>
            <span className="font-satoshi text-[10px] text-slate-400 font-light">
              with admin/editor access
            </span>
          </div>
        </div>

        <div className="bg-[#070914] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl border border-[#0080ff]/20 bg-[#0080ff]/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-[#0080ff]" />
          </div>
          <div className="flex flex-col">
            <span className="font-satoshi text-[10px] text-slate-500 uppercase tracking-wider">
              Product Categories
            </span>
            <span className="font-heading font-semibold text-lg text-white">
              {stats ? formatNumber(stats.products.categories) : "—"}
            </span>
            <span className="font-satoshi text-[10px] text-slate-400 font-light">
              active categories
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
        {/* Chart Card (no analytics endpoint yet — graceful placeholder) */}
        <div className="bg-[#070914] border border-white/5 rounded-2xl p-6 flex flex-col gap-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-heading font-semibold text-base text-white">
                Revenue & Tractions
              </span>
              <span className="font-satoshi text-xs text-slate-500 font-light">
                Monthly analytics and sales progression.
              </span>
            </div>
            <select className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-1.5 font-satoshi text-xs text-slate-300 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>

          <div className="w-full h-56 flex items-center justify-center rounded-xl border border-dashed border-white/5">
            <span className="font-satoshi text-xs text-slate-500 text-center px-6">
              Analytics endpoint not connected yet. Once a payment provider
              is wired up, monthly revenue will appear here.
            </span>
          </div>
        </div>

        {/* Recent Inbox Card */}
        <div className="bg-[#070914] border border-white/5 rounded-2xl p-6 flex flex-col gap-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold text-base text-white">
              Recent Messages
            </span>
            <Link
              href="/admin/messages"
              className="text-xs text-[#0080ff] hover:underline flex items-center gap-0.5"
            >
              View All
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-16 rounded-xl border border-white/5 bg-[#0a0d1a] animate-pulse"
                />
              ))}

            {!loading &&
              stats?.messages.recent.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-all ${
                    !msg.isRead
                      ? "bg-[#0c1330] border-blue-500/25"
                      : "bg-[#0a0d1a] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-satoshi font-semibold text-xs text-white">
                      {msg.firstName} {msg.lastName}
                    </span>
                    <span className="font-satoshi text-[9px] text-slate-500">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <p className="font-satoshi text-[10px] text-slate-500 font-light truncate">
                    {msg.email}
                  </p>
                </div>
              ))}

            {!loading && stats && stats.messages.recent.length === 0 && (
              <div className="py-8 text-center text-slate-500 font-satoshi text-xs">
                No recent messages in inbox.
              </div>
            )}

            {!loading && error && (
              <div className="py-8 text-center text-slate-500 font-satoshi text-xs">
                Could not load recent messages.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

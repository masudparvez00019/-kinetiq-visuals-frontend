"use client";

import React from "react";
import { useAppStore } from "@/context/store";
import {
  TrendingUp,
  Package,
  GraduationCap,
  Inbox,
  ArrowUpRight,
  Plus,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { products, chapters, messages } = useAppStore();

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const STATS = [
    {
      title: "Total Revenue",
      value: "$184,832",
      change: "+12.5% this month",
      icon: DollarSign,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Enrolled Students",
      value: "1,234",
      change: "+48 new this week",
      icon: GraduationCap,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Active Products",
      value: products.length.toString(),
      change: "4 categories active",
      icon: Package,
      color: "text-[#0080ff] bg-[#0080ff]/10 border-[#0080ff]/20",
    },
    {
      title: "Unread Messages",
      value: unreadMessagesCount.toString(),
      change: `${messages.length} total messages`,
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
          <Link
            href="/admin/products"
            className="flex items-center gap-2 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs px-5 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,128,255,0.25)]"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-[#070914] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:border-white/10 transition-colors"
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
                <span className="font-heading font-semibold text-2xl text-white">
                  {stat.value}
                </span>
                <span className="font-satoshi text-[10px] text-slate-400 font-light flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#0080ff]" />
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
        {/* SVG Chart Card */}
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

          {/* SVG Line Chart Representation */}
          <div className="w-full h-56 relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0080ff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0080ff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Chart Path Area */}
              <path
                d="M 0,200 L 80,180 L 160,190 L 240,150 L 320,130 L 400,140 L 480,90 L 560,80 L 600,100 L 600,220 L 0,220 Z"
                fill="url(#chart-glow)"
              />

              {/* Chart Line */}
              <path
                d="M 0,200 L 80,180 L 160,190 L 240,150 L 320,130 L 400,140 L 480,90 L 560,80 L 600,100"
                fill="none"
                stroke="#0080ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              <circle cx="240" cy="150" r="4.5" fill="#0080ff" stroke="#070914" strokeWidth="2" />
              <circle cx="480" cy="90" r="4.5" fill="#0080ff" stroke="#070914" strokeWidth="2" />
              <circle cx="560" cy="80" r="4.5" fill="#0080ff" stroke="#070914" strokeWidth="2" />
            </svg>
            {/* Chart Axes Labels */}
            <div className="flex justify-between font-satoshi text-[9px] text-slate-500 uppercase mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
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
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-all ${
                  !msg.read
                    ? "bg-[#0c1330] border-blue-500/25"
                    : "bg-[#0a0d1a] border-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-satoshi font-semibold text-xs text-white">
                    {msg.firstName} {msg.lastName}
                  </span>
                  <span className="font-satoshi text-[9px] text-slate-500">{msg.date}</span>
                </div>
                <p className="font-satoshi text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="py-8 text-center text-slate-500 font-satoshi text-xs">
                No recent messages in inbox.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

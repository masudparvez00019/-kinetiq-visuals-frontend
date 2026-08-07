"use client";

import React from "react";
import Link from "next/link";
import { Wrench, Mail, Clock } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020205] text-white px-6 overflow-hidden select-none">
      {/* Ambient Blue Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/12 blur-[170px] rounded-full pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Glass Panel */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 md:p-12 rounded-[36px] border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] max-w-lg w-full gap-7">
        {/* Status Pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 backdrop-blur-xl shadow-inner">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" />
          <span className="font-satoshi text-[10px] font-semibold tracking-[0.25em] uppercase text-amber-300">
            Scheduled System Upgrade
          </span>
        </div>

        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-1">
            <Wrench className="w-7 h-7" />
          </div>
          <h1 className="font-logo font-bold text-3xl md:text-4xl tracking-tight text-white uppercase">
            KINETIQ <span className="bg-gradient-to-r from-[#0080ff] to-[#00e5ff] bg-clip-text text-transparent">VISUALS</span>
          </h1>
          <p className="font-satoshi text-xs text-slate-400 font-light leading-relaxed max-w-sm mx-auto mt-1">
            We are performing scheduled maintenance & graphics pipeline optimizations to serve you better.
          </p>
        </div>

        {/* Estimated Time Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-satoshi text-xs text-slate-300">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Estimated Downtime: <strong className="text-white">Under 30 Minutes</strong></span>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0055ff] to-[#00a2ff] text-white font-satoshi text-xs font-semibold hover:shadow-[0_0_20px_rgba(0,162,255,0.4)] active:scale-95 transition-all duration-300"
          >
            <Mail className="w-4 h-4" /> Contact Support Team
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Package } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020205] text-white px-6 overflow-hidden select-none">
      {/* Ambient Radial Neon Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0055ff]/12 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#7000ff]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full gap-6">
        {/* Status Pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-inner">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
          <span className="font-satoshi text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-300">
            Error 404 • Page Not Found
          </span>
        </div>

        {/* Large 404 Display */}
        <div className="relative font-heading font-black text-8xl sm:text-9xl md:text-[140px] tracking-tight leading-none bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent my-2">
          404
        </div>

        {/* Headline & Description */}
        <div className="flex flex-col gap-2">
          <h1 className="font-heading font-normal text-2xl sm:text-3xl text-white">
            Lost in the Visual Void
          </h1>
          <p className="font-satoshi text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-md mx-auto">
            The page you are looking for has been moved, deleted, or never existed in our post-production pipeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0055ff] to-[#00a2ff] text-white font-satoshi text-xs font-semibold hover:shadow-[0_0_25px_rgba(0,162,255,0.5)] active:scale-95 transition-all duration-300"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] text-white font-satoshi text-xs font-medium backdrop-blur-xl transition-all duration-300"
          >
            <Package className="w-4 h-4" /> Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}

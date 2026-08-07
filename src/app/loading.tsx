"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020205]/80 backdrop-blur-md text-white pointer-events-none select-none">
      <div className="flex flex-col items-center gap-3">
        {/* Glowing Spinning Neon Ring */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-2 border-white/10 border-t-[#0080ff] border-r-[#00e5ff] animate-spin shadow-[0_0_15px_rgba(0,128,255,0.6)]" />
        </div>
        <span className="font-satoshi text-[10px] font-medium tracking-[0.25em] uppercase text-slate-400">
          Loading...
        </span>
      </div>
    </div>
  );
}

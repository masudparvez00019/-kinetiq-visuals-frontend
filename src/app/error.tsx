"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("KinetiQ app error boundary hit:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020205] text-white px-6 overflow-hidden select-none">
      {/* Ambient Red/Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Glass Error Panel */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 md:p-10 rounded-[32px] border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] max-w-md w-full gap-6">
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-heading font-normal text-2xl text-white">
            Something Went Wrong
          </h1>
          <p className="font-satoshi text-xs text-slate-400 font-light leading-relaxed">
            An unexpected error occurred while rendering this view. Our system logged the issue.
          </p>
          {error?.digest && (
            <span className="font-mono text-[10px] text-slate-500 bg-white/5 px-3 py-1 rounded-md mt-2 w-fit mx-auto border border-white/5">
              Digest: {error.digest}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#0055ff] to-[#00a2ff] text-white font-satoshi text-xs font-semibold hover:shadow-[0_0_20px_rgba(0,162,255,0.4)] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] text-white font-satoshi text-xs font-medium backdrop-blur-xl transition-all duration-300 shrink-0"
          >
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}

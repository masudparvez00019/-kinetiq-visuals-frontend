"use client";

import React from "react";
import { Save, Check, RefreshCw, Loader2, Sparkles } from "lucide-react";
import { useAdminTheme } from "@/context/admin-theme-context";

interface ContentHeaderProps {
  pageTitle: string;
  dirty: boolean;
  saving: boolean;
  saved: boolean;
  loading: boolean;
  lastSavedLabel: string;
  onSave: (e: React.FormEvent) => void;
  onReload: () => void;
}

export function ContentHeader({
  pageTitle,
  dirty,
  saving,
  saved,
  loading,
  lastSavedLabel,
  onSave,
  onReload,
}: ContentHeaderProps) {
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Page CMS Editor
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs font-semibold text-slate-400">{pageTitle}</span>
        </div>
        <h1 className="font-heading font-normal text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          {pageTitle} CMS
        </h1>
        <p className="text-xs text-slate-400 font-satoshi">
          Edit titles, subtitles, CTAs, media uploads, bios, and pricing dynamically.
          {lastSavedLabel && (
            <span className="ml-2 text-slate-500">
              Last updated: {lastSavedLabel}
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-auto">
        <button
          type="button"
          onClick={onReload}
          disabled={loading || saving}
          className={`flex items-center gap-2 font-heading font-normal text-xs px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 border ${
            isLight
              ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs"
              : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
          }`}
          aria-label="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Reload
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className={`flex items-center gap-2 font-heading font-normal text-xs px-5 py-2.5 rounded-xl transition-all ${
            saved
              ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"
              : dirty
              ? "bg-[#0080ff] hover:bg-[#0070e6] text-white shadow-md cursor-pointer"
              : isLight
              ? "bg-slate-100 text-slate-400 border border-slate-200"
              : "bg-white/5 text-slate-400 border border-white/5"
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Saving…
            </>
          ) : saved ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Changes Saved
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Save Changes {dirty && "●"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

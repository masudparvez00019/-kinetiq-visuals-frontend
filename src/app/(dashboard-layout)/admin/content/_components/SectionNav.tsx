"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { useAdminTheme } from "@/context/admin-theme-context";

export interface SectionTab {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

interface SectionNavProps {
  tabs: SectionTab[];
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export function SectionNav({
  tabs,
  activeSection,
  onSelectSection,
}: SectionNavProps) {
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  return (
    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2 bg-[#090d1f] p-4 rounded-2xl border border-white/10 lg:sticky lg:top-6">
      <div className="flex items-center justify-between px-1 pb-2 border-b border-white/10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          SECTIONS ({tabs.length})
        </span>
        {activeSection !== "all" && (
          <button
            type="button"
            onClick={() => onSelectSection("all")}
            className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Show All
          </button>
        )}
      </div>

      {/* Mobile/Tablet Horizontal Scroll (< lg) */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectSection(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? "bg-[#0080ff] text-white shadow-md font-bold"
                  : isLight
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-[10px] opacity-60 font-mono">#{idx}</span>
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Vertical Sub-Sidebar (lg+) */}
      <div className="hidden lg:flex flex-col gap-1 mt-1 max-h-[calc(100vh-140px)] overflow-y-auto pr-1 no-scrollbar">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectSection(tab.id)}
              className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-satoshi font-semibold transition-all w-full text-left group ${
                isActive
                  ? "bg-[#0080ff] text-white shadow-md font-bold ring-1 ring-blue-400/50"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`text-[10px] font-mono shrink-0 w-4 text-center ${
                    isActive ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  {idx === 0 ? "★" : idx}
                </span>
                {Icon && (
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? "text-white" : "text-[#0080ff]"
                    }`}
                  />
                )}
                <span className="truncate">{tab.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

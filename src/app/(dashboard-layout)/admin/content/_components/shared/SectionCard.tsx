"use client";

import React from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { useAdminTheme } from "@/context/admin-theme-context";

interface SectionCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export function SectionCard({
  id,
  title,
  subtitle,
  icon: Icon = Sparkles,
  children,
  headerAction,
}: SectionCardProps) {
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  return (
    <div
      id={id}
      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
        isLight
          ? "bg-white border-slate-200/80 shadow-xs"
          : "bg-[#070914]/80 border-white/5 shadow-xl"
      }`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-[#0080ff]" />
          </div>
          <div>
            <h3 className="font-heading font-normal text-base text-white tracking-wide">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 font-satoshi mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {headerAction}
      </div>

      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

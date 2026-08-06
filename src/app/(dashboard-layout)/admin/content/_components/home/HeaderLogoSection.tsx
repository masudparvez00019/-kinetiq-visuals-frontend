"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface HeaderLogoSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function HeaderLogoSection({ form, updateForm }: HeaderLogoSectionProps) {
  return (
    <SectionCard
      id="sec-header-logo"
      title="Header & Brand Logo"
      subtitle="Configure brand logo text and logo mark image for top header navigation"
      icon={Sparkles}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Brand Logo Text
          </label>
          <input
            type="text"
            value={form.brandLogoText || ""}
            onChange={(e) => updateForm("brandLogoText", e.target.value)}
            placeholder="e.g. KQ VISUALS"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>

        <MediaUploader
          label="Brand Logo Image (Optional)"
          value={form.brandLogoUrl}
          onChange={(url) => updateForm("brandLogoUrl", url)}
          accept="image/*"
          type="image"
        />
      </div>
    </SectionCard>
  );
}

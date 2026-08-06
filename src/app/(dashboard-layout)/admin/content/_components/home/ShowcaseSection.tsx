"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface ShowcaseSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ShowcaseSection({ form, updateForm }: ShowcaseSectionProps) {
  return (
    <SectionCard
      id="sec-showcase"
      title="Showcase Section (Showreel / Promo)"
      subtitle="Interactive showreel video and descriptive titles"
      icon={Sparkles}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Showcase Section Title
          </label>
          <input
            type="text"
            value={form.showcaseTitle || ""}
            onChange={(e) => updateForm("showcaseTitle", e.target.value)}
            placeholder="Showcase Title..."
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Showcase Subtitle
          </label>
          <input
            type="text"
            value={form.showcaseSubtitle || ""}
            onChange={(e) => updateForm("showcaseSubtitle", e.target.value)}
            placeholder="Showcase Subtitle..."
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MediaUploader
          label="Showcase Video File"
          value={form.showcaseVideoUrl}
          onChange={(url) => updateForm("showcaseVideoUrl", url)}
          accept="video/*"
          type="video"
        />

        <MediaUploader
          label="Showcase Video Poster Image"
          value={form.showcasePosterUrl}
          onChange={(url) => updateForm("showcasePosterUrl", url)}
          accept="image/*"
          type="image"
        />
      </div>
    </SectionCard>
  );
}

"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface HeroMediaSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function HeroMediaSection({ form, updateForm }: HeroMediaSectionProps) {
  return (
    <SectionCard
      id="sec-hero-media"
      title="Hero Video & Poster Image"
      subtitle="Background looping video asset and poster fallback image for top hero"
      icon={Sparkles}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MediaUploader
          label="Hero Video (MP4 / WebM)"
          value={form.heroVideoUrl}
          onChange={(url) => updateForm("heroVideoUrl", url)}
          accept="video/*"
          type="video"
        />

        <MediaUploader
          label="Hero Video Poster Image"
          value={form.heroPosterUrl}
          onChange={(url) => updateForm("heroPosterUrl", url)}
          accept="image/*"
          type="image"
        />
      </div>
    </SectionCard>
  );
}

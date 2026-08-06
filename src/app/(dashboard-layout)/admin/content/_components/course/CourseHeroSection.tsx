"use client";

import React from "react";
import { GraduationCap, Type, Plus, Trash2, Video, BarChart2 } from "lucide-react";
import { SiteConfig, CourseHeroStatItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface CourseHeroSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function CourseHeroSection({ form, updateForm }: CourseHeroSectionProps) {
  return (
    <SectionCard
      id="sec-course-hero"
      title="Course Hero Section"
      subtitle="Main headline, description, enrollment CTA, student proof badge, hero video, and 4-counter stat bar"
      icon={GraduationCap}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.courseHeroStats) ? form.courseHeroStats : [];
            const newItem: CourseHeroStatItem = {
              id: String(Date.now()),
              icon: "play",
              value: "100+",
              label: "NEW STAT LESSONS",
            };
            updateForm("courseHeroStats", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Stat Pill
        </button>
      }
    >
      {/* Badge Tagline & 3-Line Headline */}
      <div className="flex flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Course Section Badge Label
          </label>
          <input
            type="text"
            value={form.courseHeroBadgeText || ""}
            onChange={(e) => updateForm("courseHeroBadgeText", e.target.value)}
            placeholder="Courses"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-medium"
          />
        </div>

        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5 pt-2 border-t border-white/5">
          <Type className="w-3.5 h-3.5 text-blue-400" />
          Main Headline Lines (3 Lines)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 1</label>
            <input
              type="text"
              value={form.courseHeroTitle1 || ""}
              onChange={(e) => updateForm("courseHeroTitle1", e.target.value)}
              placeholder="Master"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.courseHeroTitle2 || ""}
              onChange={(e) => updateForm("courseHeroTitle2", e.target.value)}
              placeholder="Cinematic"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 3 (Blue Highlight)</label>
            <input
              type="text"
              value={form.courseHeroTitle3 || ""}
              onChange={(e) => updateForm("courseHeroTitle3", e.target.value)}
              placeholder="Video Editing"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>
      </div>

      {/* Description & CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Course Description Paragraph
          </label>
          <textarea
            rows={3}
            value={form.courseDescription || ""}
            onChange={(e) => updateForm("courseDescription", e.target.value)}
            placeholder="A complete step-by-step system to edit..."
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Enrollment CTA Button Text</label>
            <input
              type="text"
              value={form.courseCtaText || ""}
              onChange={(e) => updateForm("courseCtaText", e.target.value)}
              placeholder="Enroll Now - $149"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">CTA Button Link URL</label>
            <input
              type="text"
              value={form.courseCtaLink || ""}
              onChange={(e) => updateForm("courseCtaLink", e.target.value)}
              placeholder="/contact"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>
      </div>

      {/* Student Proof & Rating Labels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-medium">Students Count Badge Text</label>
          <input
            type="text"
            value={form.courseStudentsText || ""}
            onChange={(e) => updateForm("courseStudentsText", e.target.value)}
            placeholder="Loved by 1200++ Students"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-medium">Stars Rating Text</label>
          <input
            type="text"
            value={form.courseRatingText || ""}
            onChange={(e) => updateForm("courseRatingText", e.target.value)}
            placeholder="4.9 (200+ Reviews)"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      {/* Course Hero Video & Poster Uploaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MediaUploader
          label="Course Hero Video (MP4 / WebM)"
          value={form.courseVideoUrl}
          onChange={(url) => updateForm("courseVideoUrl", url)}
          accept="video/*"
          type="video"
        />

        <MediaUploader
          label="Video Poster Image (Optional Thumbnail)"
          value={form.coursePosterUrl}
          onChange={(url) => updateForm("coursePosterUrl", url)}
          accept="image/*"
          type="image"
        />
      </div>

      {/* Bottom Counter Stats Bar List */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
            Bottom Hero Counter Stat Pills ({form.courseHeroStats?.length || 0})
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(form.courseHeroStats || []).map((stat, idx) => (
            <div
              key={stat.id || idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-2.5 relative group"
            >
              <div className="flex items-center justify-between gap-1 border-b border-white/5 pb-1">
                <span className="text-[11px] font-semibold text-blue-400">Stat #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(form.courseHeroStats) ? form.courseHeroStats : [];
                    updateForm(
                      "courseHeroStats",
                      current.filter((_, i) => i !== idx)
                    );
                  }}
                  className="text-[10px] text-red-400 hover:text-red-300 transition-colors p-1 rounded bg-red-500/10 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Value (e.g. 500+)</label>
                <input
                  type="text"
                  value={stat.value || ""}
                  onChange={(e) => {
                    const current = [...(form.courseHeroStats || [])];
                    current[idx] = { ...current[idx], value: e.target.value };
                    updateForm("courseHeroStats", current);
                  }}
                  placeholder="500+"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40 font-bold text-center"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Label (e.g. PREMIUM LESSONS)</label>
                <input
                  type="text"
                  value={stat.label || ""}
                  onChange={(e) => {
                    const current = [...(form.courseHeroStats || [])];
                    current[idx] = { ...current[idx], label: e.target.value };
                    updateForm("courseHeroStats", current);
                  }}
                  placeholder="PREMIUM LESSONS"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-blue-500/40 text-center uppercase"
                />
              </div>
            </div>
          ))}
        </div>

        {(!form.courseHeroStats || form.courseHeroStats.length === 0) && (
          <div className="p-6 rounded-xl bg-black/20 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No stat pills added yet. Click &quot;Add Stat Pill&quot; above to create one.
          </div>
        )}
      </div>
    </SectionCard>
  );
}

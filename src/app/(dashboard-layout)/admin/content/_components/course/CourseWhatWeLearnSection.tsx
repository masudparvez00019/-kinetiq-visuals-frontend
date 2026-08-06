"use client";

import React from "react";
import { BookOpen, Type, Plus, Trash2, LayoutGrid } from "lucide-react";
import { SiteConfig, CourseLearnItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface CourseWhatWeLearnSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

const ICON_OPTIONS = [
  { value: "clapperboard", label: "Clapperboard / Video" },
  { value: "palette", label: "Color Palette" },
  { value: "trending-up", label: "Trending / Convert" },
  { value: "audio-wave", label: "Audio Wave / Sound" },
  { value: "smartphone", label: "Smartphone / Reel" },
  { value: "users", label: "Users / Workflow" },
];

export function CourseWhatWeLearnSection({ form, updateForm }: CourseWhatWeLearnSectionProps) {
  return (
    <SectionCard
      id="sec-course-learn"
      title="What We Learn Section"
      subtitle="Manage course modules header, subtitle, and dynamic curriculum cards grid"
      icon={BookOpen}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.courseLearnItems) ? form.courseLearnItems : [];
            const nextNum = (current.length + 1).toString().padStart(2, "0");
            const newItem: CourseLearnItem = {
              id: String(Date.now()),
              number: nextNum,
              title: "New Learning Module",
              lessons: "5 LESSONS",
              description: "Describe what students will learn in this module.",
              icon: "clapperboard",
            };
            updateForm("courseLearnItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Module Card
        </button>
      }
    >
      {/* Badge Tagline & 2-Line Headline */}
      <div className="flex flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Section Badge Label
          </label>
          <input
            type="text"
            value={form.courseLearnBadgeText || ""}
            onChange={(e) => updateForm("courseLearnBadgeText", e.target.value)}
            placeholder="What we Learn"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-medium"
          />
        </div>

        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5 pt-2 border-t border-white/5">
          <Type className="w-3.5 h-3.5 text-blue-400" />
          Main Headline Lines (2 Lines)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 1</label>
            <input
              type="text"
              value={form.courseLearnTitleLine1 || ""}
              onChange={(e) => updateForm("courseLearnTitleLine1", e.target.value)}
              placeholder="Create High Converting"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.courseLearnTitleLine2 || ""}
              onChange={(e) => updateForm("courseLearnTitleLine2", e.target.value)}
              placeholder="Video Content"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
          <label className="text-[10px] text-slate-400 font-medium">Subtitle Description Paragraph</label>
          <textarea
            rows={2}
            value={form.courseLearnSubtitle || ""}
            onChange={(e) => updateForm("courseLearnSubtitle", e.target.value)}
            placeholder="Learn how to create engaging videos that capture attention..."
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Dynamic Learning Cards Grid */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
            Module Learning Cards ({form.courseLearnItems?.length || 0})
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(form.courseLearnItems || []).map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3 relative group"
            >
              <div className="flex items-center justify-between gap-1 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400">Card #{idx + 1}</span>
                  <input
                    type="text"
                    value={item.number || ""}
                    onChange={(e) => {
                      const current = [...(form.courseLearnItems || [])];
                      current[idx] = { ...current[idx], number: e.target.value };
                      updateForm("courseLearnItems", current);
                    }}
                    placeholder="01"
                    className="w-12 bg-[#0a0d1a] border border-white/10 rounded px-2 py-0.5 text-xs text-blue-400 font-bold text-center"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(form.courseLearnItems) ? form.courseLearnItems : [];
                    updateForm(
                      "courseLearnItems",
                      current.filter((_, i) => i !== idx)
                    );
                  }}
                  className="text-[10px] text-red-400 hover:text-red-300 transition-colors p-1 rounded bg-red-500/10 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-medium">Module Title</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => {
                      const current = [...(form.courseLearnItems || [])];
                      current[idx] = { ...current[idx], title: e.target.value };
                      updateForm("courseLearnItems", current);
                    }}
                    placeholder="Professional Editing"
                    className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-medium">Lessons Badge</label>
                  <input
                    type="text"
                    value={item.lessons || ""}
                    onChange={(e) => {
                      const current = [...(form.courseLearnItems || [])];
                      current[idx] = { ...current[idx], lessons: e.target.value };
                      updateForm("courseLearnItems", current);
                    }}
                    placeholder="12 LESSONS"
                    className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-blue-400 focus:outline-none focus:border-blue-500/40 font-bold uppercase"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Icon Type</label>
                <select
                  value={item.icon || "clapperboard"}
                  onChange={(e) => {
                    const current = [...(form.courseLearnItems || [])];
                    current[idx] = { ...current[idx], icon: e.target.value };
                    updateForm("courseLearnItems", current);
                  }}
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Module Description</label>
                <textarea
                  rows={2}
                  value={item.description || ""}
                  onChange={(e) => {
                    const current = [...(form.courseLearnItems || [])];
                    current[idx] = { ...current[idx], description: e.target.value };
                    updateForm("courseLearnItems", current);
                  }}
                  placeholder="Master industry-standard editing techniques..."
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>

        {(!form.courseLearnItems || form.courseLearnItems.length === 0) && (
          <div className="p-6 rounded-xl bg-black/20 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No learning module cards added yet. Click &quot;Add Module Card&quot; above to create one.
          </div>
        )}
      </div>
    </SectionCard>
  );
}

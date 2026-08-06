"use client";

import React from "react";
import { Layers, Type, Plus, Trash2, ListChecks, CheckCircle2 } from "lucide-react";
import { SiteConfig, CourseCurriculumModuleItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface CourseCurriculumSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function CourseCurriculumSection({ form, updateForm }: CourseCurriculumSectionProps) {
  return (
    <SectionCard
      id="sec-course-curriculum"
      title="Course Curriculum Section ('What's Inside')"
      subtitle="Header titles, description, interactive module chapters list, feature perks tags, and enrollment CTA banner"
      icon={Layers}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.courseCurriculumModules) ? form.courseCurriculumModules : [];
            const nextNum = (current.length + 1).toString().padStart(2, "0");
            const newItem: CourseCurriculumModuleItem = {
              id: String(Date.now()),
              num: nextNum,
              title: "New Module Chapter",
              sub: "4 Lessons • 30 Min",
              duration: "30 Min",
            };
            updateForm("courseCurriculumModules", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Chapter Module
        </button>
      }
    >
      {/* Badge Tagline & 3-Line Headline */}
      <div className="flex flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Section Badge Label
          </label>
          <input
            type="text"
            value={form.courseCurriculumBadgeText || ""}
            onChange={(e) => updateForm("courseCurriculumBadgeText", e.target.value)}
            placeholder="Course Curriculam"
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
              value={form.courseCurriculumTitleLine1 || ""}
              onChange={(e) => updateForm("courseCurriculumTitleLine1", e.target.value)}
              placeholder="What's Inside"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2 (Blue Highlight)</label>
            <input
              type="text"
              value={form.courseCurriculumTitleLine2 || ""}
              onChange={(e) => updateForm("courseCurriculumTitleLine2", e.target.value)}
              placeholder="The"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 3 (Blue Highlight)</label>
            <input
              type="text"
              value={form.courseCurriculumTitleLine3 || ""}
              onChange={(e) => updateForm("courseCurriculumTitleLine3", e.target.value)}
              placeholder="Course"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
          <label className="text-[10px] text-slate-400 font-medium">Subtitle Description Paragraph</label>
          <textarea
            rows={2}
            value={form.courseCurriculumSubtitle || ""}
            onChange={(e) => updateForm("courseCurriculumSubtitle", e.target.value)}
            placeholder="Explore a step-by-step learning path designed to help you..."
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Dynamic Module Chapters List */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5 text-blue-400" />
            Curriculum Chapter Modules ({form.courseCurriculumModules?.length || 0})
          </label>
        </div>

        <div className="flex flex-col gap-3">
          {(form.courseCurriculumModules || []).map((ch, idx) => (
            <div
              key={ch.id || idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col md:flex-row items-center gap-3 relative group"
            >
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-blue-400">#{idx + 1}</span>
                <input
                  type="text"
                  value={ch.num || ""}
                  onChange={(e) => {
                    const current = [...(form.courseCurriculumModules || [])];
                    current[idx] = { ...current[idx], num: e.target.value };
                    updateForm("courseCurriculumModules", current);
                  }}
                  placeholder="01"
                  className="w-12 bg-[#0a0d1a] border border-white/10 rounded px-2 py-1 text-xs text-blue-400 font-bold text-center"
                />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                <input
                  type="text"
                  value={ch.title || ""}
                  onChange={(e) => {
                    const current = [...(form.courseCurriculumModules || [])];
                    current[idx] = { ...current[idx], title: e.target.value };
                    updateForm("courseCurriculumModules", current);
                  }}
                  placeholder="Introduction & Setup"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
                />

                <input
                  type="text"
                  value={ch.sub || ""}
                  onChange={(e) => {
                    const current = [...(form.courseCurriculumModules || [])];
                    current[idx] = { ...current[idx], sub: e.target.value };
                    updateForm("courseCurriculumModules", current);
                  }}
                  placeholder="3 Lessons • 24 Min"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/40"
                />

                <input
                  type="text"
                  value={ch.duration || ""}
                  onChange={(e) => {
                    const current = [...(form.courseCurriculumModules || [])];
                    current[idx] = { ...current[idx], duration: e.target.value };
                    updateForm("courseCurriculumModules", current);
                  }}
                  placeholder="24 Min"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-blue-400 focus:outline-none focus:border-blue-500/40 font-bold"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.courseCurriculumModules) ? form.courseCurriculumModules : [];
                  updateForm(
                    "courseCurriculumModules",
                    current.filter((_, i) => i !== idx)
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {(!form.courseCurriculumModules || form.courseCurriculumModules.length === 0) && (
          <div className="p-6 rounded-xl bg-black/20 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No curriculum chapters added yet. Click &quot;Add Chapter Module&quot; above to create one.
          </div>
        )}
      </div>

      {/* Perks Feature Tags & Bottom CTA Banner */}
      <div className="flex flex-col gap-4 bg-black/20 p-4 rounded-xl border border-white/5 pt-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            Curriculum Perks Tags ({form.courseCurriculumPerks?.length || 0})
          </label>
          <button
            type="button"
            onClick={() => {
              const current = Array.isArray(form.courseCurriculumPerks) ? form.courseCurriculumPerks : [];
              updateForm("courseCurriculumPerks", [...current, "New Perk Feature"]);
            }}
            className="px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-[10px] font-medium transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Perk
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {(form.courseCurriculumPerks || []).map((perk, idx) => (
            <div key={idx} className="flex items-center gap-1.5 bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5">
              <input
                type="text"
                value={perk}
                onChange={(e) => {
                  const current = [...(form.courseCurriculumPerks || [])];
                  current[idx] = e.target.value;
                  updateForm("courseCurriculumPerks", current);
                }}
                className="bg-transparent text-xs text-white focus:outline-none flex-1 font-medium"
              />
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.courseCurriculumPerks) ? form.courseCurriculumPerks : [];
                  updateForm(
                    "courseCurriculumPerks",
                    current.filter((_, i) => i !== idx)
                  );
                }}
                className="text-red-400 hover:text-red-300 p-0.5"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Bottom Banner Subtitle</label>
            <input
              type="text"
              value={form.courseCurriculumCtaDesc || ""}
              onChange={(e) => updateForm("courseCurriculumCtaDesc", e.target.value)}
              placeholder="Everything you need to create professional..."
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">CTA Button Text</label>
            <input
              type="text"
              value={form.courseCurriculumCtaBtnText || ""}
              onChange={(e) => updateForm("courseCurriculumCtaBtnText", e.target.value)}
              placeholder="Enroll Now - $149"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">CTA Button Link</label>
            <input
              type="text"
              value={form.courseCurriculumCtaBtnLink || ""}
              onChange={(e) => updateForm("courseCurriculumCtaBtnLink", e.target.value)}
              placeholder="/contact"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

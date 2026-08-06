"use client";

import React from "react";
import { CheckSquare, Plus, Trash2, Tag, Link2 } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface CourseIncludedSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function CourseIncludedSection({ form, updateForm }: CourseIncludedSectionProps) {
  return (
    <SectionCard
      id="sec-course-included"
      title="What's Included in This Course Section"
      subtitle="Header badge, title, description, feature pills tags, and enrollment CTA button"
      icon={CheckSquare}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.courseIncludedItems) ? form.courseIncludedItems : [];
            updateForm("courseIncludedItems", [...current, "New Included Feature"]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Included Pill
        </button>
      }
    >
      <div className="flex flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Section Badge Tagline
            </label>
            <input
              type="text"
              value={form.courseIncludedBadgeText || ""}
              onChange={(e) => updateForm("courseIncludedBadgeText", e.target.value)}
              placeholder="Included in"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Headline Title
            </label>
            <input
              type="text"
              value={form.courseIncludedTitle || ""}
              onChange={(e) => updateForm("courseIncludedTitle", e.target.value)}
              placeholder="What's Included in This Course"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
          <label className="text-[10px] text-slate-400 font-medium">Subtitle Description Paragraph</label>
          <textarea
            rows={2}
            value={form.courseIncludedSubtitle || ""}
            onChange={(e) => updateForm("courseIncludedSubtitle", e.target.value)}
            placeholder="Unlock your video editing journey with Lifetime Access..."
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Feature Pills Manager */}
      <div className="flex flex-col gap-3 pt-2">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-blue-400" />
          Included Feature Pills Tags ({form.courseIncludedItems?.length || 0})
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {(form.courseIncludedItems || []).map((pill, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-1.5">
              <input
                type="text"
                value={pill}
                onChange={(e) => {
                  const current = [...(form.courseIncludedItems || [])];
                  current[idx] = e.target.value;
                  updateForm("courseIncludedItems", current);
                }}
                className="bg-transparent text-xs text-white focus:outline-none flex-1 font-medium"
              />
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.courseIncludedItems) ? form.courseIncludedItems : [];
                  updateForm(
                    "courseIncludedItems",
                    current.filter((_, i) => i !== idx)
                  );
                }}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-white/5">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-medium">CTA Button Text</label>
          <input
            type="text"
            value={form.courseIncludedCtaBtnText || ""}
            onChange={(e) => updateForm("courseIncludedCtaBtnText", e.target.value)}
            placeholder="Enroll Now"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <Link2 className="w-3 h-3 text-blue-400" /> CTA Button Link
          </label>
          <input
            type="text"
            value={form.courseIncludedCtaBtnLink || ""}
            onChange={(e) => updateForm("courseIncludedCtaBtnLink", e.target.value)}
            placeholder="/contact"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>
    </SectionCard>
  );
}

"use client";

import React from "react";
import { Award, Type, Plus, Trash2, Users, Star } from "lucide-react";
import { SiteConfig, CourseSuccessItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface CourseSuccessStoriesSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function CourseSuccessStoriesSection({ form, updateForm }: CourseSuccessStoriesSectionProps) {
  return (
    <SectionCard
      id="sec-course-success"
      title="Success Stories Section ('Real Student Results')"
      subtitle="Header title, subtitle, and dynamic student result cards (Photo, Name, Testimonial, Stars, Growth & Revenue metrics)"
      icon={Award}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.courseSuccessItems) ? form.courseSuccessItems : [];
            const newItem: CourseSuccessItem = {
              id: String(Date.now()),
              name: "STUDENT NAME",
              quote: "The course completely changed how I approach client projects and editing workflows.",
              stars: 5,
              metric1Value: "+200%",
              metric1Label: "Client Growth",
              metric2Value: "$1K-$5K",
              metric2Label: "Monthly Revenue",
              image: null,
            };
            updateForm("courseSuccessItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Student Story
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
            value={form.courseSuccessBadgeText || ""}
            onChange={(e) => updateForm("courseSuccessBadgeText", e.target.value)}
            placeholder="Success Stories"
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
              value={form.courseSuccessTitleLine1 || ""}
              onChange={(e) => updateForm("courseSuccessTitleLine1", e.target.value)}
              placeholder="Real Student Results."
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.courseSuccessTitleLine2 || ""}
              onChange={(e) => updateForm("courseSuccessTitleLine2", e.target.value)}
              placeholder="Real Impact."
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
          <label className="text-[10px] text-slate-400 font-medium">Subtitle Description Paragraph</label>
          <textarea
            rows={2}
            value={form.courseSuccessSubtitle || ""}
            onChange={(e) => updateForm("courseSuccessSubtitle", e.target.value)}
            placeholder="See how creators transformed their skills..."
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Dynamic Student Cards Grid */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            Student Result Cards ({form.courseSuccessItems?.length || 0})
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(form.courseSuccessItems || []).map((card, idx) => (
            <div
              key={card.id || idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3 relative group"
            >
              <div className="flex items-center justify-between gap-1 border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-blue-400">Card #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(form.courseSuccessItems) ? form.courseSuccessItems : [];
                    updateForm(
                      "courseSuccessItems",
                      current.filter((_, i) => i !== idx)
                    );
                  }}
                  className="text-[10px] text-red-400 hover:text-red-300 transition-colors p-1 rounded bg-red-500/10 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <MediaUploader
                label="Student Photo / Avatar"
                value={card.image}
                onChange={(url) => {
                  const current = [...(form.courseSuccessItems || [])];
                  current[idx] = { ...current[idx], image: url };
                  updateForm("courseSuccessItems", current);
                }}
                accept="image/*"
                type="image"
              />

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Student Name</label>
                <input
                  type="text"
                  value={card.name || ""}
                  onChange={(e) => {
                    const current = [...(form.courseSuccessItems || [])];
                    current[idx] = { ...current[idx], name: e.target.value };
                    updateForm("courseSuccessItems", current);
                  }}
                  placeholder="JAMES CARTER"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-blue-400 focus:outline-none focus:border-blue-500/40 font-bold uppercase tracking-wider"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Testimonial Quote</label>
                <textarea
                  rows={2}
                  value={card.quote || ""}
                  onChange={(e) => {
                    const current = [...(form.courseSuccessItems || [])];
                    current[idx] = { ...current[idx], quote: e.target.value };
                    updateForm("courseSuccessItems", current);
                  }}
                  placeholder="The course completely changed..."
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                />
              </div>

              {/* Metric 1 & Metric 2 */}
              <div className="grid grid-cols-2 gap-2 bg-black/20 p-2.5 rounded-lg border border-white/5">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-slate-400 font-medium">Metric 1 Val (+250%)</label>
                  <input
                    type="text"
                    value={card.metric1Value || ""}
                    onChange={(e) => {
                      const current = [...(form.courseSuccessItems || [])];
                      current[idx] = { ...current[idx], metric1Value: e.target.value };
                      updateForm("courseSuccessItems", current);
                    }}
                    placeholder="+250%"
                    className="bg-[#0a0d1a] border border-white/10 rounded px-2 py-1 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={card.metric1Label || ""}
                    onChange={(e) => {
                      const current = [...(form.courseSuccessItems || [])];
                      current[idx] = { ...current[idx], metric1Label: e.target.value };
                      updateForm("courseSuccessItems", current);
                    }}
                    placeholder="Client Growth"
                    className="bg-[#0a0d1a] border border-white/10 rounded px-2 py-1 text-[10px] text-slate-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-slate-400 font-medium">Metric 2 Val ($1K-$10K)</label>
                  <input
                    type="text"
                    value={card.metric2Value || ""}
                    onChange={(e) => {
                      const current = [...(form.courseSuccessItems || [])];
                      current[idx] = { ...current[idx], metric2Value: e.target.value };
                      updateForm("courseSuccessItems", current);
                    }}
                    placeholder="$1K-$10K"
                    className="bg-[#0a0d1a] border border-white/10 rounded px-2 py-1 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={card.metric2Label || ""}
                    onChange={(e) => {
                      const current = [...(form.courseSuccessItems || [])];
                      current[idx] = { ...current[idx], metric2Label: e.target.value };
                      updateForm("courseSuccessItems", current);
                    }}
                    placeholder="Monthly Revenue"
                    className="bg-[#0a0d1a] border border-white/10 rounded px-2 py-1 text-[10px] text-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!form.courseSuccessItems || form.courseSuccessItems.length === 0) && (
          <div className="p-6 rounded-xl bg-black/20 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No student story cards added yet. Click &quot;Add Student Story&quot; above to create one.
          </div>
        )}
      </div>
    </SectionCard>
  );
}

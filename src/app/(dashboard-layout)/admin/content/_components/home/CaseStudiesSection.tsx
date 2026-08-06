"use client";

import React from "react";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { SiteConfig, CaseStudyItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface CaseStudiesSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function CaseStudiesSection({ form, updateForm }: CaseStudiesSectionProps) {
  return (
    <SectionCard
      id="sec-case-studies"
      title="Case Studies Showcase Grid"
      subtitle="Featured portfolio video showcases with stats, tags, and posters"
      icon={Sparkles}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.caseStudiesItems) ? form.caseStudiesItems : [];
            const newItem: CaseStudyItem = {
              id: String(Date.now()),
              clientName: "New Client",
              campaignName: "Luxury Property Campaign",
              campaignGoal: "Sell Faster",
              stats: [{ value: "$2.5M", label: "Sold" }],
              tags: ["Luxury", "Drone"],
              videoSrc: "",
              poster: "",
              testimonial: { quote: "", authorName: "", authorTitle: "" },
            };
            updateForm("caseStudiesItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Case Study
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Case Studies Title
          </label>
          <input
            type="text"
            value={form.caseStudiesTitle || ""}
            onChange={(e) => updateForm("caseStudiesTitle", e.target.value)}
            placeholder="Proven Results That Speak For Themselves"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Case Studies Subtitle
          </label>
          <input
            type="text"
            value={form.caseStudiesSubtitle || ""}
            onChange={(e) => updateForm("caseStudiesSubtitle", e.target.value)}
            placeholder="Explore how our cinematic edits boosted property sales..."
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {(form.caseStudiesItems || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400">
                Case Study #{idx + 1}: {item.clientName || "Untitled"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.caseStudiesItems) ? form.caseStudiesItems : [];
                  updateForm(
                    "caseStudiesItems",
                    current.filter((_, i) => i !== idx),
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove Case Study
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Client Name</label>
                <input
                  type="text"
                  value={item.clientName || ""}
                  onChange={(e) => {
                    const current = [...(form.caseStudiesItems || [])];
                    current[idx] = { ...current[idx], clientName: e.target.value };
                    updateForm("caseStudiesItems", current);
                  }}
                  placeholder="e.g. Bel Air Luxury Villa"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Campaign Name</label>
                <input
                  type="text"
                  value={item.campaignName || ""}
                  onChange={(e) => {
                    const current = [...(form.caseStudiesItems || [])];
                    current[idx] = { ...current[idx], campaignName: e.target.value };
                    updateForm("caseStudiesItems", current);
                  }}
                  placeholder="e.g. Architectural Showcase"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Campaign Goal</label>
                <input
                  type="text"
                  value={item.campaignGoal || ""}
                  onChange={(e) => {
                    const current = [...(form.caseStudiesItems || [])];
                    current[idx] = { ...current[idx], campaignGoal: e.target.value };
                    updateForm("caseStudiesItems", current);
                  }}
                  placeholder="e.g. Sell in 14 Days"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Tags (Comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || ""}
                onChange={(e) => {
                  const current = [...(form.caseStudiesItems || [])];
                  const raw = e.target.value;
                  const parsed = raw
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  current[idx] = { ...current[idx], tags: parsed };
                  updateForm("caseStudiesItems", current);
                }}
                placeholder="e.g. 4K, 60fps, Sound Design"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <MediaUploader
                label="Case Study Video URL"
                value={item.videoSrc}
                onChange={(url) => {
                  const current = [...(form.caseStudiesItems || [])];
                  current[idx] = { ...current[idx], videoSrc: url || "" };
                  updateForm("caseStudiesItems", current);
                }}
                accept="video/*"
                type="video"
              />

              <MediaUploader
                label="Poster Image URL"
                value={item.poster}
                onChange={(url) => {
                  const current = [...(form.caseStudiesItems || [])];
                  current[idx] = { ...current[idx], poster: url || "" };
                  updateForm("caseStudiesItems", current);
                }}
                accept="image/*"
                type="image"
              />
            </div>
          </div>
        ))}

        {(!form.caseStudiesItems || form.caseStudiesItems.length === 0) && (
          <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No case studies added yet. Click "+ Add Case Study" above to add portfolio items.
          </div>
        )}
      </div>
    </SectionCard>
  );
}

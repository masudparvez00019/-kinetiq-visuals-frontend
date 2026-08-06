"use client";

import React from "react";
import { Wrench, Plus, Trash2, LayoutGrid } from "lucide-react";
import { SiteConfig, CourseToolItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface CourseToolsSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

const PRESET_ICONS = [
  { value: "pr", label: "Premier Pro (Pr)" },
  { value: "ae", label: "After Effects (Ae)" },
  { value: "davinci", label: "DaVinci Resolve" },
  { value: "ps", label: "Photoshop (Ps)" },
  { value: "custom", label: "Custom Image Upload" },
];

export function CourseToolsSection({ form, updateForm }: CourseToolsSectionProps) {
  return (
    <SectionCard
      id="sec-course-tools"
      title="Tools You'll Master Section"
      subtitle="Header title and software tool badges grid (Premiere Pro, After Effects, DaVinci Resolve, Photoshop)"
      icon={Wrench}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.courseToolsItems) ? form.courseToolsItems : [];
            const newItem: CourseToolItem = {
              id: String(Date.now()),
              name: "New Software Tool",
              iconType: "pr",
            };
            updateForm("courseToolsItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Tool Badge
        </button>
      }
    >
      {/* Title */}
      <div className="flex flex-col gap-1 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Tools Section Badge Title
        </label>
        <input
          type="text"
          value={form.courseToolsTitle || ""}
          onChange={(e) => updateForm("courseToolsTitle", e.target.value)}
          placeholder="TOOLS YOU'LL MASTER"
          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold focus:outline-none focus:border-blue-500/40 uppercase tracking-widest"
        />
      </div>

      {/* Tools List */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
            Software Tool Badges ({form.courseToolsItems?.length || 0})
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(form.courseToolsItems || []).map((tool, idx) => (
            <div
              key={tool.id || idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-2.5 relative group"
            >
              <div className="flex items-center justify-between gap-1 border-b border-white/5 pb-1">
                <span className="text-[11px] font-semibold text-blue-400">Tool #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(form.courseToolsItems) ? form.courseToolsItems : [];
                    updateForm(
                      "courseToolsItems",
                      current.filter((_, i) => i !== idx)
                    );
                  }}
                  className="text-[10px] text-red-400 hover:text-red-300 transition-colors p-1 rounded bg-red-500/10 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Software Name</label>
                <input
                  type="text"
                  value={tool.name || ""}
                  onChange={(e) => {
                    const current = [...(form.courseToolsItems || [])];
                    current[idx] = { ...current[idx], name: e.target.value };
                    updateForm("courseToolsItems", current);
                  }}
                  placeholder="Premier Pro"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Icon Preset / Style</label>
                <select
                  value={tool.iconType || "pr"}
                  onChange={(e) => {
                    const current = [...(form.courseToolsItems || [])];
                    current[idx] = { ...current[idx], iconType: e.target.value };
                    updateForm("courseToolsItems", current);
                  }}
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                >
                  {PRESET_ICONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {tool.iconType === "custom" && (
                <MediaUploader
                  label="Custom Tool Icon"
                  value={tool.iconUrl}
                  onChange={(url) => {
                    const current = [...(form.courseToolsItems || [])];
                    current[idx] = { ...current[idx], iconUrl: url };
                    updateForm("courseToolsItems", current);
                  }}
                  accept="image/*"
                  type="image"
                />
              )}
            </div>
          ))}
        </div>

        {(!form.courseToolsItems || form.courseToolsItems.length === 0) && (
          <div className="p-6 rounded-xl bg-black/20 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No tool badges added yet. Click &quot;Add Tool Badge&quot; above to create one.
          </div>
        )}
      </div>
    </SectionCard>
  );
}

"use client";

import React from "react";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { SiteConfig, ProcessStepItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface ProcessSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ProcessSection({ form, updateForm }: ProcessSectionProps) {
  return (
    <SectionCard
      id="sec-process"
      title='Process Section ("How We Work / Workflow Steps")'
      subtitle="Numbered workflow steps, badge, stacked title lines, and description"
      icon={Sparkles}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.processSteps) ? form.processSteps : [];
            const nextStepNum = String(current.length + 1).padStart(2, "0");
            const newItem: ProcessStepItem = {
              id: String(Date.now()),
              num: nextStepNum,
              title: "New Process Step",
              desc: "",
              image: "",
            };
            updateForm("processSteps", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Process Step
        </button>
      }
    >
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Section Header Badge & Description
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Process Badge Text</label>
            <input
              type="text"
              value={form.processBadgeText || ""}
              onChange={(e) => updateForm("processBadgeText", e.target.value)}
              placeholder="PROCESS"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Process Subtitle</label>
            <input
              type="text"
              value={form.processSubtitle || ""}
              onChange={(e) => updateForm("processSubtitle", e.target.value)}
              placeholder="A streamlined 5-step workflow designed..."
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          5-Line Main Title Header (Stacked Words)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((num) => {
            const key = `processTitleLine${num}` as keyof SiteConfig;
            return (
              <div key={num} className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Line {num}</label>
                <input
                  type="text"
                  value={(form[key] as string) || ""}
                  onChange={(e) => updateForm(key, e.target.value)}
                  placeholder={`Line ${num}...`}
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {(form.processSteps || []).map((step, idx) => (
          <div
            key={step.id || idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400">
                Step #{step.num || idx + 1}: {step.title || "Untitled Step"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.processSteps) ? form.processSteps : [];
                  updateForm(
                    "processSteps",
                    current.filter((_, i) => i !== idx),
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove Step
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1 md:col-span-1">
                <label className="text-[10px] text-slate-400 font-medium">Step Number (01 - 05)</label>
                <input
                  type="text"
                  value={step.num || ""}
                  onChange={(e) => {
                    const current = [...(form.processSteps || [])];
                    current[idx] = { ...current[idx], num: e.target.value };
                    updateForm("processSteps", current);
                  }}
                  placeholder="01"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-3">
                <label className="text-[10px] text-slate-400 font-medium">Step Title</label>
                <input
                  type="text"
                  value={step.title || ""}
                  onChange={(e) => {
                    const current = [...(form.processSteps || [])];
                    current[idx] = { ...current[idx], title: e.target.value };
                    updateForm("processSteps", current);
                  }}
                  placeholder="e.g. Raw Footage Upload & Briefing"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Step Description</label>
              <textarea
                rows={2}
                value={step.desc || ""}
                onChange={(e) => {
                  const current = [...(form.processSteps || [])];
                  current[idx] = { ...current[idx], desc: e.target.value };
                  updateForm("processSteps", current);
                }}
                placeholder="Full description of what happens in this step..."
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
              />
            </div>
          </div>
        ))}

        {(!form.processSteps || form.processSteps.length === 0) && (
          <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No process steps added yet. Click "+ Add Process Step" above to add workflow steps.
          </div>
        )}
      </div>
    </SectionCard>
  );
}

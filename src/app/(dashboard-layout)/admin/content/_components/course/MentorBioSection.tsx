"use client";

import React from "react";
import { UserCheck, Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface MentorBioSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function MentorBioSection({ form, updateForm }: MentorBioSectionProps) {
  return (
    <SectionCard
      id="sec-mentor-bio"
      title="Instructor / Mentor Bio & Credentials Section"
      subtitle="Mentor photo portrait, badge label, name, designation, biography, and 3 key achievement counter stats"
      icon={UserCheck}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Mentor Avatar Uploader */}
        <div className="md:col-span-1">
          <MediaUploader
            label="Mentor Portrait Photo"
            value={form.mentorAvatarUrl}
            onChange={(url) => updateForm("mentorAvatarUrl", url)}
            accept="image/*"
            type="image"
          />
        </div>

        {/* Mentor Text Fields */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Section Badge Label
              </label>
              <input
                type="text"
                value={form.mentorBadgeText || ""}
                onChange={(e) => updateForm("mentorBadgeText", e.target.value)}
                placeholder="Your Mentor"
                className="bg-[#0a0d1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Mentor Full Name
              </label>
              <input
                type="text"
                value={form.mentorName || ""}
                onChange={(e) => updateForm("mentorName", e.target.value)}
                placeholder="Jowel Mahmud"
                className="bg-[#0a0d1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Mentor Title / Designation
              </label>
              <input
                type="text"
                value={form.mentorTitle || ""}
                onChange={(e) => updateForm("mentorTitle", e.target.value)}
                placeholder="Founder Of 'KinetiQ Visuals'"
                className="bg-[#0a0d1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-blue-400 font-semibold focus:outline-none focus:border-blue-500/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Mentor Bio Description
            </label>
            <textarea
              rows={3}
              value={form.mentorBio || ""}
              onChange={(e) => updateForm("mentorBio", e.target.value)}
              placeholder="I've helped 100+ businesses and creators elevate their brand..."
              className="bg-[#0a0d1a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 3 Counter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/5">
        <div className="flex flex-col gap-1 bg-black/20 p-3 rounded-xl border border-white/5">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Stat 1: Experience (6+)
          </label>
          <input
            type="text"
            value={form.mentorExperience || ""}
            onChange={(e) => updateForm("mentorExperience", e.target.value)}
            placeholder="6+"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold focus:outline-none focus:border-blue-500/40"
          />
          <span className="text-[10px] text-slate-500 font-medium">Years Experience</span>
        </div>

        <div className="flex flex-col gap-1 bg-black/20 p-3 rounded-xl border border-white/5">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Stat 2: Projects (100+)
          </label>
          <input
            type="text"
            value={form.mentorProjects || ""}
            onChange={(e) => updateForm("mentorProjects", e.target.value)}
            placeholder="100+"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold focus:outline-none focus:border-blue-500/40"
          />
          <span className="text-[10px] text-slate-500 font-medium">Projects Delivered</span>
        </div>

        <div className="flex flex-col gap-1 bg-black/20 p-3 rounded-xl border border-white/5">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Stat 3: Students (1200+)
          </label>
          <input
            type="text"
            value={form.mentorStudents || ""}
            onChange={(e) => updateForm("mentorStudents", e.target.value)}
            placeholder="1200+"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold focus:outline-none focus:border-blue-500/40"
          />
          <span className="text-[10px] text-slate-500 font-medium">Students Trained</span>
        </div>
      </div>
    </SectionCard>
  );
}

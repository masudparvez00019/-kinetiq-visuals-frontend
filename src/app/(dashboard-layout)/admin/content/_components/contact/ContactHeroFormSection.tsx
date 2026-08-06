"use client";

import React from "react";
import { MessageSquare, User, Image as ImageIcon } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface ContactHeroFormSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ContactHeroFormSection({ form, updateForm }: ContactHeroFormSectionProps) {
  return (
    <>
      {/* Hero Section */}
      <SectionCard
        id="sec-contact-hero"
        title="Contact Hero Section"
        subtitle="Page headline and introductory subtitle text"
        icon={MessageSquare}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Hero Headline Title
            </label>
            <input
              type="text"
              value={form.contactHeroTitle || ""}
              onChange={(e) => updateForm("contactHeroTitle", e.target.value)}
              placeholder="Questions? Ideas? Let's Connect."
              className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Hero Subtitle Paragraph
            </label>
            <textarea
              rows={3}
              value={form.contactHeroSubtitle || ""}
              onChange={(e) => updateForm("contactHeroSubtitle", e.target.value)}
              placeholder="Every great project starts with a conversation…"
              className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
            />
          </div>
        </div>
      </SectionCard>

      {/* Contact Form + Person Section */}
      <SectionCard
        id="sec-contact-form"
        title="Contact Form & Person Info Section"
        subtitle="Form title, subtitle, FAQ link text, contact person details, and submit button"
        icon={User}
      >
        {/* Contact Person Info */}
        <div className="flex flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" /> Contact Person Photo
          </label>
          <MediaUploader
            label="Contact Person Photo"
            value={form.contactPersonPhotoUrl || null}
            onChange={(url: string | null) => updateForm("contactPersonPhotoUrl", url)}
            accept="image/*"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-white/5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Contact Person Name</label>
              <input
                type="text"
                value={form.contactPersonName || ""}
                onChange={(e) => updateForm("contactPersonName", e.target.value)}
                placeholder="Jowel Mahmud"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Title / Role</label>
              <input
                type="text"
                value={form.contactPersonTitle || ""}
                onChange={(e) => updateForm("contactPersonTitle", e.target.value)}
                placeholder="Mentor | Founder & CEO"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Person Description Paragraph</label>
            <textarea
              rows={2}
              value={form.contactPersonDesc || ""}
              onChange={(e) => updateForm("contactPersonDesc", e.target.value)}
              placeholder="Fill out the form or reach out by email or phone…"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
            Form Content
          </label>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Form Headline Title</label>
            <input
              type="text"
              value={form.contactFormTitle || ""}
              onChange={(e) => updateForm("contactFormTitle", e.target.value)}
              placeholder="Fill the Form to Get a Quick Answer"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Form Subtitle Description</label>
            <textarea
              rows={2}
              value={form.contactFormSubtitle || ""}
              onChange={(e) => updateForm("contactFormSubtitle", e.target.value)}
              placeholder="Fill out the form and our team will get back to you shortly…"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">FAQ Link Text</label>
              <input
                type="text"
                value={form.contactFaqLinkText || ""}
                onChange={(e) => updateForm("contactFaqLinkText", e.target.value)}
                placeholder="Have general Questions? View FAQs"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Submit Button Text</label>
              <input
                type="text"
                value={form.contactFormBtnText || ""}
                onChange={(e) => updateForm("contactFormBtnText", e.target.value)}
                placeholder="Send Message"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </>
  );
}

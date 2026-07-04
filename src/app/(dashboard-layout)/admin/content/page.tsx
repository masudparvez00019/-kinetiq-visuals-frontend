"use client";

import React, { useState } from "react";
import { useAppStore, SiteConfig } from "@/context/store";
import { Save, Sparkles, Check } from "lucide-react";

export default function AdminContentPage() {
  const { siteConfig, updateSiteConfig } = useAppStore();
  const [activeTab, setActiveTab] = useState<"home" | "course" | "contact">("home");
  const [saved, setSaved] = useState(false);

  // Home form states
  const [homeHeroTitle1, setHomeHeroTitle1] = useState(siteConfig.homeHeroTitle1);
  const [homeHeroTitle2, setHomeHeroTitle2] = useState(siteConfig.homeHeroTitle2);
  const [homeHeroTitle3, setHomeHeroTitle3] = useState(siteConfig.homeHeroTitle3);
  const [homeHeroSubtitle, setHomeHeroSubtitle] = useState(siteConfig.homeHeroSubtitle);

  // Course form states
  const [coursePrice, setCoursePrice] = useState(siteConfig.coursePrice);
  const [courseDescription, setCourseDescription] = useState(siteConfig.courseDescription);
  const [mentorName, setMentorName] = useState(siteConfig.mentorName);
  const [mentorTitle, setMentorTitle] = useState(siteConfig.mentorTitle);
  const [mentorBio, setMentorBio] = useState(siteConfig.mentorBio);
  const [mentorExp, setMentorExp] = useState(siteConfig.mentorExp);
  const [mentorProj, setMentorProj] = useState(siteConfig.mentorProj);
  const [mentorStud, setMentorStud] = useState(siteConfig.mentorStud);

  // Contact form states
  const [contactEmail, setContactEmail] = useState(siteConfig.contactEmail);
  const [contactPhone, setContactPhone] = useState(siteConfig.contactPhone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<SiteConfig> = {
      homeHeroTitle1,
      homeHeroTitle2,
      homeHeroTitle3,
      homeHeroSubtitle,
      coursePrice,
      courseDescription,
      mentorName,
      mentorTitle,
      mentorBio,
      mentorExp,
      mentorProj,
      mentorStud,
      contactEmail,
      contactPhone,
    };

    updateSiteConfig(payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading font-normal text-2xl md:text-3xl text-white">
            Page Content CMS
          </h1>
          <p className="font-satoshi text-xs text-slate-500 font-light">
            Edit titles, subtitles, bios, contact credentials, and course prices dynamically.
          </p>
        </div>
        <button
          type="submit"
          form="content-form"
          className="flex items-center gap-2 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs px-5 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,128,255,0.25)] self-start sm:self-auto"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {saved ? "Changes Saved" : "Save Changes"}
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/5 gap-6">
        {(["home", "course", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-heading font-normal text-sm pb-3.5 border-b-2 transition-all capitalize px-1 ${
              activeTab === tab
                ? "border-[#0080ff] text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab === "contact" ? "Contact Details" : `${tab} page`}
          </button>
        ))}
      </div>

      {/* Forms Panel */}
      <div className="bg-[#070914] border border-white/5 rounded-2xl p-6 md:p-8 shadow-lg">
        <form id="content-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* TAB 1: HOME PAGE */}
          {activeTab === "home" && (
            <div className="flex flex-col gap-5">
              <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#0080ff]" />
                Home Hero Section Content
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Hero Title Line 1
                  </label>
                  <input
                    type="text"
                    required
                    value={homeHeroTitle1}
                    onChange={(e) => setHomeHeroTitle1(e.target.value)}
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Hero Title Line 2
                  </label>
                  <input
                    type="text"
                    required
                    value={homeHeroTitle2}
                    onChange={(e) => setHomeHeroTitle2(e.target.value)}
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Hero Title Line 3
                  </label>
                  <input
                    type="text"
                    required
                    value={homeHeroTitle3}
                    onChange={(e) => setHomeHeroTitle3(e.target.value)}
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  Hero Subtitle Copy
                </label>
                <textarea
                  rows={4}
                  required
                  value={homeHeroSubtitle}
                  onChange={(e) => setHomeHeroSubtitle(e.target.value)}
                  className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: COURSE PAGE */}
          {activeTab === "course" && (
            <div className="flex flex-col gap-6">
              {/* Hero Info */}
              <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#0080ff]" />
                  Course Hero Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5 md:col-span-1">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Enrollment Price
                    </label>
                    <input
                      type="text"
                      required
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-3">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Course description
                    </label>
                    <input
                      type="text"
                      required
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                </div>
              </div>

              {/* Mentor Info */}
              <div className="flex flex-col gap-4">
                <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#0080ff]" />
                  Course Mentor details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Mentor Name
                    </label>
                    <input
                      type="text"
                      required
                      value={mentorName}
                      onChange={(e) => setMentorName(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Mentor Title
                    </label>
                    <input
                      type="text"
                      required
                      value={mentorTitle}
                      onChange={(e) => setMentorTitle(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Years Experience
                    </label>
                    <input
                      type="text"
                      required
                      value={mentorExp}
                      onChange={(e) => setMentorExp(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Projects Delivered
                    </label>
                    <input
                      type="text"
                      required
                      value={mentorProj}
                      onChange={(e) => setMentorProj(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Students Trained
                    </label>
                    <input
                      type="text"
                      required
                      value={mentorStud}
                      onChange={(e) => setMentorStud(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Mentor Biography
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={mentorBio}
                    onChange={(e) => setMentorBio(e.target.value)}
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT DETAILS */}
          {activeTab === "contact" && (
            <div className="flex flex-col gap-5">
              <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#0080ff]" />
                Business Contact credentials
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Support Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Support Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

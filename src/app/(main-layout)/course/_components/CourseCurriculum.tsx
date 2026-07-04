"use client";

import React, { useRef, useState } from "react";
import { ChevronDown, Play, Lock, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useAppStore } from "@/context/store";

const PREVIEWS = [
  { label: "01", title: "Introduction & Overview", time: "02:45", locked: false, img: "/nebula-video-poster.png" },
  { label: "02", title: "Introduction & Overview", time: "02:45", locked: false, img: "/nebula-video-poster.png" },
  { label: "03", title: "Introduction & Overview", time: "02:45", locked: false, img: "/nebula-video-poster.png" },
  { label: "04", title: "Introduction & Overview", time: "02:45", locked: true,  img: "/nebula-video-poster.png" },
];

const PERKS = [
  "Hands-on Projects",
  "Real-world Assets",
  "Lifetime Access",
  "Downloadable Resources",
];

export default function CourseCurriculum() {
  const { chapters: CHAPTERS } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [previewPage, setPreviewPage] = useState(1);
  const totalPreviewPages = 5;

  // Safety fallback if activeChapter is out of bounds due to deletion
  const safeActiveChapter = activeChapter >= CHAPTERS.length ? 0 : activeChapter;
  const currentChapter = CHAPTERS[safeActiveChapter] || { title: "Loading...", sub: "" };

  useGSAP(() => {
    gsap.fromTo(
      ".curriculum-header > *",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".curriculum-left, .curriculum-right",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".curriculum-body", start: "top 85%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 relative z-10">

        {/* Header */}
        <div className="curriculum-header flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#0080ff] shrink-0" />
            <span className="font-satoshi text-sm text-[#0080ff] font-semibold tracking-wide">
              Course Curriculam
            </span>
          </div>
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[48px] text-white leading-[1.15] tracking-wide">
            What's Inside{" "}
            <span className="text-[#0080ff]">The<br className="hidden md:inline" /> Course</span>
          </h2>
          <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[620px]">
            Explore a step-by-step learning path designed to help you master video editing, content strategy, and high-converting video creation through practical lessons and real-world projects.
          </p>
        </div>

        {/* Body */}
        <div className="curriculum-body grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start w-full">

          {/* LEFT: Chapter List */}
          <div className="curriculum-left flex flex-col gap-2.5">
            {CHAPTERS.map((ch, i) => {
              const isActive = activeChapter === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveChapter(i)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-300 ${
                    isActive
                      ? "bg-[#0a1330] border-blue-500/30 shadow-[0_0_20px_rgba(0,80,200,0.12)]"
                      : "bg-[#070914] border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Chapter Number Badge */}
                  <span className={`font-heading font-semibold text-sm shrink-0 w-8 text-center ${isActive ? "text-[#0080ff]" : "text-slate-500"}`}>
                    {ch.num}
                  </span>

                  {/* Play Icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-[#0080ff]" : "bg-[#0a0d1a] border border-white/5"}`}>
                    <Play className={`w-3.5 h-3.5 ml-0.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                  </div>

                  {/* Title & Sub */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className={`font-satoshi font-semibold text-sm leading-snug ${isActive ? "text-white" : "text-slate-300"}`}>
                      {ch.title}
                    </span>
                    <span className="font-satoshi text-xs text-slate-500 font-light mt-0.5">
                      {ch.sub}
                    </span>
                  </div>

                  {/* Duration + Chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`font-satoshi text-xs font-semibold ${isActive ? "text-[#0080ff]" : "text-slate-500"}`}>
                      {ch.duration}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? "text-[#0080ff] rotate-180" : "text-slate-600"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Featured Video + Preview Lessons */}
          <div className="curriculum-right flex flex-col gap-6">

            {/* Featured Video Card */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/8 bg-[#070914] shadow-2xl group cursor-pointer">
              <img
                src="/nebula-video-poster.png"
                alt="Featured Lesson"
                className="w-full h-full object-cover opacity-85"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Lesson Label top-left */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <div className="bg-[#0080ff] text-white font-satoshi font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Play className="w-2.5 h-2.5 fill-white" />
                  Lesson {String(activeChapter + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Floating Tool Icons top-right */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {["🎬", "📁", "⚙️", "▶️"].map((icon, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-sm">
                    {icon}
                  </div>
                ))}
              </div>

              {/* Title overlay bottom-left */}
              <div className="absolute bottom-5 left-5 z-10">
                <h3 className="font-heading font-normal text-white text-xl md:text-2xl leading-snug drop-shadow-lg">
                  {currentChapter.title}
                </h3>
                <p className="font-satoshi text-xs text-slate-300 mt-1 font-light">
                  {currentChapter.sub}
                </p>
              </div>

              {/* Play Button Center */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-colors shadow-2xl">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Preview Lessons Header */}
            <div className="flex items-center justify-between">
              <span className="font-heading font-normal text-white text-sm tracking-widest uppercase">
                Preview Lessons
              </span>
              <div className="flex items-center gap-2">
                <span className="font-satoshi text-xs text-slate-400">
                  {previewPage}/{totalPreviewPages}
                </span>
                <button
                  onClick={() => setPreviewPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewPage((p) => Math.min(totalPreviewPages, p + 1))}
                  className="w-8 h-8 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Preview Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {PREVIEWS.map((prev, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col gap-2 cursor-pointer group ${prev.locked ? "opacity-60" : ""}`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-[#070914]">
                    <img
                      src={prev.img}
                      alt={prev.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      {prev.locked ? (
                        <Lock className="w-5 h-5 text-white/60" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-3 h-3 text-white ml-0.5" />
                        </div>
                      )}
                    </div>
                    {/* Label badge */}
                    <div className="absolute top-1.5 left-1.5 bg-black/60 text-white font-satoshi font-bold text-[9px] px-1.5 py-0.5 rounded">
                      {prev.label}
                    </div>
                  </div>
                  {/* Caption */}
                  <span className="font-satoshi text-[10px] text-slate-400 font-light leading-snug line-clamp-1">
                    {prev.title}
                  </span>
                  <span className="font-satoshi text-[10px] text-slate-600">{prev.time}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Perks Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-[#070914] border border-white/5 rounded-2xl px-6 py-5">
          {/* Left: Icon + Perks */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#0a0d1a] border border-white/5 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth={1.7} className="w-6 h-6">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-3">
                {PERKS.map((perk, i) => (
                  <span key={i} className="flex items-center gap-1.5 font-satoshi text-xs text-slate-300 font-medium">
                    <span className="w-1.5 h-1.5 bg-[#0080ff] rounded-full shrink-0" />
                    {perk}
                  </span>
                ))}
              </div>
              <p className="font-satoshi text-xs text-slate-500 font-light">
                Everything you need to create professional, high-converting videos.
              </p>
            </div>
          </div>

          {/* Right: Enroll CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-sm px-7 py-3 rounded-full transition-colors shadow-[0_0_20px_rgba(0,128,255,0.35)] whitespace-nowrap">
              Enroll Now - $149
            </button>
            <button className="w-11 h-11 rounded-full bg-[#0080ff] hover:bg-[#0070e6] text-white flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

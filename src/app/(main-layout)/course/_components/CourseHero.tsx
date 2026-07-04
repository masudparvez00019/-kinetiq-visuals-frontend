"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause, Volume2, Settings, Maximize2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppStore } from "@/context/store";

const STATS = [
  { icon: "play", value: "500+", label: "Premium Lessons" },
  { icon: "graduation", value: "50K+", label: "Happy Students" },
  { icon: "clock", value: "120+", label: "Hours of Content" },
  { icon: "shield", value: "100%", label: "Job-Ready Skills" },
];

const AVATARS = [
  "https://i.pravatar.cc/40?img=11",
  "https://i.pravatar.cc/40?img=22",
  "https://i.pravatar.cc/40?img=33",
];

export default function CourseHero() {
  const { siteConfig } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("02:45");

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".course-hero-label",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    tl.fromTo(
      ".course-hero-title > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out" },
      "-=0.3"
    );

    tl.fromTo(
      ".course-hero-desc",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".course-hero-actions",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".course-hero-social",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".course-hero-video",
      { scale: 0.96, opacity: 0, x: 30 },
      { scale: 1, opacity: 1, x: 0, duration: 1.1, ease: "power3.out" },
      "-=0.9"
    );

    tl.fromTo(
      ".course-stats-row > *",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: containerRef });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((cur / dur) * 100);
    setCurrentTime(formatTime(cur));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * (videoRef.current.duration || 0);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center pt-28 pb-8 px-5 md:px-12 overflow-hidden bg-[#020310]"
    >
      {/* Rich Blue Radial Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Center-bottom deep blue glow burst */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#0040cc]/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0066ff]/20 blur-[80px] rounded-full" />
        {/* Left side hint */}
        <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-[#0033aa]/15 blur-[100px] rounded-full" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-14">

        {/* Two Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* LEFT: Text Content */}
          <div className="flex flex-col gap-6 max-w-[600px]">

            {/* Label */}
            <div className="course-hero-label flex items-center gap-2.5">
              <div className="w-3 h-3 bg-[#0080ff] shrink-0" />
              <span className="font-satoshi text-sm text-[#0080ff] font-semibold tracking-wide">
                Courses
              </span>
            </div>

            {/* Title */}
            <h1 className="course-hero-title font-heading font-normal leading-[1.1] tracking-wide flex flex-col gap-0">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-white">Master</span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-white">Cinematic</span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-[#0080ff]">Video Editing</span>
            </h1>

            {/* Description */}
            <p className="course-hero-desc font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[480px]">
              {siteConfig.courseDescription}
            </p>

            {/* CTA Actions */}
            <div className="course-hero-actions flex items-center gap-3">
              <button className="bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-sm px-8 py-3.5 rounded-full transition-colors shadow-[0_0_24px_rgba(0,128,255,0.45)] whitespace-nowrap">
                Enroll Now - {siteConfig.coursePrice}
              </button>
              <button className="w-12 h-12 rounded-full bg-[#0080ff] hover:bg-[#0070e6] text-white flex items-center justify-center transition-colors shadow-[0_0_18px_rgba(0,128,255,0.35)]">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="course-hero-social flex items-center gap-3.5">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3">
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Student ${i + 1}`}
                    className="w-9 h-9 rounded-full border-2 border-[#020310] object-cover"
                    style={{ zIndex: AVATARS.length - i }}
                  />
                ))}
              </div>
              {/* Ratings Info */}
              <div className="flex flex-col gap-0.5">
                <span className="font-satoshi text-xs text-white font-semibold">
                  Loved by {siteConfig.mentorStud}+ Students
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <svg key={s} viewBox="0 0 16 16" fill="#f59e0b" className="w-3 h-3">
                      <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
                    </svg>
                  ))}
                  <span className="font-satoshi text-[10px] text-slate-400 ml-0.5">4.9 (230+ Reviews)</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Video Player */}
          <div className="course-hero-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative flex flex-col">
            {/* Video Element */}
            <div className="relative aspect-video w-full bg-black group cursor-pointer" onClick={togglePlay}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/nebula-video-poster.png"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                preload="none"
                playsInline
              >
                <source src="/video/video.mp4" type="video/mp4" />
              </video>

              {/* Play Overlay */}
              <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                  {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="bg-[#0a0d1a] border-t border-white/5 px-4 py-3 flex flex-col gap-2">
              {/* Progress Bar */}
              <div
                className="w-full h-1 bg-white/10 rounded-full cursor-pointer relative overflow-hidden group"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-[#0080ff] rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="text-slate-300 hover:text-white transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="font-satoshi text-[11px] text-slate-400">
                    {currentTime} / {duration}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Volume2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                  <Settings className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                  <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="course-stats-row grid grid-cols-2 lg:grid-cols-4 w-full bg-[#0a0d1a]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-6 lg:px-8 py-6 ${i < STATS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-white/5" : ""}`}
            >
              {/* Icon Circle */}
              <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                {stat.icon === "play" && <Play className="w-4 h-4 text-slate-300 ml-0.5" />}
                {stat.icon === "graduation" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-300">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {stat.icon === "clock" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-300">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {stat.icon === "shield" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-300">
                    <path d="M12 2l7 4v6c0 4-3.5 7.74-7 9-3.5-1.26-7-5-7-9V6l7-4z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {/* Value & Label */}
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-xl md:text-2xl text-white leading-none">
                  {stat.value}
                </span>
                <span className="font-satoshi text-[10px] md:text-xs text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

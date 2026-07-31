"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause, Volume2, Settings, Maximize2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/context/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

function CounterNumber({ value }: { value: string }) {
  const [displayVal, setDisplayVal] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useGSAP(() => {
    if (!nodeRef.current) return;
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: targetNum,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: nodeRef.current,
        start: "top 95%",
      },
      onUpdate: () => {
        setDisplayVal(Math.floor(obj.val));
      },
    });
  }, { scope: nodeRef });

  return (
    <span ref={nodeRef} className="font-satoshi font-semibold text-2xl md:text-[32px] text-white tracking-tight leading-none">
      {displayVal}{suffix}
    </span>
  );
}

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
      videoRef.current.play().catch(() => {});
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
      {/* Products Background Image (Clearly Visible) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          src="/image-232.png"
          alt="Background Visual"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      </div>

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

          {/* LEFT: Text Content (Figma Spec: 659px width) */}
          <div className="flex flex-col gap-6 max-w-[659px] w-full">

            {/* Label */}
            <div className="course-hero-label flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 bg-[#5097f5] shrink-0" />
              <span className="font-heading font-normal text-sm md:text-base text-white tracking-normal">
                Courses
              </span>
            </div>

            {/* Title (Figma Spec: PP Monument Extended 62px, leading 70px, weight 400) */}
            <h1 className="course-hero-title font-heading font-normal tracking-normal flex flex-col gap-0">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] text-white leading-[1.15] lg:leading-[70px]">Master</span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] text-white leading-[1.15] lg:leading-[70px]">Cinematic</span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] text-[#5097f5] leading-[1.15] lg:leading-[70px]">Video Editing</span>
            </h1>

            {/* Description */}
            <p className="course-hero-desc font-satoshi text-xs md:text-sm text-slate-300 font-light leading-relaxed max-w-[480px]">
              {siteConfig.courseDescription}
            </p>

            {/* CTA Actions (Matching Services Gradient Style) */}
            <div className="course-hero-actions flex items-center gap-3">
              <Link href="/contact" className="bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:shadow-[0_0_25px_rgba(44,130,245,0.5)] active:scale-95 transition-all duration-300 text-white font-satoshi font-semibold text-sm md:text-base px-9 py-3.5 rounded-full cursor-pointer whitespace-nowrap inline-flex items-center justify-center">
                Enroll Now - {siteConfig.coursePrice}
              </Link>
              <Link href="/contact" className="w-12 h-12 rounded-full bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:shadow-[0_0_25px_rgba(44,130,245,0.5)] active:scale-95 transition-all duration-300 text-white flex items-center justify-center cursor-pointer shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </Link>
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
          <div className="course-hero-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative aspect-video group cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover relative z-0"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              preload="auto"
              playsInline
            >
              <source src="/video/video.mp4" type="video/mp4" />
            </video>

            {/* Play Overlay Button */}
            <div className={`absolute inset-0 bg-black/10 group-hover:bg-black/20 flex items-center justify-center transition-opacity duration-300 z-10 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
              <div className="w-16 h-16 rounded-2xl bg-[#0b1328]/85 border border-white/25 backdrop-blur-md text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-110 hover:bg-[#2C82F5] transition-all duration-300">
                {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
              </div>
            </div>

            {/* Floating Video Controls Overlay Bar (Matching Screenshot UI) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex flex-col gap-3 select-none">
              {/* Progress Bar */}
              <div
                className="w-full h-[3.5px] bg-white/20 hover:h-[5px] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-[#0080ff] rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md" />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="text-white hover:text-[#0080ff] transition-colors cursor-pointer">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-satoshi text-xs md:text-sm text-white font-medium tracking-wide">
                    {currentTime} / {duration}
                  </span>
                </div>
                <div className="flex items-center gap-3.5 text-white">
                  <Volume2 className="w-4.5 h-4.5 hover:text-[#0080ff] cursor-pointer transition-colors" />
                  <Settings className="w-4.5 h-4.5 hover:text-[#0080ff] cursor-pointer transition-colors" />
                  <Maximize2 className="w-4.5 h-4.5 hover:text-[#0080ff] cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row (Exact Figma 1 Match: Satoshi Numbers, Thin White Outlined Icons, Shiny Lens Separators) */}
        <div className="course-stats-row relative w-full bg-[#070d1e]/60 border border-white/15 rounded-[28px] overflow-hidden backdrop-blur-2xl px-6 py-6 md:py-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
          {/* Top Specular Edge Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-20" />
          
          {/* Ambient Blue Light Wave Streak */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.2),transparent_70%)] pointer-events-none z-0" />

          {STATS.map((stat, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-4 flex-1 justify-center relative z-10">
                {/* Icon Circle (Translucent Blue Fill, Thin White Outlined Icon) */}
                <div className="w-14 h-14 rounded-full border border-white/20 bg-[#162744]/70 flex items-center justify-center shrink-0 shadow-md">
                  {stat.icon === "play" && (
                    <Play className="w-5 h-5 text-white stroke-[1.6] fill-none ml-0.5" />
                  )}
                  {stat.icon === "graduation" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.6} className="w-5 h-5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {stat.icon === "clock" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.6} className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {stat.icon === "shield" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.6} className="w-5 h-5">
                      <path d="M12 2l7 4v6c0 4-3.5 7.74-7 9-3.5-1.26-7-5-7-9V6l7-4z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Value & Label */}
                <div className="flex flex-col text-left">
                  <CounterNumber value={stat.value} />
                  <span className="font-satoshi text-[11px] md:text-[12px] text-[#94a3b8] uppercase tracking-wider font-medium mt-1.5">
                    {stat.label}
                  </span>
                </div>
              </div>

              {/* Special Tapered Shiny Lens Vertical Separator Line */}
              {i < STATS.length - 1 && (
                <div
                  className="hidden lg:block w-[1.5px] h-12 shrink-0 self-center z-10"
                  style={{
                    background: "linear-gradient(to bottom, transparent 0%, rgba(80,78,234,0.15) 15%, rgba(80,78,234,0.9) 35%, #FFFFFF 50%, rgba(80,78,234,0.9) 65%, rgba(80,78,234,0.15) 85%, transparent 100%)"
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}

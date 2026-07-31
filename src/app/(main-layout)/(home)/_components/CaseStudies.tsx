"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Target, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CASE_STUDIES = [
  {
    id: 1,
    clientName: "Fashion Brand",
    campaignName: "90 Day Campaign",
    campaignGoal: "Goal: Increase Revenue & ROAS",
    stats: [
      { value: "250%", label: "Revenue Growth" },
      { value: "200%", label: "Saved on Ads" },
      { value: "45%", label: "Retention Increase" },
    ],
    tags: ["Fashion", "UGC", "90 Days", "TikTok", "Meta Ads"],
    videoSrc: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote: "Fast delivery, clear communication, and edits that actually perform. We saw a huge boost in retention and short-form reach after partnering with them.",
      authorName: "Jowel Mahmud",
      authorTitle: "Mentor | Founder & CEO | KinetiQ Visuals",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
    }
  },
  {
    id: 2,
    clientName: "McCart Real Estate",
    campaignName: "60 Day Campaign",
    campaignGoal: "Goal: Build Luxury Agent Branding",
    stats: [
      { value: "180%", label: "Lead Conversion" },
      { value: "350+", label: "Qualified Leads" },
      { value: "12", label: "Closed Luxury Deals" },
    ],
    tags: ["Real Estate", "Drone", "60 Days", "YouTube", "Organic"],
    videoSrc: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote: "KinetiQ Visuals scaled our property content creation ten-fold. Their attention to dynamic pacing and sound design matches our standard for ultra-luxury residential sales.",
      authorName: "Arnel Mccart",
      authorTitle: "CEO | McCart Real Estate Group",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    }
  },
  {
    id: 3,
    clientName: "Pulse Fitness",
    campaignName: "30 Day Campaign",
    campaignGoal: "Goal: Drive Program Signups",
    stats: [
      { value: "310%", label: "Signups Growth" },
      { value: "450+", label: "Active Members" },
      { value: "-35%", label: "Cost Per Acquisition" },
    ],
    tags: ["Fitness", "UGC", "30 Days", "Instagram", "Ads"],
    videoSrc: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote: "The conversion rate on our video ads skyrocketed. The pacing, hooks, and captions were exactly what our target audience wanted to see.",
      authorName: "Sarah Jenkins",
      authorTitle: "Founder | Pulse Fitness Academy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    }
  },
  {
    id: 4,
    clientName: "CloudFlow Tech",
    campaignName: "90 Day Campaign",
    campaignGoal: "Goal: Increase Explainer Conversions",
    stats: [
      { value: "400%", label: "Demo Bookings" },
      { value: "120+", label: "Enterprise Leads" },
      { value: "-50%", label: "Cost Per Lead" },
    ],
    tags: ["SaaS", "Explainer", "90 Days", "LinkedIn", "Meta Ads"],
    videoSrc: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote: "We needed complex technical features translated into engaging visual stories. Antigravity/KinetiQ delivered beyond our expectations.",
      authorName: "David Chen",
      authorTitle: "Head of Product | CloudFlow SaaS",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    }
  },
  {
    id: 5,
    clientName: "Aura Fine Jewelry",
    campaignName: "45 Day Campaign",
    campaignGoal: "Goal: Showcase Premium Aesthetic",
    stats: [
      { value: "150%", label: "Sales Increase" },
      { value: "+80%", label: "Avg Order Value" },
      { value: "4.8x", label: "ROAS Achieved" },
    ],
    tags: ["Luxury", "Cinematic", "45 Days", "TikTok", "Instagram"],
    videoSrc: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote: "The aesthetic quality of the video edits perfectly matched our high-end branding. It translated directly into higher trust and sales.",
      authorName: "Elena Rostova",
      authorTitle: "Creative Director | Aura Fine Jewelry",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    }
  }
];

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentCase = CASE_STUDIES[activeIndex];

  useGSAP(() => {
    // 1. Entrance Animations via ScrollTrigger
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    entranceTl.fromTo(
      ".case-header-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    entranceTl.fromTo(
      ".case-main-card",
      { y: 50, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
      "-=0.5"
    );

    entranceTl.fromTo(
      ".case-border-line-svg",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
      "-=0.8"
    );

    entranceTl.fromTo(
      ".case-stat-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    entranceTl.fromTo(
      ".case-video-container",
      { scale: 0.95, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    entranceTl.fromTo(
      ".case-tag-item",
      { y: 15, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      "-=0.7"
    );

    entranceTl.fromTo(
      ".case-client-panel",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.5"
    );

    entranceTl.fromTo(
      ".case-quote-panel",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  const handleSlideChange = (nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Stop video if playing
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);

    // Animate out current slide elements
    const tlOut = gsap.timeline({
      onComplete: () => {
        // Change slide index in state
        setActiveIndex(nextIndex);
        
        // Reload video source
        if (videoRef.current) {
          videoRef.current.load();
        }

        // Animate in new slide elements
        const tlIn = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false);
          }
        });

        tlIn.fromTo(
          ".case-stat-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );

        tlIn.fromTo(
          ".case-video-container",
          { scale: 0.96, opacity: 0, filter: "blur(8px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );

        tlIn.fromTo(
          ".case-tag-item",
          { y: 12, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" },
          "-=0.5"
        );

        tlIn.fromTo(
          ".case-client-panel",
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );

        tlIn.fromTo(
          ".case-quote-panel",
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.5"
        );
      }
    });

    tlOut.to(".case-stat-item", { y: -20, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.in" });
    tlOut.to(".case-video-container", { scale: 0.96, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power2.in" }, "-=0.25");
    tlOut.to(".case-tag-item", { y: -12, opacity: 0, scale: 0.95, duration: 0.25, stagger: 0.04, ease: "power2.in" }, "-=0.3");
    tlOut.to(".case-client-panel", { x: -20, opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.3");
    tlOut.to(".case-quote-panel", { x: 20, opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.3");
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % CASE_STUDIES.length;
    handleSlideChange(nextIndex);
  };

  const handlePrev = () => {
    const nextIndex = (activeIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
    handleSlideChange(nextIndex);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="works"
      ref={containerRef}
      className="w-full py-24 bg-[#020205] px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto w-full flex flex-col gap-12 relative z-10">
        
        {/* Section Heading */}
        <div className="case-header-title flex flex-col md:flex-row md:items-center gap-3 md:gap-4 select-none">
          <h2 className="font-heading font-normal text-3xl md:text-[40px] text-white tracking-wide">
            Case Studies
          </h2>
          <div className="flex items-center gap-3 text-white/90">
            <span className="w-2.5 h-2.5 bg-blue-500 shrink-0 hidden md:block" />
            <span className="font-syne text-[14px] md:text-[18px] tracking-normal opacity-90">
              Real projects. Real growth. Real impact.
            </span>
          </div>
        </div>

        {/* Main Case Study Card Container */}
        <div className="case-main-card w-full bg-[#000716] rounded-[24px] p-8 md:p-12 shadow-2xl relative">
          
          {/* Top Shiny Border Line (Tapered Lens shape) */}
          <svg className="case-border-line-svg origin-center absolute top-0 left-[24px] right-[24px] w-[calc(100%-48px)] h-[3.5px] pointer-events-none" viewBox="0 0 100 3.5" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glow-grad-top" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#glow-grad-top)" />
          </svg>
          
          {/* Bottom Shiny Border Line (Tapered Lens shape) */}
          <svg className="case-border-line-svg origin-center absolute bottom-0 left-[24px] right-[24px] w-[calc(100%-48px)] h-[3.5px] pointer-events-none" viewBox="0 0 100 3.5" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glow-grad-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#glow-grad-bottom)" />
          </svg>

          {/* Slider Content Wrapper */}
          <div className="flex flex-col gap-12">
            
            {/* Top Grid: Stats, Video Player, Tags */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Stats */}
              <div className="lg:col-span-3 grid grid-cols-3 lg:flex lg:flex-col lg:justify-between lg:items-start gap-4 lg:gap-0 lg:h-[300px]">
                {currentCase.stats.map((stat, i) => (
                  <div key={i} className="case-stat-item flex flex-col gap-1.5 justify-center lg:justify-start">
                    <h3 className="font-satoshi font-light text-3xl md:text-[48px] text-[#89bdf2] leading-none">
                      {stat.value}
                    </h3>
                    <span className="text-white/80 text-[11px] md:text-[14px] font-satoshi tracking-normal mt-1.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Center Column: Video Player */}
              <div className="lg:col-span-6 case-video-container">
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-xl relative group cursor-pointer">
                  <video
                    ref={videoRef}
                    onClick={togglePlay}
                    loop
                    preload="none"
                    poster={currentCase.poster}
                    className="w-full h-full object-cover"
                    playsInline
                  >
                    <source src={currentCase.videoSrc} type="video/mp4" />
                  </video>

                  {/* Sleek Play Button Overlay (Glassmorphism design) */}
                  <div
                    onClick={togglePlay}
                    className={`absolute inset-0 transition-all duration-300 flex items-center justify-center ${
                      isPlaying ? "bg-transparent pointer-events-none" : "bg-black/20 group-hover:bg-black/35"
                    }`}
                  >
                    <button
                      onClick={togglePlay}
                      className={`w-20 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
                        isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"
                      }`}
                    >
                      {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-1" />}
                    </button>
                  </div>

                  {/* Left bottom progress hint */}
                  <div className="absolute bottom-4 left-5 z-20 text-[10px] tracking-wider font-satoshi uppercase text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {isPlaying ? "Click to Pause" : "Click to Play"}
                  </div>
                </div>
              </div>

              {/* Right Column: Tags */}
              <div className="lg:col-span-3 flex flex-wrap justify-center lg:flex-col lg:justify-between lg:items-end gap-3 lg:gap-0 lg:h-[300px]">
                {currentCase.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="case-tag-item case-gradient-btn text-white text-[14px] font-satoshi flex items-center justify-center rounded-[30px] shrink-0 w-full lg:w-[108px] h-[42px] hover:scale-[1.03] active:scale-98 transition-all duration-300 cursor-pointer select-none"
                  >
                    {tag}
                  </div>
                ))}
              </div>

            </div>

            {/* Horizontal Divider Line */}
            <div className="w-full h-[1px] bg-white/5" />

            {/* Bottom Row: Client Details & Quote testimonial */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
              
              {/* Client Info (Left) */}
              <div className="lg:col-span-4 case-client-panel flex flex-col gap-1 justify-center">
                <span className="text-[14px] md:text-[16px] text-[#89bdf2] font-satoshi font-medium tracking-normal">
                  Client
                </span>
                <h4 className="text-lg md:text-[22px] font-normal font-satoshi text-white leading-tight mt-1">
                  {currentCase.clientName}
                </h4>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2.5 text-white/80 text-sm">
                    <Calendar size={16} className="text-white/60 shrink-0" />
                    <span className="font-satoshi">{currentCase.campaignName}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white/80 text-sm">
                    <Target size={16} className="text-white/60 shrink-0" />
                    <span className="font-satoshi">{currentCase.campaignGoal}</span>
                  </div>
                </div>
              </div>

              {/* Vertical Divider (Desktop Only) */}
              <div className="lg:col-span-1 hidden lg:flex justify-center self-stretch">
                <div className="w-[1px] bg-white/5 h-full min-h-[100px]" />
              </div>

              {/* Testimonial Quote (Right) */}
              <div className="lg:col-span-7 case-quote-panel flex flex-col md:flex-row gap-6 items-center">
                {/* User Avatar Ring */}
                <div className="relative w-[120px] h-[120px] rounded-full border border-blue-500/30 flex items-center justify-center shrink-0">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-slate-800">
                    <img
                      src={currentCase.testimonial.avatar}
                      alt={currentCase.testimonial.authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Quote Text */}
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <span className="text-blue-500 text-[48px] font-serif leading-none absolute -top-4 -left-2 select-none opacity-80">“</span>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed pl-6 pt-1 font-satoshi">
                      {currentCase.testimonial.quote}
                    </p>
                  </div>
                  <div className="pl-6 mt-1 flex flex-col">
                    <span className="font-syne font-bold text-sm md:text-base text-blue-400 leading-none">
                      {currentCase.testimonial.authorName}
                    </span>
                    <span className="text-[11px] text-slate-500 font-satoshi mt-1.5 tracking-wide uppercase leading-none">
                      {currentCase.testimonial.authorTitle}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Carousel Slide Indicators & Controls */}
        <div className="flex justify-center items-center gap-6 mt-4 select-none">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center text-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 bg-transparent cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-1.5">
            <span className="font-syne text-blue-400 font-bold text-lg leading-none">
              {activeIndex + 1}
            </span>
            <span className="font-syne text-slate-700 text-lg leading-none">/</span>
            <span className="font-syne text-slate-500 text-lg leading-none">
              {CASE_STUDIES.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center text-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 bg-transparent cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      <style jsx global>{`
        .case-gradient-btn {
          border: 1px solid transparent;
          background: linear-gradient(to bottom, #060c18, #03060c) padding-box,
                      linear-gradient(135deg, #032688, #2c82f5) border-box;
        }
      `}</style>
    </section>
  );
}


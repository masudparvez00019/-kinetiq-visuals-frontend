"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlay, FaPause } from "react-icons/fa";
import { SiteConfig } from "@/types/site-config";
import { siteConfigService } from "@/services/site-config.service";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseSectionProps {
  initialConfig?: SiteConfig | null;
}

export default function ShowcaseSection({ initialConfig }: ShowcaseSectionProps) {
  const [config, setConfig] = useState<SiteConfig | null>(initialConfig || null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!initialConfig) {
      siteConfigService.get().then(setConfig).catch(() => {});
    }
  }, [initialConfig]);

  const title = config?.showcaseTitle || "See What Your Content Could Become";
  const subtitle =
    config?.showcaseSubtitle ||
    "From short–form social content to high–end commercial edits, explore our work and discover how strategic editing transforms ordinary footage into engaging brand assets.";
  const videoUrl = config?.showcaseVideoUrl || "/video/video.mp4";
  const posterUrl =
    config?.showcasePosterUrl ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  useGSAP(() => {
    // Header fade-up
    gsap.fromTo(
      ".showcase-text-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    // Video container entrance
    gsap.fromTo(
      ".showcase-video-wrapper",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".showcase-video-wrapper",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      // Fade play button in
      gsap.to(".play-overlay-btn", { scale: 1, opacity: 1, duration: 0.3 });
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      // Shrink play button out
      gsap.to(".play-overlay-btn", { scale: 0.8, opacity: 0, duration: 0.3 });
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full py-24 bg-[#020205] px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center gap-16 relative z-10">
        {/* Section Header */}
        <div className="text-center flex flex-col gap-6 max-w-6xl w-full">
          <h2 className="showcase-text-item font-heading font-normal text-2xl sm:text-3xl md:text-[40px] lg:text-[48px] text-white leading-tight md:leading-[56px] tracking-wide whitespace-pre-line">
            {title}
          </h2>
          <p className="showcase-text-item text-[#F2F5FA] text-xs md:text-[16px] leading-relaxed md:leading-[24px] max-w-[893px] mx-auto font-heading whitespace-pre-line">
            {subtitle}
          </p>
        </div>

        {/* Video Player */}
        <div className="showcase-video-wrapper w-full aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl relative group cursor-pointer">
          <video
            key={videoUrl}
            ref={videoRef}
            src={videoUrl}
            onClick={togglePlay}
            loop
            preload="none"
            poster={posterUrl}
            className="w-full h-full object-cover"
            playsInline
          />

          {/* Custom Overlay (Play/Pause indicator) */}
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center"
          >
            <button
              onClick={togglePlay}
              className="play-overlay-btn w-20 h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 transform group-hover:scale-105"
            >
              {isPlaying ? <FaPause size={24} className="ml-0" /> : <FaPlay size={24} className="ml-1" />}
            </button>
          </div>

          {/* Bottom Video Progress overlay */}
          <div className="absolute bottom-4 left-6 z-20 text-xs text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {isPlaying ? "Click to Pause" : "Click to Play"}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, Settings, Maximize2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState("01:26");
  const [duration, setDuration] = useState("02:45");

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useGSAP(() => {
    // Reveal header
    gsap.fromTo(
      ".preview-header-group > *",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Video container entrance
    gsap.fromTo(
      ".preview-video-wrapper",
      { scale: 0.96, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".preview-video-wrapper",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      gsap.to(".play-overlay-btn", { scale: 1, opacity: 1, duration: 0.3 });
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      gsap.to(".play-overlay-btn", { scale: 0.8, opacity: 0, duration: 0.3 });
    }
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

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-20 px-5 md:px-12 relative z-10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 relative z-10">
        
        {/* Header block */}
        <div className="text-center flex flex-col gap-4 items-center select-none preview-header-group">
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[40px] text-white leading-tight tracking-wide">
            Pack Preview
          </h2>
          <p className="font-heading font-normal text-sm md:text-[16px] text-slate-300 leading-[24px] tracking-normal max-w-[849px] mx-auto">
            Take a quick look at what's inside and see how these professionally crafted assets can support your next project.
          </p>
        </div>

        {/* Video Player */}
        <div className="preview-video-wrapper w-full aspect-video rounded-[32px] overflow-hidden border border-white/10 bg-[#070914] shadow-2xl relative group cursor-pointer">
          <video
            ref={videoRef}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            loop
            preload="none"
            poster="/nebula-video-poster.png"
            className="w-full h-full object-cover relative z-0"
            playsInline
          >
            <source src="/video/video.mp4" type="video/mp4" />
          </video>

          {/* Center Play/Pause Overlay Button */}
          <div
            onClick={togglePlay}
            className={`absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center z-10 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
          >
            <button
              onClick={togglePlay}
              className="play-overlay-btn w-16 h-16 rounded-2xl bg-[#0b1328]/85 border border-white/25 backdrop-blur-md text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-110 hover:bg-[#2C82F5] transition-all duration-300 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
            </button>
          </div>

          {/* Bottom Overlay Controls Bar (Matching Screenshot UI) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex flex-col gap-3.5 select-none">
            {/* Progress Bar Line */}
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
              {/* Left: Pause/Play & Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-[#0080ff] transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 fill-white" />
                  )}
                </button>
                <span className="font-satoshi text-xs md:text-sm text-white font-medium tracking-wide">
                  {currentTime} / {duration}
                </span>
              </div>

              {/* Right: Volume, Settings, Fullscreen */}
              <div className="flex items-center gap-4 text-white">
                <Volume2 className="w-5 h-5 hover:text-[#0080ff] cursor-pointer transition-colors" />
                <Settings className="w-5 h-5 hover:text-[#0080ff] cursor-pointer transition-colors" />
                <Maximize2
                  onClick={toggleFullscreen}
                  className="w-5 h-5 hover:text-[#0080ff] cursor-pointer transition-colors"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

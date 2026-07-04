"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      // Fade play button in
      gsap.to(".play-overlay-btn", { scale: 1, opacity: 1, duration: 0.3 });
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      // Shrink play button out
      gsap.to(".play-overlay-btn", { scale: 0.8, opacity: 0, duration: 0.3 });
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
          <p className="font-satoshi text-xs md:text-sm text-slate-400 leading-relaxed font-light max-w-[620px] mx-auto">
            Take a quick look at what's inside and see how these professionally crafted assets can support your next project.
          </p>
        </div>

        {/* Video Player */}
        <div className="preview-video-wrapper w-full aspect-video rounded-[32px] overflow-hidden border border-white/10 bg-[#070914] shadow-2xl relative group cursor-pointer">
          <video
            ref={videoRef}
            onClick={togglePlay}
            loop
            preload="none"
            poster="/nebula-video-poster.png"
            className="w-full h-full object-cover relative z-0"
            playsInline
          >
            <source src="/video/video.mp4" type="video/mp4" />
          </video>

          {/* Play/Pause Button Overlay */}
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center z-10"
          >
            <button
              onClick={togglePlay}
              className="play-overlay-btn w-20 h-20 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

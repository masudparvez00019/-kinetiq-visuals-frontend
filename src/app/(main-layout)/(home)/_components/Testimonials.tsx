"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    videoUrl: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&h=400&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Daniel Carter",
    role: "Luxury Real Estate Agent",
    text: "Working with this team completely changed our content game. Our engagement increased within weeks and the editing quality was on another level.",
  },
  {
    videoUrl: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=400&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Emma Collins",
    role: "Realtor & Property Consultant",
    text: "Fast delivery, clear communication, and edits that actually perform. We saw a huge boost in retention and short-form reach after partnering with them.",
  },
  {
    videoUrl: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&h=400&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Marcus Johnson",
    role: "Real Estate Agent, Compass",
    text: "The drone matching and custom coordinates overlays they designed helped us double our listing engagement within a week. Highly recommended!",
  },
  {
    videoUrl: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=300&h=400&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Sarah Lindst",
    role: "Marketing Director, Coldwell",
    text: "Pacing, timing, sound effects, and color grading were completely perfect. Their turnarounds are incredibly fast and revisions are handled instantly.",
  },
  {
    videoUrl: "/video/video.mp4",
    poster: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&h=400&q=80",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Michael Thorne",
    role: "Founder, Thorne Media",
    text: "Their attention to detail and ability to tell a appealing story through video editing is unmatched. They helped us scale our social media presence massively.",
  },
];

const SPOTLIGHT_CSS = `
  .testimonial-card-item {
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
  }
  .testimonial-card-item::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: radial-gradient(
      350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      rgba(255, 255, 255, 0.18),
      transparent 60%
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 2;
  }
  .testimonial-card-item:hover::before {
    opacity: 1;
  }
  .card-cursor-glow-element {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      rgba(255, 255, 255, 0.05),
      transparent 80%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }
  .testimonial-card-item:hover .card-cursor-glow-element {
    opacity: 1;
  }
`;

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [cardWidth, setCardWidth] = useState(668);
  const gap = 24;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth - 48);
      } else if (window.innerWidth < 1024) {
        setCardWidth(500);
      } else {
        setCardWidth(668);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. Initial entrance animations on scroll
  useGSAP(() => {
    gsap.set(".testimonial-card-item", { transformPerspective: 1000 });

    gsap.fromTo(
      ".testimonials-header-group",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      ".testimonial-slider-viewport",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  // 2. Active Card contents fade/slide transition on activeIndex changes
  useGSAP(() => {
    const activeCard = trackRef.current?.children[activeIndex] as HTMLElement;
    if (!activeCard) return;

    // Ensure all cards are fully visible and bright (no disabled/faded look!)
    const allCards = Array.from(trackRef.current?.children || []) as HTMLElement[];
    allCards.forEach((card) => {
      gsap.set(card.querySelectorAll(".testimonial-video-box, .testimonial-quote-text, .testimonial-author-group"), {
        opacity: 1,
        y: 0
      });
    });

    // Staggered premium entrance of the active card's inner content
    const targets = activeCard.querySelectorAll(".testimonial-video-box, .testimonial-quote-text, .testimonial-author-group");
    gsap.fromTo(
      targets,
      { opacity: 0.85, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        overwrite: "auto"
      }
    );
  }, { dependencies: [activeIndex], scope: containerRef });

  const handleNext = () => {
    setPlayingIndex(null);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setPlayingIndex(null);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (-(y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto"
    });
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <section
      ref={containerRef}
      className="w-full py-24 bg-[#020205] px-6 md:px-12 relative overflow-hidden"
    >
      {/* Inject Spotlight Styles */}
      <style>{SPOTLIGHT_CSS}</style>

      <div className="max-w-[1360px] mx-auto w-full flex flex-col gap-16 relative z-10">
        
        {/* Section Header with Navigation Controls */}
        <div className="testimonials-header-group flex flex-col md:flex-row md:items-end justify-between gap-6 select-none">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white font-heading font-normal tracking-wide text-xs md:text-sm">
              <span className="w-2.5 h-2.5 bg-blue-500 shrink-0" />
              <span>Testimonials</span>
            </div>
            <h2 className="font-heading font-normal text-3xl md:text-[40px] text-white leading-tight tracking-wide">
              What they say <br /> about Us?
            </h2>
          </div>
          
          {/* Carousel Slide Indicators & Controls */}
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center text-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 bg-transparent cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-1.5">
              <span className="font-satoshi text-blue-400 font-bold text-lg leading-none">
                {activeIndex + 1}
              </span>
              <span className="font-satoshi text-slate-700 text-lg leading-none">/</span>
              <span className="font-satoshi text-[#2C82F5] text-lg leading-none">
                {TESTIMONIALS.length}
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

        {/* Testimonials Slider Viewport */}
        <div className="testimonial-slider-viewport overflow-hidden w-full relative py-8 -my-8 px-2 -mx-2">
          <div
            ref={trackRef}
            className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-max"
            style={{
              transform: `translateX(-${activeIndex * (cardWidth + gap)}px)`,
            }}
          >
            {TESTIMONIALS.map((item, idx) => {
              const isPlaying = playingIndex === idx;
              return (
                <div
                  key={idx}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="testimonial-card-item shrink-0 relative p-4 sm:p-6 bg-gradient-to-b from-[#4F46E5] to-[#001A49] rounded-[24px] border border-indigo-500/20 hover:border-indigo-400/40 hover:shadow-[0_20px_50px_rgba(79,70,231,0.22)] transition-colors duration-500 flex flex-col sm:flex-row gap-6 group h-[560px] sm:h-[480px] cursor-pointer"
                  style={{ width: `${cardWidth}px` }}
                >
                  {/* Local Cursor Spotlight Glow */}
                  <div className="card-cursor-glow-element" />

                  {/* Left Side: Video Player Container */}
                  <div className="testimonial-video-box relative w-full sm:w-[285px] h-[230px] sm:h-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0 z-10 group/vid transition-transform duration-500 group-hover:scale-[1.01]">
                    {isPlaying ? (
                      <video
                        src={item.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                      />
                    ) : (
                      <>
                        <img
                          src={item.poster}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/vid:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                          <button
                            onClick={() => setPlayingIndex(idx)}
                            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl transition-all duration-300 group-hover/vid:scale-110 group-hover/vid:bg-[#2C82F5] group-hover/vid:border-[#2C82F5] group-hover/vid:shadow-[0_0_20px_rgba(44,130,245,0.4)] cursor-pointer"
                            aria-label="Play video"
                          >
                            <Play size={20} fill="white" className="ml-1" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right Side: Quote and Author Info */}
                  <div className="flex-1 flex flex-col justify-between py-2 text-left relative z-10 select-none">
                    {/* Quote Text */}
                    <p className="testimonial-quote-text text-[15px] sm:text-[18px] lg:text-[20px] text-slate-200 leading-[1.65] font-satoshi font-light transition-colors duration-300 group-hover:text-white">
                      “{item.text}”
                    </p>

                    {/* Author Details */}
                    <div className="testimonial-author-group flex items-center gap-4 mt-6 sm:mt-0">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-blue-400/40 group-hover:scale-105 transition-all duration-300 bg-slate-900 shrink-0">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-satoshi font-bold text-base md:text-lg text-white tracking-wide transition-colors duration-300 group-hover:text-blue-200">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-blue-300 font-satoshi mt-1 font-medium tracking-wide">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

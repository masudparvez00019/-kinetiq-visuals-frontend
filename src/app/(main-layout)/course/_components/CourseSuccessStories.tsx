"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORIES = [
  {
    name: "James Carter",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    quote: "The course completely changed how I approach client projects and editing workflows.",
    rating: 5,
    stats: [
      { value: "+250%", label: "Client Growth" },
      { value: "$0-$7K",  label: "Monthly Revenue" },
    ],
  },
  {
    name: "Sophia Lee",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    quote: "The course completely changed how I approach client projects and editing workflows.",
    rating: 5,
    stats: [
      { value: "+175%", label: "Client Growth" },
      { value: "$1K-$10K", label: "Monthly Revenue" },
    ],
  },
  {
    name: "Michael Smith",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    quote: "The course completely changed how I approach client projects and editing workflows.",
    rating: 5,
    stats: [
      { value: "+300%", label: "Client Growth" },
      { value: "$3K-$15K", label: "Monthly Revenue" },
    ],
  },
];

export default function CourseSuccessStories() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".success-header > *",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".success-card",
      { y: 45, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".success-grid", start: "top 85%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-24 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 relative z-10">

        {/* Header */}
        <div className="success-header flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-[#0080ff] shrink-0" />
            <span className="font-satoshi text-sm text-[#0080ff] font-semibold tracking-wide">
              Success Stories
            </span>
          </div>
          <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[48px] text-white leading-[1.1] tracking-wide max-w-[800px]">
            Real Student Results. Real Impact.
          </h2>
          <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[520px]">
            See how creators transformed their skills and landed real projects after the course.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="success-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((story, i) => (
            <div
              key={i}
              className="success-card group flex flex-col rounded-2xl border border-blue-500/15 bg-[#070914] overflow-hidden shadow-xl transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(0,80,200,0.12)]"
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0a0d1a]">
                <img
                  src={story.photo}
                  alt={story.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* dark gradient at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070914]/80 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-6">
                {/* Name */}
                <h3 className="font-heading font-normal text-sm md:text-base text-[#0080ff] uppercase tracking-widest text-center">
                  {story.name}
                </h3>

                {/* Quote */}
                <p className="font-satoshi text-xs md:text-sm text-slate-300 font-light leading-relaxed text-center relative">
                  <span className="text-[#0080ff] text-xl font-serif leading-none mr-1 relative top-1">"</span>
                  {story.quote}
                </p>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: story.rating }).map((_, s) => (
                    <svg key={s} viewBox="0 0 16 16" fill="#f59e0b" className="w-4 h-4">
                      <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
                    </svg>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {story.stats.map((stat, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2.5 bg-[#0a0d1a] border border-white/5 rounded-xl px-3 py-3"
                    >
                      {/* Trend Icon */}
                      <div className="w-7 h-7 rounded-lg bg-[#0080ff]/10 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-3.5 h-3.5 text-[#0080ff]" />
                      </div>
                      {/* Stat Info */}
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-semibold text-xs md:text-sm text-white leading-none">
                          {stat.value}
                        </span>
                        <span className="font-satoshi text-[9px] text-slate-500 font-light mt-0.5 leading-none">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

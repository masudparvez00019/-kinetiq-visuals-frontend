"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteConfig, ProcessStepItem } from "@/types/site-config";
import { siteConfigService } from "@/services/site-config.service";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_STEPS: ProcessStepItem[] = [
  {
    num: "01",
    title: "STRATEGY",
    desc: "Understanding your brand,\naudience & goals.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    num: "02",
    title: "Asset Collection",
    desc: "You send raw footage, brand assets, \nreferences, and guidelines through our \nstreamlined onboarding system.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    num: "03",
    title: "Edit & Refine",
    desc: "Our team crafts engaging edits, motion \ngraphics, captions, and pacing, followed \nby revision rounds for perfection.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    num: "04",
    title: "Deliver & Scale",
    desc: "We deliver your high-res visual assets \noptimized for maximum reach and \nconversion across all platforms.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    siteConfigService
      .get()
      .then(setConfig)
      .catch(() => {});
  }, []);

  const badgeText = config?.processBadgeText || "Our Process";
  const tLine1 = config?.processTitleLine1 || "THE";
  const tLine2 = config?.processTitleLine2 || "PROCESS";
  const tLine3 = config?.processTitleLine3 || "BEHIND";
  const tLine4 = config?.processTitleLine4 || "THE";
  const tLine5 = config?.processTitleLine5 || "RESULTS.";
  const subtitleText =
    config?.processSubtitle ||
    "A streamlined workflow designed to turn raw footage into scroll-stopping content that drives real growth.";
  const steps: ProcessStepItem[] =
    Array.isArray(config?.processSteps) && config.processSteps.length > 0
      ? config.processSteps
      : DEFAULT_STEPS;

  useGSAP(() => {
    // 1. Entrance Animations via ScrollTrigger
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    entranceTl.fromTo(
      ".process-header-group",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    entranceTl.fromTo(
      ".process-step-row",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // 2. Active Step Tracking on Scroll
    const rows = gsap.utils.toArray(".process-step-row");
    rows.forEach((row: any, i: number) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      });
    });

    // 3. Scroll-linked timeline progress line (blue line follows scroll)
    if (progressLineRef.current) {
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-step-row-container",
            start: "top 40%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }
  }, { scope: containerRef, dependencies: [steps] });

  return (
    <section
      id="process"
      ref={containerRef}
      className="w-full py-32 bg-[#020205] px-6 md:px-12 relative overflow-x-clip"
    >
      <div className="max-w-[1360px] mx-auto w-full flex flex-col gap-24 relative z-10">
        {/* Main 3-Column Desktop Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-start">
          {/* Column 1: Sticky Left Header Info */}
          <div className="lg:col-span-4 text-left relative self-stretch">
            <div className="lg:sticky lg:top-24 h-fit process-header-group flex flex-col gap-6">
              <div className="flex items-center gap-2 text-white font-heading font-normal tracking-wide text-xs md:text-sm">
                <span className="w-2.5 h-2.5 bg-blue-400 shrink-0" />
                <span>{badgeText}</span>
              </div>

              <h2 className="font-heading font-normal text-3xl md:text-5xl text-white leading-tight tracking-wide uppercase">
                {tLine1} <br />
                <span className="text-[#2C82F5]">{tLine2}</span> <br />
                {tLine3} <br />
                {tLine4} <br />
                {tLine5}
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm font-satoshi font-light mt-2">
                {subtitleText}
              </p>
            </div>
          </div>

          {/* Column 2 & 3 Combined: Timeline + Mockups */}
          <div className="lg:col-span-8 relative">
            {/* Continuous Vertical Timeline Line (centered between steps and mockups on desktop) */}
            <div className="absolute left-[calc(50%-0.5px)] top-8 bottom-8 w-[2px] bg-white/10 hidden md:block overflow-hidden">
              {/* Animated glowing laser blue progress line */}
              <div
                ref={progressLineRef}
                className="w-full bg-gradient-to-b from-[#032688] via-[#2C82F5] via-70% to-white origin-top h-full shadow-[0_0_12px_rgba(44,130,245,1),_0_0_24px_rgba(44,130,245,0.7)]"
                style={{ transform: "scaleY(0)" }}
              />
            </div>

            <div className="process-step-row-container flex flex-col gap-16 lg:gap-24">
              {steps.map((step, idx) => (
                <div
                  key={step.id || idx}
                  onClick={() => setActiveStep(idx)}
                  className="process-step-row grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start relative group cursor-pointer lg:pt-4"
                >
                  {/* Step Info Block (Center column on desktop) */}
                  <div className="flex flex-col text-left md:text-right md:pr-8 relative pt-2">
                    <span className="font-satoshi font-semibold text-xs tracking-wider text-blue-500 mb-1">
                      {step.num}
                    </span>
                    <h3
                      className={`font-heading font-normal text-lg md:text-[22px] tracking-wide transition-colors duration-500 ${
                        activeStep === idx ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`font-satoshi font-light text-sm md:text-base leading-relaxed mt-2 md:ml-auto max-w-md transition-colors duration-500 ${
                        activeStep === idx ? "text-slate-300" : "text-slate-600"
                      }`}
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {step.desc}
                    </p>

                    {/* Active Indicator sitting directly on the vertical line (desktop only) */}
                    <div className="absolute right-[-32px] translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center z-20 pointer-events-none">
                      <span
                        className={`text-[#2C82F5] text-xs transition-all duration-300 mr-2 drop-shadow-[0_0_8px_rgba(44,130,245,0.8)] ${
                          activeStep === idx
                            ? "opacity-100 scale-100 translate-x-0"
                            : "opacity-0 scale-75 -translate-x-1"
                        }`}
                      >
                        ◀
                      </span>
                      <div className="relative flex items-center justify-center">
                        {activeStep === idx ? (
                          <>
                            <div className="absolute w-6 h-6 bg-[#2C82F5]/40 rounded-full animate-ping" />
                            <div className="w-4 h-4 bg-[#2C82F5] rounded-full border border-white shadow-[0_0_14px_#2C82F5] flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            </div>
                          </>
                        ) : (
                          <div className="w-2.5 h-2.5 bg-slate-700/80 rounded-full border border-white/10" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mockup Graphic Block (Right column on desktop) */}
                  <div className="w-full relative flex justify-center md:pl-8">
                    <div
                      className={`w-full aspect-[16/10] rounded-2xl overflow-hidden border transition-all duration-700 ${
                        activeStep === idx
                          ? "border-blue-500/30 shadow-[0_0_40px_rgba(44,130,245,0.25)] scale-[1.03] opacity-100"
                          : "border-white/5 opacity-25 grayscale saturate-50 blur-[0.5px] group-hover:opacity-40"
                      }`}
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

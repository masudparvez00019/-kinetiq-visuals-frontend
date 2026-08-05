"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Play } from "lucide-react";
import { SiteConfig, ServiceItem } from "@/types/site-config";
import { siteConfigService } from "@/services/site-config.service";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    title: "Social Media Reels Editing",
    price: "$249 / project",
    desc: "Performance-driven video ads crafted to capture attention, communicate your message clearly, and maximize conversions across social and digital platforms.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&h=400&q=80",
    gridClass: "md:col-span-2",
  },
  {
    title: "Real Estate Video Editing",
    price: "$249 / project",
    desc: "Performance-driven video ads crafted to capture attention, communicate your message clearly, and maximize conversions across social and digital platforms.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=400&q=80",
    gridClass: "md:col-span-2",
  },
  {
    title: "YouTube Video Editing",
    price: "$249 / project",
    desc: "Performance-driven video ads crafted to capture attention, communicate your message clearly, and maximize conversions across social and digital platforms.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&h=400&q=80",
    gridClass: "md:col-span-2",
  },
  {
    title: "Ad Creative Editing",
    price: "$249 / project",
    desc: "Performance-driven video ads crafted to capture attention, communicate your message clearly, and maximize conversions across social and digital platforms.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80",
    gridClass: "md:col-span-3",
  },
  {
    title: "UGC & Brand Content Editing",
    price: "$249 / project",
    desc: "Performance-driven video ads crafted to capture attention, communicate your message clearly, and maximize conversions across social and digital platforms.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&h=400&q=80",
    gridClass: "md:col-span-3",
  },
];

const SERVICES_SPOTLIGHT_CSS = `
  .service-card-item {
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
  }
  .service-card-item::before {
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
  .service-card-item:hover::before {
    opacity: 1;
  }
  .service-cursor-glow-element {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      rgba(44, 130, 245, 0.08),
      transparent 80%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }
  .service-card-item:hover .service-cursor-glow-element {
    opacity: 1;
  }
`;

interface ServicesSectionProps {
  initialConfig?: SiteConfig | null;
}

export default function ServicesSection({ initialConfig }: ServicesSectionProps) {
  const [config, setConfig] = useState<SiteConfig | null>(initialConfig || null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialConfig) {
      siteConfigService.get().then(setConfig).catch(() => {});
    }
  }, [initialConfig]);

  const title = config?.servicesTitle || "Video Editing Services Built Around Your Goals";
  const ctaText = config?.servicesCtaText || "Book A Service Today";
  const ctaLink = config?.servicesCtaLink || "/contact";
  const dynamicServices = config?.servicesItems;
  const services = Array.isArray(dynamicServices) && dynamicServices.length > 0 ? dynamicServices : DEFAULT_SERVICES;

  useGSAP(() => {
    // Set static 3D perspective to avoid inline style calculation lag in mouse move
    gsap.set(".service-card-item", { transformPerspective: 1000 });

    // ScrollTrigger timeline for entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(
      ".services-header-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      ".services-header-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".service-card-item",
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      },
      "-=0.3"
    );
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Animate the 3D tilt properties directly with GSAP to bypass inline style conflicts
    const rotateX = (-(y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Update coordinates for spotlight hover glow
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    // Smooth reset to neutral position
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="w-full py-24 bg-[#020205] px-6 md:px-12 relative overflow-hidden"
    >
      {/* Inject Spotlight Styles */}
      <style>{SERVICES_SPOTLIGHT_CSS}</style>

      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto w-full flex flex-col gap-16 relative z-10">
        
        {/* Centered Section Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto select-none">
          <h2 className="services-header-title font-heading font-normal text-3xl md:text-[40px] text-white leading-tight tracking-wide whitespace-pre-line">
            {title}
          </h2>
          
          <div className="services-header-cta flex items-center gap-3 justify-center mt-2">
            <Link
              href={ctaLink}
              className="px-8 py-3.5 bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white rounded-full font-satoshi font-semibold text-sm tracking-wide hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] active:scale-95 transition-all duration-300 cursor-pointer inline-flex items-center justify-center"
            >
              {ctaText}
            </Link>
            
            <Link
              href={ctaLink}
              className="w-12 h-12 rounded-full bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white flex items-center justify-center hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] active:scale-95 transition-all duration-300 cursor-pointer shrink-0"
            >
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>

        {/* 6-Column Grid Layout */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-6 gap-6 w-full">
          {services.map((srv, idx) => (
            <div
              key={srv.id || idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`service-card-item group ${srv.gridClass || "md:col-span-2"} bg-[#000716] border border-blue-500/15 hover:border-blue-500/30 rounded-[24px] p-6 md:p-8 flex flex-col items-center justify-between gap-5 shadow-xl relative hover:shadow-[0_20px_50px_rgba(44,130,245,0.12)] transition-colors duration-500 overflow-hidden cursor-pointer`}
            >
              {/* Local Cursor Spotlight Glow */}
              <div className="service-cursor-glow-element" />

              {/* Inner glow border */}
              <div className="absolute inset-0 rounded-[24px] border border-white/5 pointer-events-none" />

              {/* Header: Title and Price */}
              <div className="flex flex-col items-center text-center w-full z-10">
                <h3 className="font-satoshi font-semibold text-lg md:text-[20px] text-[#89bdf2] leading-tight">
                  {srv.title}
                </h3>
                <span className="text-white/80 text-xs md:text-[14px] font-satoshi mt-2 font-light">
                  {srv.price}
                </span>
              </div>

              {/* Middle: Video Mockup Image */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5 z-10">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                {/* Play Icon in bottom left corner */}
                <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-none">
                  <Play size={12} fill="white" className="ml-0.5" />
                </div>
              </div>

              {/* Footer: Description */}
              <div className="w-full text-center z-10 mt-2">
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-satoshi group-hover:text-slate-300 transition-colors duration-300">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

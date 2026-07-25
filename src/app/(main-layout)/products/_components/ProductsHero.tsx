"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PRODUCTS_STYLE_CSS = `
  @keyframes float-sfx {
    0% { transform: translateY(0px) rotate(0.5deg); }
    50% { transform: translateY(-12px) rotate(-0.5deg); }
    100% { transform: translateY(0px) rotate(0.5deg); }
  }
  @keyframes float-fx {
    0% { transform: translateY(0px) scale(1) rotate(-0.5deg); }
    50% { transform: translateY(-8px) scale(1.02) rotate(0.5deg); }
    100% { transform: translateY(0px) scale(1) rotate(-0.5deg); }
  }
  @keyframes float-tablet {
    0% { transform: translateY(0px) rotate(-0.5deg); }
    50% { transform: translateY(-14px) rotate(0.5deg); }
    100% { transform: translateY(0px) rotate(-0.5deg); }
  }

  .animate-float-sfx {
    animation: float-sfx 6s infinite ease-in-out;
  }
  .animate-float-fx {
    animation: float-fx 5s infinite ease-in-out;
  }
  .animate-float-tablet {
    animation: float-tablet 7s infinite ease-in-out;
  }
`;

export default function ProductsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Sequence entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".products-title span",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power4.out" }
    );
    
    tl.fromTo(
      ".products-feature-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );
    
    tl.fromTo(
      ".products-visual-asset",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
      "-=0.8"
    );
  }, { scope: containerRef });

  // Interactive mouse move parallax for the asset stack
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!visualsRef.current) return;
    const rect = visualsRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Apply staggered 3D tilt
    gsap.to(".products-visual-asset", {
      x: x * 0.06,
      y: y * 0.06,
      rotateX: -y * 0.04,
      rotateY: x * 0.04,
      transformPerspective: 800,
      stagger: 0.02,
      ease: "power2.out",
      duration: 0.5,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".products-visual-asset", {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.8,
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 px-5 md:px-12 overflow-hidden bg-transparent"
    >
      <style>{PRODUCTS_STYLE_CSS}</style>

      {/* Products Background Image (Subtle Opacity) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          src="/image-232.png"
          alt="Background Visual"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 mt-6 lg:mt-20">
        <div className="w-full flex flex-col gap-10 lg:gap-16">
          
          {/* Main Hero Headline */}
          <h1 className="products-title font-heading font-normal text-[26px] xs:text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.2] lg:leading-[1.15] tracking-wide text-white select-none">
            <span className="lg:whitespace-nowrap block">Creative Assets & Digital</span>
            <span className="lg:whitespace-nowrap block">Products, Crafted for</span>
            <span className="lg:whitespace-nowrap block text-white">Impact</span>
          </h1>

          {/* Sub-Features 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16 max-w-[860px]">
            
            {/* Feature 1 */}
            <div className="products-feature-item flex flex-col gap-3.5">
              <h2 className="font-heading font-normal text-base md:text-lg text-white tracking-wide lg:whitespace-nowrap">
                Premium Creative Assets
              </h2>
              <p className="font-satoshi text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                Access high-quality motion graphics, transitions, sound effects, and visual elements that elevate every video.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="products-feature-item flex flex-col gap-3.5">
              <h2 className="font-heading font-normal text-base md:text-lg text-white tracking-wide lg:whitespace-nowrap">
                Platform-Optimized Content
              </h2>
              <p className="font-satoshi text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                Videos tailored for YouTube, TikTok, Instagram, Meta Ads, and other platforms. From a few videos per month to high-volume content workflows.
              </p>
            </div>

          </div>

          {/* Mobile-Only Visual Assets Row */}
          <div className="grid grid-cols-3 gap-6 items-center justify-items-center mt-10 lg:hidden select-none max-w-[480px] mx-auto w-full">
            <div className="flex justify-center">
              <img
                src="/sfx-folder.png"
                alt="SFX Folder Pack"
                className="animate-float-sfx w-full max-w-[90px] xs:max-w-[110px] drop-shadow-[0_10px_20px_rgba(6,182,212,0.15)]"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/fx-badge.png"
                alt="FX Badge"
                className="animate-float-fx w-full max-w-[80px] xs:max-w-[100px] drop-shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/waveform-tablet.png"
                alt="Waveform Tablet"
                className="animate-float-tablet w-full max-w-[100px] xs:max-w-[125px] drop-shadow-[0_15px_30px_rgba(37,99,235,0.2)]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Desktop Visual Assets Stack (Pushed to the absolute right edge of the window, outside container limits) */}
      <div
        ref={visualsRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute right-0 top-[22%] w-[42vw] max-w-[500px] h-[500px] pointer-events-none select-none z-20 hidden lg:block pr-8"
      >
        {/* SFX Folder */}
        <img
          src="/sfx-folder.png"
          alt="SFX Folder Pack"
          className="products-visual-asset animate-float-sfx absolute top-[5%] right-0 w-[200px] xl:w-[245px] z-20 drop-shadow-[0_15px_30px_rgba(6,182,212,0.2)]"
        />

        {/* FX Badge */}
        <img
          src="/fx-badge.png"
          alt="FX Badge"
          className="products-visual-asset animate-float-fx absolute bottom-[18%] right-[220px] xl:right-[275px] w-[190px] xl:w-[235px] z-30 drop-shadow-[0_15px_30px_rgba(59,130,246,0.25)]"
        />

        {/* Waveform Tablet */}
        <img
          src="/waveform-tablet.png"
          alt="Waveform Tablet"
          className="products-visual-asset animate-float-tablet absolute bottom-[5%] right-0 w-[210px] xl:w-[255px] z-10 drop-shadow-[0_20px_40px_rgba(37,99,235,0.25)]"
        />
      </div>
    </section>
  );
}

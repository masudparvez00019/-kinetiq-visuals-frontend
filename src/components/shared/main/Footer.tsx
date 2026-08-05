"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteConfig, FooterNavLinkItem } from "@/types/site-config";
import { siteConfigService } from "@/services/site-config.service";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_NAV_LINKS: FooterNavLinkItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Works", href: "/#works" },
  { label: "Process", href: "/#process" },
  { label: "Products", href: "/products" },
  { label: "Course", href: "/course" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    siteConfigService
      .get()
      .then(setConfig)
      .catch(() => {});
  }, []);

  const twitterUrl = config?.footerTwitterUrl || "https://twitter.com";
  const linkedinUrl = config?.footerLinkedinUrl || "https://linkedin.com";
  const instagramUrl = config?.footerInstagramUrl || "https://instagram.com";
  const titleLine1 = config?.footerTitleLine1 || "Let's Create";
  const titleLine2 = config?.footerTitleLine2 || "Something Worth";
  const titleLine3 = config?.footerTitleLine3 || "Watching";
  const brandText = config?.footerBrandText || "KQ VISUALS";
  const copyrightText =
    config?.footerCopyrightText ||
    `© KQ Visuals All Rights Reserved ${new Date().getFullYear()}`;
  const navLinks: FooterNavLinkItem[] =
    Array.isArray(config?.footerNavLinks) && config.footerNavLinks.length > 0
      ? config.footerNavLinks
      : DEFAULT_NAV_LINKS;

  useGSAP(() => {
    // Fade in text elements when they scroll into view
    gsap.fromTo(
      footerRef.current?.querySelectorAll(".fade-up-item") || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-20 pb-0 px-6 md:px-12 bg-[#000000] bg-gradient-to-b from-[#0a0e20]/60 via-[#020308] to-[#000000] border-t border-white/10 overflow-hidden"
    >
      {/* Top Glossy Specular Edge Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

      {/* Background Glossy Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end relative z-10 pb-8">
        {/* Left Side: Socials and Heading */}
        <div className="flex flex-col gap-6 fade-up-item text-left">
          {/* Social Links (Rounded Squares) */}
          <div className="flex gap-4 select-none">
            {twitterUrl && (
              <Link
                href={twitterUrl}
                target="_blank"
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-[#0a1020]/80 border border-white/5 hover:bg-[#12233F]/80 hover:border-blue-500/30 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <FaTwitter size={18} />
              </Link>
            )}
            {linkedinUrl && (
              <Link
                href={linkedinUrl}
                target="_blank"
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-[#0a1020]/80 border border-white/5 hover:bg-[#12233F]/80 hover:border-blue-500/30 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <FaLinkedin size={18} />
              </Link>
            )}
            {instagramUrl && (
              <Link
                href={instagramUrl}
                target="_blank"
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-[#0a1020]/80 border border-white/5 hover:bg-[#12233F]/80 hover:border-blue-500/30 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <FaInstagram size={18} />
              </Link>
            )}
          </div>

          {/* Heading */}
          <h2 className="font-heading font-normal text-3xl sm:text-4xl md:text-[48px] text-white leading-[1.15] md:leading-[56px] tracking-normal mt-2 select-none">
            {titleLine1} <br />
            {titleLine2} <br />
            {titleLine3}
          </h2>
        </div>

        {/* Right Side: Brand details & Copyright */}
        <div className="flex flex-col md:items-end justify-end h-full fade-up-item select-none text-left md:text-right">
          <div className="flex flex-col md:items-end gap-2">
            <span className="font-logo font-normal text-[36px] md:text-[52px] tracking-normal text-white uppercase leading-none">
              {brandText}
            </span>
            <p className="text-slate-400 text-sm md:text-base font-satoshi font-light mt-2">
              {copyrightText}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu (Renders directly inside footer layout with relative positioning) */}
      <div className="relative z-20 flex flex-wrap justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400 font-satoshi tracking-wide mt-20 mb-10 pb-8 select-none">
        {navLinks.map((link, idx) => (
          <Link
            key={link.id || idx}
            href={link.href}
            className="hover:text-white transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Animated Planet Horizon Image Asset */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-auto pointer-events-none z-10 overflow-hidden flex justify-center">
        {/* Soft Ambient Pulsing Backdrop Glow */}
        <div className="absolute bottom-0 w-3/4 h-24 bg-gradient-to-t from-sky-500/25 via-blue-600/10 to-transparent blur-2xl animate-horizon-pulse" />

        {/* Floating Glowing Particles Layer over Planet Horizon */}
        <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-15 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => {
            const leftPositions = [
              6, 14, 21, 28, 35, 42, 48, 54, 61, 68, 75, 82, 89, 94, 18, 30, 45, 59, 72, 85,
              24, 38, 64, 79,
            ];
            const bottomPositions = [
              12, 28, 16, 38, 22, 48, 14, 32, 52, 20, 42, 24, 18, 36, 12, 54, 62, 30, 46, 58,
              26, 40, 50, 22,
            ];
            const sizes = [
              2, 3, 2, 4, 2.5, 3, 2, 4, 3, 2.5, 3.5, 2, 3, 2, 4, 2.5, 3, 2, 3.5, 2, 3, 4, 2.5, 3,
            ];
            const durations = [
              4.2, 5.8, 6.5, 7.2, 4.8, 8.1, 5.3, 6.9, 7.5, 5.0, 6.2, 8.5, 4.5, 7.0, 5.5, 6.1,
              7.8, 5.2, 8.0, 6.4, 7.1, 4.9, 6.7, 5.6,
            ];
            const delays = [
              0, 1.2, 0.5, 2.1, 1.8, 0.2, 2.5, 1.0, 3.1, 0.8, 1.9, 2.7, 0.3, 1.5, 2.9, 0.6,
              2.3, 1.4, 0.9, 2.0, 1.1, 2.8, 0.4, 1.7,
            ];
            const opacities = [
              0.7, 0.9, 0.6, 0.85, 0.75, 0.9, 0.65, 0.8, 0.95, 0.7, 0.85, 0.6, 0.75, 0.9,
              0.65, 0.8, 0.7, 0.85, 0.9, 0.75, 0.8, 0.65, 0.9, 0.7,
            ];

            const left = leftPositions[i % leftPositions.length];
            const bottom = bottomPositions[i % bottomPositions.length];
            const size = sizes[i % sizes.length];
            const duration = durations[i % durations.length];
            const delay = delays[i % delays.length];
            const maxOpacity = opacities[i % opacities.length];

            return (
              <div
                key={i}
                className="absolute rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-float-particle"
                style={{
                  left: `${left}%`,
                  bottom: `${bottom}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  opacity: maxOpacity,
                }}
              />
            );
          })}
        </div>

        {/* Original Crisp Image Asset with Smooth Glow & Breathing Animation */}
        <img
          src="/planet-horizon.png"
          alt="Planet Horizon"
          className="relative w-[170%] sm:w-full max-w-none sm:max-w-7xl h-auto object-cover sm:object-contain pointer-events-none animate-horizon-float origin-bottom translate-y-1 sm:translate-y-0"
        />
      </div>

      <style jsx>{`
        @keyframes horizonFloat {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 -4px 18px rgba(56, 189, 248, 0.25)) brightness(1);
          }
          50% {
            transform: translateY(-4px) scale(1.008);
            filter: drop-shadow(0 -12px 35px rgba(56, 189, 248, 0.55)) brightness(1.1);
          }
        }
        @keyframes horizonPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scaleY(0.9);
          }
          50% {
            opacity: 0.85;
            transform: scaleY(1.1);
          }
        }
        @keyframes floatParticle {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-28px) translateX(12px);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-55px) translateX(-8px);
            opacity: 0.1;
          }
        }
        .animate-horizon-float {
          animation: horizonFloat 5s ease-in-out infinite;
        }
        .animate-horizon-pulse {
          animation: horizonPulse 4s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: floatParticle ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}

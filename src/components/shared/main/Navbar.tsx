"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMenu, FiX } from "react-icons/fi";

import { siteConfigService } from "@/services/site-config.service";
import type { SiteConfig } from "@/types/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin();
}

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    siteConfigService.get().then(setConfig).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/products")) {
        setActiveSection("products");
      } else if (pathname.startsWith("/course")) {
        setActiveSection("course");
      } else {
        setActiveSection("");
      }
      return;
    }

    // Reset activeSection when entering the homepage
    setActiveSection("");

    // Set up section intersection observer for home page scroll tracking
    const sections = ["hero", "services", "works", "process"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Triggers when the section center reaches viewport center
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  useGSAP(
    () => {
      // Smooth slide down and fade in for the navbar
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );
    },
    { scope: navRef }
  );

  const logoText = config?.brandLogoText;
  const logoUrl = config?.brandLogoUrl;

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-auto ${
        isScrolled ? "py-4 md:py-5 px-4 md:px-12" : "py-6 px-6 md:px-12"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 relative z-50 overflow-hidden ${
          isScrolled
            ? "max-w-7xl w-full px-6 md:px-8 py-3 rounded-2xl border border-white/15 bg-[#060913]/45 backdrop-blur-3xl shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
            : "max-w-7xl w-full px-0 py-0 rounded-none border border-transparent bg-transparent backdrop-blur-none shadow-none"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-20">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={logoText || "Brand Logo"}
              className={`object-contain transition-all duration-500 ${
                isScrolled ? "h-6 md:h-8" : "h-8 md:h-10"
              }`}
            />
          )}
          {logoText && (
            <span
              className={`font-logo font-normal tracking-normal leading-none text-white uppercase transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "text-xl md:text-2xl"
                  : "text-2xl md:text-[36px]"
              }`}
            >
              {logoText}
            </span>
          )}
        </Link>

        {/* Desktop Navigation & CTA */}
        <div className="flex items-center relative z-20">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/#services"
              className={`font-satoshi text-sm md:text-[15px] leading-tight tracking-normal px-4 py-2 transition-all duration-300 ${
                activeSection === "services"
                  ? "bg-white text-black font-bold rounded-xl shadow-lg hover:bg-slate-100"
                  : "font-medium text-slate-300 hover:text-white"
              }`}
            >
              Services
            </Link>
            <Link
              href="/#works"
              className={`font-satoshi text-sm md:text-[15px] leading-tight tracking-normal px-4 py-2 transition-all duration-300 ${
                activeSection === "works"
                  ? "bg-white text-black font-bold rounded-xl shadow-lg hover:bg-slate-100"
                  : "font-medium text-slate-300 hover:text-white"
              }`}
            >
              Works
            </Link>
            <Link
              href="/#process"
              className={`font-satoshi text-sm md:text-[15px] leading-tight tracking-normal px-4 py-2 transition-all duration-300 ${
                activeSection === "process"
                  ? "bg-white text-black font-bold rounded-xl shadow-lg hover:bg-slate-100"
                  : "font-medium text-slate-300 hover:text-white"
              }`}
            >
              Process
            </Link>
            <Link
              href="/products"
              className={`font-satoshi text-sm md:text-[15px] leading-tight tracking-normal px-4 py-2 transition-all duration-300 ${
                activeSection === "products"
                  ? "bg-white text-black font-bold rounded-xl shadow-lg hover:bg-slate-100"
                  : "font-medium text-slate-300 hover:text-white"
              }`}
            >
              Products
            </Link>
            <Link
              href="/course"
              className={`font-satoshi text-sm md:text-[15px] leading-tight tracking-normal px-4 py-2 transition-all duration-300 ${
                activeSection === "course"
                  ? "bg-white text-black font-bold rounded-xl shadow-lg hover:bg-slate-100"
                  : "font-medium text-slate-300 hover:text-white"
              }`}
            >
              Course
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden text-white hover:text-sky-400 transition-colors p-1.5 z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <div
        className={`fixed inset-x-0 top-0 bg-[#030612]/80 backdrop-blur-2xl border-b border-white/20 shadow-2xl z-40 transition-all duration-500 ease-in-out md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 px-8 pt-28 pb-10">
          <Link
            href="/#services"
            onClick={() => setIsOpen(false)}
            className={`font-satoshi font-bold text-xl px-4 py-2 rounded-full border transition-all duration-300 ${
              activeSection === "services"
                ? "border-white/35 text-white bg-white/15"
                : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            Services
          </Link>
          <Link
            href="/#works"
            onClick={() => setIsOpen(false)}
            className={`font-satoshi font-bold text-xl px-4 py-2 rounded-full border transition-all duration-300 ${
              activeSection === "works"
                ? "border-white/35 text-white bg-white/15"
                : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            Works
          </Link>
          <Link
            href="/#process"
            onClick={() => setIsOpen(false)}
            className={`font-satoshi font-bold text-xl px-4 py-2 rounded-full border transition-all duration-300 ${
              activeSection === "process"
                ? "border-white/35 text-white bg-white/15"
                : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            Process
          </Link>
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className={`font-satoshi font-bold text-xl px-4 py-2 rounded-full border transition-all duration-300 ${
              activeSection === "products"
                ? "border-white/35 text-white bg-white/15"
                : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            Products
          </Link>
          <Link
            href="/course"
            onClick={() => setIsOpen(false)}
            className={`font-satoshi font-bold text-xl px-4 py-2 rounded-full border transition-all duration-300 ${
              activeSection === "course"
                ? "border-white/35 text-white bg-white/15"
                : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            Course
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  useGSAP(() => {
    // Smooth slide down and fade in for the navbar
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    );
  }, { scope: navRef });

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-6 px-6 md:px-12" : "py-6 px-6 md:px-12"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 relative z-50 ${
          isScrolled
            ? "max-w-5xl px-8 py-3 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl shadow-lg shadow-black/20"
            : "max-w-7xl w-full px-4 py-0 rounded-none border border-transparent bg-transparent backdrop-blur-none"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className={`font-logo font-normal tracking-normal leading-none text-white uppercase transition-all duration-500 ease-in-out ${
              isScrolled
                ? "text-xl md:text-2xl"
                : "text-2xl md:text-[42px]"
            }`}
          >
            KQ VISUALS
          </span>
        </Link>

        {/* Navigation & CTA */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Services outlined button */}
          <Link
            href="#services"
            className="hidden md:block font-satoshi font-bold text-xs md:text-[18px] leading-[26px] tracking-normal px-4 py-1.5 md:px-6 md:py-2 rounded-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            Services
          </Link>
 
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#works"
              className="font-satoshi font-bold text-sm md:text-[18px] leading-[26px] tracking-normal text-sky-400 hover:text-sky-300 transition-colors"
            >
              Works
            </Link>
            <Link
              href="#process"
              className="font-satoshi font-bold text-sm md:text-[18px] leading-[26px] tracking-normal text-slate-300 hover:text-white transition-colors"
            >
              Process
            </Link>
            <Link
              href="#products"
              className="font-satoshi font-bold text-sm md:text-[18px] leading-[26px] tracking-normal text-slate-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="#course"
              className="font-satoshi font-bold text-sm md:text-[18px] leading-[26px] tracking-normal text-slate-300 hover:text-white transition-colors"
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
        className={`fixed inset-x-0 top-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 z-40 transition-all duration-500 ease-in-out md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 px-8 pt-28 pb-10">
          <Link
            href="#works"
            onClick={() => setIsOpen(false)}
            className="font-satoshi font-bold text-xl text-sky-400 hover:text-sky-300 transition-colors"
          >
            Works
          </Link>
          <Link
            href="#process"
            onClick={() => setIsOpen(false)}
            className="font-satoshi font-bold text-xl text-slate-300 hover:text-white transition-colors"
          >
            Process
          </Link>
          <Link
            href="#products"
            onClick={() => setIsOpen(false)}
            className="font-satoshi font-bold text-xl text-slate-300 hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            href="#course"
            onClick={() => setIsOpen(false)}
            className="font-satoshi font-bold text-xl text-slate-300 hover:text-white transition-colors"
          >
            Course
          </Link>
          <Link
            href="#services"
            onClick={() => setIsOpen(false)}
            className="mt-4 font-satoshi font-bold text-sm text-center py-3 rounded-md bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white hover:opacity-95 transition-all duration-300"
          >
            Services
          </Link>
        </div>
      </div>
    </header>
  );
}

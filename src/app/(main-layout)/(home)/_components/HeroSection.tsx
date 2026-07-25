"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useGSAP(() => {
    // Split text or animate words/chars
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-video-bg",
      { scale: 1.1, opacity: 0 },
      { scale: 1.0, opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Stagger animation for headings
    tl.fromTo(
      headlineRef.current?.querySelectorAll(".animate-line") || [],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power4.out" },
      "-=1.0"
    );

    // Fade-in CTAs
    tl.fromTo(
      ctaRef.current?.querySelectorAll(".animate-cta-item") || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    // Floating Testimonial card entry and float loop
    tl.fromTo(
      testimonialRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    // Continuous floating animation for testimonial card
    gsap.to(testimonialRef.current, {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  // Mouse move tilt effect on testimonial card
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!testimonialRef.current) return;
    const card = testimonialRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(card, {
      rotateY: x * 0.15,
      rotateX: -y * 0.15,
      transformPerspective: 600,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    if (!testimonialRef.current) return;
    gsap.to(testimonialRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power2.out",
      duration: 0.8,
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-20 px-6 md:px-12 overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
        className="hero-video-bg absolute inset-0 w-full h-full object-cover z-0 opacity-0 pointer-events-none"
      >
        <source src="/video/video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay with subtle glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/40 via-[#020205]/75 to-[#020205] z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] z-10 pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end relative z-20 mt-16 md:mt-28">
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <h1
            ref={headlineRef}
            className="font-heading font-normal text-4xl sm:text-[50px] md:text-[62px] leading-[1.2] sm:leading-[58px] md:leading-[70px] tracking-normal text-white"
          >
            <span className="block overflow-hidden py-1">
              <span className="block animate-line lg:whitespace-nowrap">Luxury Real Estate</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="block animate-line lg:whitespace-nowrap">
                Videos That Sell
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="block animate-line lg:whitespace-nowrap">Faster</span>
            </span>
          </h1>

          {/* CTA & Proof container */}
          <div ref={ctaRef} className="flex flex-col gap-6 items-start">
            <div className="animate-cta-item flex items-center gap-3">
              {/* Primary Call to Action */}
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white rounded-full font-satoshi font-semibold text-sm tracking-wide hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] active:scale-95 transition-all duration-300"
              >
                Book a Free Strategy Call
              </Link>
              {/* Arrow Circle Button */}
              <Link
                href="/contact"
                className="w-12 h-12 rounded-full bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white flex items-center justify-center hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] active:scale-95 transition-all duration-300"
              >
                <FiArrowUpRight size={20} />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="animate-cta-item flex items-center gap-4 mt-2">
              <div className="flex -space-x-3.5">
                {/* Overlapping Avatars */}
                <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden bg-slate-800 z-30">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Client 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden bg-slate-800 z-20">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Client 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden bg-slate-800 z-10">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Client 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="font-heading font-normal text-white text-xs md:text-sm tracking-wide">
                60+ Happy Clients
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Testimonial Card */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div
            ref={testimonialRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-[135px] w-full max-w-[340px] sm:max-w-md md:max-w-[430px] flex items-center gap-2 cursor-pointer relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Testimonial Author Image */}
            <div className="w-20 md:w-[110px] h-full shrink-0 rounded-[20px] border-2 border-white overflow-hidden bg-slate-900 shadow-lg">
              <img
                src="/jowel-avatar.png"
                alt="Jowel Mahmud"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote and Author Info */}
            <div className="flex-1 h-full p-4 md:p-5 rounded-[20px] border border-white/20 bg-[#172237]/90 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
              {/* Soft decorative background highlight inside the card */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <p className="font-heading font-normal text-[9px] md:text-[11px] leading-relaxed tracking-wider text-white uppercase">
                "FAST DELIVERY, CLEAR COMMUNICATION, AND EDITS THAT ACTUALLY PERFORM."
              </p>
              <div className="flex flex-col mt-0.5">
                <h4 className="font-heading font-normal text-xs md:text-sm text-[#2C82F5]">
                  Jowel Mahmud
                </h4>
                <p className="font-heading font-normal text-[7px] md:text-[9px] text-white/70 mt-1 leading-normal">
                  Mentor | Founder & CEO
                  <br />
                  KinetiQ Visuals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

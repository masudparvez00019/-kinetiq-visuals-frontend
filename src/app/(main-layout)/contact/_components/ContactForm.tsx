"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useAppStore } from "@/context/store";

export default function ContactForm() {
  const { addMessage, siteConfig } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".contact-left > *",
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".contact-right > *",
      { x: 30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#020205] py-20 px-5 md:px-12 relative z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start relative z-10">

        {/* LEFT: Contact Person Info */}
        <div className="contact-left flex flex-col gap-8">

          {/* Photo */}
          <div className="w-36 h-44 rounded-2xl overflow-hidden border border-white/5 bg-[#0a0d1a]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face,top"
              alt="Jowel Mahmud"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Name & Title */}
          <div className="flex flex-col gap-1.5">
            <span className="font-satoshi font-semibold text-base text-[#0080ff]">
              Jowel Mahmud
            </span>
            <span className="font-satoshi text-xs text-slate-400 font-light leading-relaxed">
              Mentor | Founder & CEO<br />KinetiQ Visuals
            </span>
          </div>

          {/* Description */}
          <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[360px]">
            Fill out the form or reach out by email or phone—we'd love to hear about your project.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-satoshi text-sm text-slate-300 hover:text-white transition-colors"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <a
                href={`tel:${siteConfig.contactPhone}`}
                className="font-satoshi text-sm text-slate-300 hover:text-white transition-colors"
              >
                {siteConfig.contactPhone}
              </a>
            </div>
          </div>

        </div>

        {/* RIGHT: Form */}
        <div className="contact-right flex flex-col gap-7">

          {/* Form Header */}
          <div className="flex flex-col gap-3">
            <h2 className="font-heading font-normal text-xl md:text-2xl lg:text-[30px] text-white leading-snug tracking-wide">
              Fill the Form to Get a Quick Answer
            </h2>
            <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed">
              Fill out the form and our team will get back to you shortly. You may also find instant answers in the FAQ section.
            </p>
            <Link
              href="#faq"
              className="font-satoshi text-sm text-[#0080ff] font-medium hover:underline underline-offset-4 transition-all w-fit"
            >
              Have general Questions? View FAQs
            </Link>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 bg-[#070914] border border-blue-500/20 rounded-2xl px-8 py-14 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0080ff" strokeWidth={2} className="w-6 h-6">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-heading font-normal text-xl text-white">Message Sent!</h3>
              <p className="font-satoshi text-sm text-slate-400 font-light">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Row 1: First + Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0d1a33]/80 border border-blue-900/30 rounded-xl px-5 py-4 font-satoshi text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0d1a33]/80 border border-blue-900/30 rounded-xl px-5 py-4 font-satoshi text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {/* Row 2: Email + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0d1a33]/80 border border-blue-900/30 rounded-xl px-5 py-4 font-satoshi text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#0d1a33]/80 border border-blue-900/30 rounded-xl px-5 py-4 font-satoshi text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {/* Row 3: Message */}
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-[#0d1a33]/80 border border-blue-900/30 rounded-xl px-5 py-4 font-satoshi text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
              />

              {/* Submit Row */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-sm px-10 py-3.5 rounded-full transition-colors shadow-[0_0_24px_rgba(0,128,255,0.35)] whitespace-nowrap"
                >
                  Send Message
                </button>
                <button
                  type="submit"
                  className="w-12 h-12 rounded-full bg-[#0080ff] hover:bg-[#0070e6] text-white flex items-center justify-center transition-colors shadow-[0_0_18px_rgba(0,128,255,0.25)]"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}

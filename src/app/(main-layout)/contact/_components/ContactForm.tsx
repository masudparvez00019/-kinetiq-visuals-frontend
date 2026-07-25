"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/context/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">

        {/* LEFT: Contact Person Info */}
        <div className="contact-left lg:col-span-5 flex flex-col justify-between h-full py-2">
          
          <div className="flex flex-col gap-6">
            {/* Photo */}
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-[#091524] shrink-0">
              <img
                src="/jowel-avatar.png"
                alt={siteConfig.mentorName || "Jowel Mahmud"}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Name & Role */}
            <div className="flex flex-col gap-1">
              <h3 className="font-satoshi font-bold text-base md:text-lg text-[#0080ff]">
                {siteConfig.mentorName || "Jowel Mahmud"}
              </h3>
              <p className="font-satoshi text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                Mentor | Founder & CEO<br />KinetiQ Visuals
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-12">
            {/* Description */}
            <p className="font-satoshi text-xs md:text-sm text-slate-300 font-light leading-relaxed max-w-[340px]">
              Fill out the form or reach out by email or phone—we'd love to hear about your project.
            </p>

            {/* Contact Info Lines */}
            <div className="flex flex-col gap-1.5 font-satoshi text-xs md:text-sm text-slate-300 font-light">
              <p>Email: <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white transition-colors">{siteConfig.contactEmail}</a></p>
              <p>Phone: <a href={`tel:${siteConfig.contactPhone}`} className="hover:text-white transition-colors">{siteConfig.contactPhone}</a></p>
            </div>
          </div>

        </div>

        {/* RIGHT: Form Section */}
        <div className="contact-right lg:col-span-7 flex flex-col gap-6">

          {/* Form Header */}
          <div className="flex flex-col gap-3">
            <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[34px] text-white leading-tight tracking-normal">
              Fill the Form to Get a Quick Answer
            </h2>
            <p className="font-satoshi text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-[540px]">
              Fill out the form and our team will get back to you shortly. You may also find instant answers in the FAQ section.
            </p>
            <Link
              href="#faq"
              className="font-heading font-normal text-xs md:text-sm text-[#0080ff] tracking-normal hover:underline underline-offset-4 transition-all w-fit mt-1"
            >
              Have general Questions? View FAQs
            </Link>
          </div>

          {/* Form Card Box */}
          <div className="w-full rounded-[28px] bg-[#06111f] border border-[#10243e] p-6 md:p-8 shadow-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#80c8ff] rounded-xl px-5 py-4 font-satoshi text-sm md:text-base text-slate-900 placeholder:text-[#456b8e] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all border-none shadow-sm"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#80c8ff] rounded-xl px-5 py-4 font-satoshi text-sm md:text-base text-slate-900 placeholder:text-[#456b8e] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all border-none shadow-sm"
                  />
                </div>

                {/* Row 2: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#80c8ff] rounded-xl px-5 py-4 font-satoshi text-sm md:text-base text-slate-900 placeholder:text-[#456b8e] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all border-none shadow-sm"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#80c8ff] rounded-xl px-5 py-4 font-satoshi text-sm md:text-base text-slate-900 placeholder:text-[#456b8e] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all border-none shadow-sm"
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
                  className="w-full bg-[#80c8ff] rounded-xl p-5 font-satoshi text-sm md:text-base text-slate-900 placeholder:text-[#456b8e] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all border-none shadow-sm resize-none"
                />

                {/* Submit Actions */}
                <div className="flex items-center justify-center gap-3.5 pt-2 w-full">
                  <button
                    type="submit"
                    className="bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:shadow-[0_0_25px_rgba(44,130,245,0.5)] active:scale-95 transition-all duration-300 text-white font-satoshi font-semibold text-sm md:text-base px-10 py-3.5 rounded-full cursor-pointer whitespace-nowrap"
                  >
                    Send Message
                  </button>
                  <button
                    type="submit"
                    className="w-12 h-12 rounded-full bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:shadow-[0_0_25px_rgba(44,130,245,0.5)] active:scale-95 transition-all duration-300 text-white flex items-center justify-center cursor-pointer shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

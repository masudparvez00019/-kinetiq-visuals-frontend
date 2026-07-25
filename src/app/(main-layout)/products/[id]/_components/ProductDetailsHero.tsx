"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useAppStore } from "@/context/store";

interface ProductDetailsHeroProps {
  id: string;
}

const DEFAULT_NEBULA_PRODUCT = {
  id: "nebula-cosmic-trailer-sfx",
  title: "Nebula Cosmic Trailer SFX",
  category: "SFX Pack",
  tag: "Sound Pack",
  price: "$32",
  originalPrice: "$42",
  rating: "4.9",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=80",
  description: "Epic cinematic trailer sound effects designed to add scale, tension, and impact to your videos. Featuring powerful hits, risers, whooshes, drones, and atmospheric textures inspired by the vastness of space."
};

export default function ProductDetailsHero({ id }: ProductDetailsHeroProps) {
  const { products: PRODUCTS } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Safely find product by id, fallback to default Nebula product if store is uninitialized
  const product = (PRODUCTS && PRODUCTS.length > 0 ? PRODUCTS.find((p) => p.id === id) : null) || (PRODUCTS && PRODUCTS[0]) || DEFAULT_NEBULA_PRODUCT;

  useGSAP(() => {
    // Sequence entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".details-back-btn",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(
      ".details-image-card",
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".details-info-block > *",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center pt-32 pb-16 lg:pt-36 lg:pb-24 px-5 md:px-12 overflow-hidden bg-transparent"
    >
      {/* Background Cover Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          src="/image-232.png"
          alt="Background Visual"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-6">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="details-back-btn flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit font-satoshi text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        {/* Two-Column Grid (5 cols image, 7 cols info for 681px Figma spec width) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          
          {/* Left Column: Cover Image & Preview Link */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            
            {/* Image Card Box (Full Bleed Image with Top/Bottom Special Lens SVG Lines) */}
            <div className="details-image-card w-full max-w-[440px] xl:max-w-[480px] aspect-square bg-[#070914] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative flex items-center justify-center group p-0">
              {/* Top Shiny Border Line (Special Tapered Lens SVG) */}
              <svg className="origin-center absolute top-0 left-[20px] right-[20px] w-[calc(100%-40px)] h-[3.5px] pointer-events-none z-20" viewBox="0 0 100 3.5" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="detail-glow-top-img" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                    <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#detail-glow-top-img)" />
              </svg>
              
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Bottom Shiny Border Line (Special Tapered Lens SVG) */}
              <svg className="origin-center absolute bottom-0 left-[20px] right-[20px] w-[calc(100%-40px)] h-[3.5px] pointer-events-none z-20" viewBox="0 0 100 3.5" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="detail-glow-bottom-img" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                    <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill="url(#detail-glow-bottom-img)" />
              </svg>
            </div>

            {/* Preview Label */}
            <button className="font-heading font-normal text-sm md:text-base uppercase tracking-widest text-white mt-6 hover:text-blue-400 transition-colors select-none">
              Preview the Pack
            </button>

          </div>

          {/* Right Column: Details Info Block */}
          <div className="lg:col-span-7 details-info-block flex flex-col w-full text-left">
            
            {/* Product Tag Badge (Matching Pill SVG Lens Image Style) */}
            <div className="relative inline-flex items-center justify-center px-6 py-2 rounded-full text-xs font-satoshi font-medium text-white bg-[#070D1B] overflow-hidden select-none w-fit mb-6">
              {/* Top Mini Tapered SVG Lens Border */}
              <svg className="absolute top-0 left-3 right-3 w-[calc(100%-24px)] h-[1.5px] pointer-events-none" viewBox="0 0 100 1.5" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="detail-tag-glow-top" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                    <stop offset="25%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="75%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,0.75 Q 50,0 100,0.75 Q 50,1.5 0,0.75 Z" fill="url(#detail-tag-glow-top)" />
              </svg>

              {product.tag}

              {/* Bottom Mini Tapered SVG Lens Border */}
              <svg className="absolute bottom-0 left-3 right-3 w-[calc(100%-24px)] h-[1.5px] pointer-events-none" viewBox="0 0 100 1.5" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="detail-tag-glow-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                    <stop offset="25%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="75%" stopColor="#504EEA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,0.75 Q 50,0 100,0.75 Q 50,1.5 0,0.75 Z" fill="url(#detail-tag-glow-bottom)" />
              </svg>
            </div>

            {/* Product Title (Figma Spec: PP Monument Extended 40px, leading 48px, weight 525) */}
            <h1 className="font-heading font-medium text-2xl sm:text-3xl md:text-[40px] text-white leading-[1.2] md:leading-[48px] tracking-normal mb-6 max-w-[681px]">
              {product.title === "Nebula Cosmic Trailer SFX" ? (
                <>
                  Nebula Cosmic Trailer <br className="hidden sm:inline" />
                  SFX
                </>
              ) : (
                product.title
              )}
            </h1>

            {/* Description (Figma Spec: Satoshi 18px, leading 26px, weight 500) */}
            <p className="font-satoshi font-medium text-sm sm:text-base md:text-[18px] text-[#d4dcfa] leading-normal md:leading-[26px] tracking-normal mb-8 max-w-[681px]">
              {product.description}
            </p>

            {/* Pricing Section (Figma Spec: PP Monument Extended 32px, leading 40px, weight 525) */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-heading font-medium text-2xl md:text-[32px] text-white leading-[40px] tracking-normal">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="font-heading font-medium text-xl md:text-2xl text-[#4d5a78] line-through leading-[40px] tracking-normal">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Actions Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              
              {/* Buy Now Button (Services Gradient Style) */}
              <button className="bg-gradient-to-b from-[#032688] to-[#2C82F5] text-white text-sm md:text-base font-satoshi font-bold px-10 py-3.5 rounded-full hover:shadow-[0_0_25px_rgba(44,130,245,0.5)] active:scale-95 transition-all duration-300 w-full sm:w-auto text-center cursor-pointer">
                Buy Now
              </button>

              {/* Star Rating Info */}
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b] shrink-0" />
                <span className="font-heading text-sm md:text-base text-white font-medium tracking-wide">
                  4.9 <span className="font-heading font-normal text-white">(50 Reviews)</span>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

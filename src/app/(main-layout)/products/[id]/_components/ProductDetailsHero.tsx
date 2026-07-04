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

export default function ProductDetailsHero({ id }: ProductDetailsHeroProps) {
  const { products: PRODUCTS } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find product by id, fallback to Nebula details
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[1] || PRODUCTS[0];

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

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Left Column: Cover Image & Preview Link */}
          <div className="flex flex-col items-center w-full">
            
            {/* Image Card Box */}
            <div className="details-image-card w-full max-w-[480px] aspect-square bg-[#070914]/80 border border-white/5 rounded-3xl overflow-hidden shadow-2xl p-8 relative flex items-center justify-center group">
              {/* Blur Glow behind Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 blur-[60px] pointer-events-none rounded-full" />
              
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Preview Label */}
            <button className="font-heading font-normal text-xs uppercase tracking-widest text-[#F2F5FA] opacity-80 mt-6 hover:opacity-100 hover:text-blue-400 transition-colors select-none">
              Preview the Pack
            </button>

          </div>

          {/* Right Column: Details Info Block */}
          <div className="details-info-block flex flex-col w-full">
            
            {/* Product Tag */}
            <div className="bg-[#0a0d18] border border-blue-500/20 text-[#0080ff] px-4.5 py-1.5 rounded-full text-[10px] md:text-xs font-semibold w-fit uppercase tracking-widest mb-6">
              {product.tag}
            </div>

            {/* Product Title */}
            <h1 className="font-heading font-normal text-2xl sm:text-3xl md:text-[44px] lg:text-[50px] text-white leading-[1.15] tracking-wide mb-6">
              {product.title}
            </h1>

            {/* Description */}
            <p className="font-satoshi text-xs md:text-sm text-slate-400 leading-relaxed font-light mb-8 max-w-[540px]">
              {product.description}
            </p>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3.5 mb-8">
              <span className="font-heading font-semibold text-2xl md:text-[32px] text-white">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="font-heading text-lg md:text-xl text-slate-500 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Actions Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              
              {/* Buy Now Button */}
              <button className="bg-[#0080ff] text-white text-xs md:text-sm font-heading font-normal px-9 py-4 rounded-full hover:bg-[#0070e6] transition-colors shadow-[0_0_20px_rgba(0,128,255,0.35)] w-full sm:w-auto text-center">
                Buy Now
              </button>

              {/* Star Rating Info */}
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500 shrink-0" />
                <span className="font-satoshi text-sm text-[#F2F5FA] opacity-90 font-semibold mt-0.5">
                  4.9 <span className="text-slate-400 font-light">(50 Reviews)</span>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

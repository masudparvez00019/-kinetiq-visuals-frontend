"use client";

import React from "react";

const SothebysLogo = () => (
  <div className="flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors duration-300">
    <span className="font-serif text-lg tracking-wider font-semibold leading-none">Sotheby's</span>
    <span className="text-[7px] tracking-[0.25em] font-sans font-bold uppercase mt-1">International Realty</span>
  </div>
);

const CompassLogo = () => (
  <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M16.2 7.8l-2 6.2-6.2 2 2-6.2 6.2-2z" />
    </svg>
    <span className="font-satoshi font-bold text-base tracking-[0.15em] uppercase">COMPASS</span>
  </div>
);

const ChristiesLogo = () => (
  <div className="flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors duration-300">
    <span className="font-serif text-xl tracking-[0.1em] font-light leading-none">CHRISTIE'S</span>
    <span className="text-[6px] tracking-[0.3em] font-sans font-medium uppercase mt-1">International Real Estate</span>
  </div>
);

const ColdwellLogo = () => (
  <div className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors duration-300">
    <div className="border border-current px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase font-satoshi shrink-0">
      CB
    </div>
    <div className="flex flex-col">
      <span className="font-satoshi font-black text-xs tracking-[0.1em] uppercase leading-none">Coldwell Banker</span>
      <span className="text-[6px] tracking-[0.15em] font-sans uppercase mt-0.5 text-white/40">Global Luxury</span>
    </div>
  </div>
);

const EngelVolkersLogo = () => (
  <div className="flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors duration-300">
    <span className="font-serif text-base tracking-[0.2em] uppercase leading-none font-medium">ENGEL & VÖLKERS</span>
  </div>
);

const KnightFrankLogo = () => (
  <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M12 2L3 7v6c0 5.5 4.5 10 9 11 4.5-1 9-5.5 9-11V7l-9-5z" />
    </svg>
    <span className="font-satoshi font-extrabold text-base tracking-wide leading-none">Knight Frank</span>
  </div>
);

const BRANDS = [
  { component: SothebysLogo },
  { component: CompassLogo },
  { component: ChristiesLogo },
  { component: ColdwellLogo },
  { component: EngelVolkersLogo },
  { component: KnightFrankLogo },
];

export default function TrustedBy() {
  return (
    <section className="w-full py-16 bg-[#020205] border-y border-white/5 relative overflow-hidden">
      {/* Side Fade Overlays */}
      <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-10">
        <h2 className="font-syne font-bold text-[20px] md:text-2xl text-white text-center tracking-normal leading-8 md:leading-[32px]">
          Recent clients & partners
        </h2>

        {/* Marquee Container */}
        <div className="w-full overflow-hidden relative flex marquee-container">
          {/* Loop twice to make it seamless with shrink-0 and w-max to prevent overlapping */}
          <div className="flex gap-16 md:gap-24 animate-marquee whitespace-nowrap items-center py-2 shrink-0 w-max pr-16 md:pr-24">
            {BRANDS.map((brand, i) => (
              <div
                key={`b1-${i}`}
                className="shrink-0 transition-opacity duration-300 opacity-80 hover:opacity-100"
              >
                <brand.component />
              </div>
            ))}
          </div>

          <div className="flex gap-16 md:gap-24 animate-marquee whitespace-nowrap items-center py-2 shrink-0 w-max pr-16 md:pr-24" aria-hidden="true">
            {BRANDS.map((brand, i) => (
              <div
                key={`b2-${i}`}
                className="shrink-0 transition-opacity duration-300 opacity-80 hover:opacity-100"
              >
                <brand.component />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Marquee animation style block */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

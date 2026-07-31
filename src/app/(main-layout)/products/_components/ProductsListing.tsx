"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useAppStore, Product } from "@/context/store";

const CATEGORIES = ["Trending", "Commercial (Car)", "Real-estate", "Free Assets"];

// Fallback dummy cards to guarantee a full 8-item grid like in the design mockup
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fb-1",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-counter.png",
    description: "Professionally designed counter plugin for After Effects.",
  },
  {
    id: "fb-2",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-nebula.png",
    description: "Cosmic trailer sound effects & motion elements.",
  },
  {
    id: "fb-3",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-playbook.png",
    description: "Video Editing Playbook course and presets.",
  },
  {
    id: "fb-4",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-nebula.png",
    description: "Cosmic trailer sound effects & motion elements.",
  },
  {
    id: "fb-5",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-counter.png",
    description: "Professionally designed counter plugin for After Effects.",
  },
  {
    id: "fb-6",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-nebula.png",
    description: "Cosmic trailer sound effects & motion elements.",
  },
  {
    id: "fb-7",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-playbook.png",
    description: "Video Editing Playbook course and presets.",
  },
  {
    id: "fb-8",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-nebula.png",
    description: "Cosmic trailer sound effects & motion elements.",
  },
];

const PRODUCT_CARD_SPOTLIGHT_CSS = `
  .product-card-item {
    position: relative;
    transform-style: preserve-3d;
  }
`;

export default function ProductsListing() {
  const { products: storeProducts } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Use store products if available, fallback if empty
  const allProducts = storeProducts && storeProducts.length > 0 ? storeProducts : FALLBACK_PRODUCTS;

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "Trending"
        ? true
        : product.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          product.tag.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ensure we display 8 cards on Trending to match exact image layout
  const displayProductsList =
    activeCategory === "Trending" && !searchQuery && filteredProducts.length < 8
      ? [...filteredProducts, ...FALLBACK_PRODUCTS].slice(0, 8)
      : filteredProducts;

  const totalPages = Math.ceil(displayProductsList.length / itemsPerPage) || 1;
  const currentProducts = displayProductsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);

    setTimeout(() => {
      gsap.fromTo(
        ".product-card-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }, 50);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  useGSAP(
    () => {
      gsap.set(".product-card-item", { transformPerspective: 1000 });

      gsap.fromTo(
        ".products-listing-header",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".product-card-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".product-grid-container",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (-(y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto"
    });
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <section
      ref={containerRef}
      className="products-listing-section w-full bg-[#020205] py-16 md:py-24 px-4 sm:px-6 md:px-12 relative z-10 border-t border-white/5"
    >
      <style>{PRODUCT_CARD_SPOTLIGHT_CSS}</style>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
        
        {/* Filters & Search Row */}
        <div className="products-listing-header flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center w-full">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#0080ff] text-white shadow-[0_0_20px_rgba(0,128,255,0.4)]"
                    : "bg-[#0a0d19] border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex items-center bg-[#0a0d19] border border-white/10 rounded-full py-1.5 pl-2 pr-4 w-full md:w-[380px] focus-within:border-[#0080ff]/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#0080ff] flex items-center justify-center text-white shrink-0 shadow-md">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search assets, templates, SFX....."
              className="w-full bg-transparent pl-3 pr-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-satoshi"
            />
            {searchQuery ? (
              <button
                onClick={clearSearch}
                className="text-slate-400 hover:text-white transition-colors ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <X
                className="w-4 h-4 text-slate-500/60 hover:text-white cursor-pointer transition-colors ml-1"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="product-grid-container w-full min-h-[400px]">
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7">
              {currentProducts.map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="product-card-item flex flex-col gap-3 group cursor-pointer"
                >
                  {/* Top Block: Image Container (Full Bleed - No Padding) */}
                  <div className="relative aspect-square bg-[#0b0d1e] border border-white/10 rounded-[24px] overflow-hidden flex items-center justify-center shadow-xl transition-all duration-300">
                    {/* Top Shiny Border Line (Tapered Lens shape) */}
                    <svg className="origin-center absolute top-0 left-[20px] right-[20px] w-[calc(100%-40px)] h-[3.5px] pointer-events-none z-20" viewBox="0 0 100 3.5" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`glow-top-img-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                          <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                          <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill={`url(#glow-top-img-${idx})`} />
                    </svg>

                    {/* Bottom Shiny Border Line (Tapered Lens shape) */}
                    <svg className="origin-center absolute bottom-0 left-[20px] right-[20px] w-[calc(100%-40px)] h-[3.5px] pointer-events-none z-20" viewBox="0 0 100 3.5" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`glow-bot-img-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                          <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                          <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill={`url(#glow-bot-img-${idx})`} />
                    </svg>

                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover Action Overlay Buttons (Figma UI Match: Pale Indigo gradient haze) */}
                    <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[#161c3b]/90 via-[#161c3b]/45 via-45% to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5 px-4 gap-3 z-10 pointer-events-auto">
                      <button className="bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(3,38,136,0.4)] flex items-center justify-center transition-all transform translate-y-3 group-hover:translate-y-0 duration-300">
                        Buy Now
                      </button>
                      <Link
                        href={`/products/${product.id}`}
                        className="w-11 h-11 rounded-full bg-gradient-to-b from-[#032688] to-[#2C82F5] hover:opacity-95 hover:shadow-[0_0_20px_rgba(44,130,245,0.4)] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(3,38,136,0.4)] transition-all transform translate-y-3 group-hover:translate-y-0 duration-300 delay-75 shrink-0"
                      >
                        <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Block: Info Box Container */}
                  <div className="relative p-5 sm:p-6 bg-[#070815] border border-white/10 rounded-[24px] flex flex-col gap-2 shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Top Shiny Border Line (Tapered Lens shape) */}
                    <svg className="origin-center absolute top-0 left-[20px] right-[20px] w-[calc(100%-40px)] h-[3.5px] pointer-events-none z-20" viewBox="0 0 100 3.5" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`glow-top-info-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                          <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                          <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill={`url(#glow-top-info-${idx})`} />
                    </svg>

                    {/* Bottom Shiny Border Line (Tapered Lens shape) */}
                    <svg className="origin-center absolute bottom-0 left-[20px] right-[20px] w-[calc(100%-40px)] h-[3.5px] pointer-events-none z-20" viewBox="0 0 100 3.5" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`glow-bot-info-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#504EEA" stopOpacity="0" />
                          <stop offset="15%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                          <stop offset="85%" stopColor="#504EEA" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#504EEA" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,1.75 Q 50,0 100,1.75 Q 50,3.5 0,1.75 Z" fill={`url(#glow-bot-info-${idx})`} />
                    </svg>

                    <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-wider leading-none">
                      {product.price}
                    </span>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-satoshi font-medium text-base sm:text-lg text-[#7c86ff] group-hover:text-blue-400 transition-colors truncate tracking-wide">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="font-satoshi text-xs sm:text-sm text-[#d0d4e4] font-normal flex items-center gap-1.5">
                      <span>{product.tag || "After Effect Plugin"}</span>
                      <span className="text-slate-500">•</span>
                      <span>{product.downloads || "150+ DLs"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center w-full">
              <span className="text-slate-500 font-satoshi text-sm mb-2">No assets found</span>
              <span className="text-slate-600 font-satoshi text-xs">
                Try searching for another keyword or check another filter.
              </span>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-12 md:mt-16">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(44,130,245,0.2)]"
            style={{
              border: "1.5px solid transparent",
              background: "linear-gradient(#070914, #070914) padding-box, linear-gradient(135deg, #032688, #2c82f5) border-box"
            }}
          >
            <ChevronLeft className="w-5 h-5 text-white stroke-[2]" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`font-heading font-medium text-base leading-[24px] tracking-normal px-2.5 py-1 transition-colors ${
                  currentPage === page
                    ? "text-[#0080ff]"
                    : "text-[#8e94a7] hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <span className="text-[#5b6175] font-heading font-medium text-base tracking-widest px-1 select-none">
              .......
            </span>

            <button
              onClick={() => setCurrentPage(4)}
              className={`font-heading font-medium text-base leading-[24px] tracking-normal px-2.5 py-1 transition-colors ${
                currentPage === 4
                  ? "text-[#0080ff]"
                  : "text-[#8e94a7] hover:text-white"
              }`}
            >
              4
            </button>
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(44,130,245,0.2)]"
            style={{
              border: "1.5px solid transparent",
              background: "linear-gradient(#070914, #070914) padding-box, linear-gradient(135deg, #032688, #2c82f5) border-box"
            }}
          >
            <ChevronRight className="w-5 h-5 text-white stroke-[2]" />
          </button>
        </div>

      </div>
    </section>
  );
}

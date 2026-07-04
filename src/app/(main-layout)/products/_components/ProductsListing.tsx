"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useAppStore } from "@/context/store";

interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  tag: string;
  downloads: string;
  image: string;
}

const CATEGORIES = ["Trending", "Commercial (Car)", "Real-estate", "Free Assets", "New Releases", "DaVinci Plugins", "LUTs Pack"];

export default function ProductsListing() {
  const { products: PRODUCTS } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = product.category === activeCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    
    // Animate grid items entering on tab switch
    setTimeout(() => {
      gsap.fromTo(
        ".product-card-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
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

  useGSAP(() => {
    // ScrollTrigger grid entrance
    gsap.fromTo(
      ".products-listing-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".product-card-item",
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".product-grid-container",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="products-listing-section w-full bg-[#020205] py-20 px-5 md:px-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
        
        {/* Filters & Search Row */}
        <div className="products-listing-header flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center w-full">
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-xs md:text-sm font-heading font-normal px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#0080ff] text-white shadow-[0_0_15px_rgba(0,128,255,0.3)]"
                    : "bg-[#0a0d18] border border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search assets, templates, SFX....."
              className="w-full bg-[#0a0d18] border border-white/5 rounded-full pl-11 pr-10 py-2.5 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/35 focus:ring-0 transition-all font-satoshi"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="product-grid-container w-full min-h-[400px]">
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card-item flex flex-col bg-[#070914] border border-white/5 rounded-3xl overflow-hidden group shadow-lg transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-[#0a0d18] flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10 pointer-events-auto">
                      <button className="bg-[#0080ff] text-white text-xs font-heading font-normal px-5 py-2.5 rounded-full flex items-center justify-center hover:bg-[#0070e6] transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Buy Now
                      </button>
                      <Link href={`/products/${product.id}`} className="w-9 h-9 rounded-full bg-[#0080ff] text-white flex items-center justify-center hover:bg-[#0070e6] transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-5 md:p-6 flex flex-col gap-2.5">
                    <span className="font-heading font-semibold text-lg md:text-xl text-white">
                      {product.price}
                    </span>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-satoshi font-semibold text-sm md:text-base text-white tracking-wide group-hover:text-blue-400 transition-colors truncate">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="font-satoshi text-xs text-slate-400 font-light flex items-center gap-1.5">
                      <span>{product.tag}</span>
                      <span className="text-slate-600">•</span>
                      <span>{product.downloads}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center w-full">
              <span className="text-slate-500 font-satoshi text-sm mb-2">No assets found</span>
              <span className="text-slate-600 font-satoshi text-xs">Try searching for another keyword or check another filter.</span>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Dynamic Pages Range */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`font-heading font-semibold text-sm px-2.5 py-1 rounded transition-colors ${
                      currentPage === pageNum
                        ? "text-[#0080ff]"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

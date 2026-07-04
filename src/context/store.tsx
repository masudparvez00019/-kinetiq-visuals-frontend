"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice: string;
  category: string;
  tag: string;
  downloads: string;
  image: string;
  description: string;
}

export interface CourseChapter {
  num: string;
  title: string;
  sub: string;
  duration: string;
}

export interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteConfig {
  homeHeroTitle1: string;
  homeHeroTitle2: string;
  homeHeroTitle3: string;
  homeHeroSubtitle: string;
  coursePrice: string;
  courseDescription: string;
  mentorName: string;
  mentorTitle: string;
  mentorBio: string;
  mentorExp: string;
  mentorProj: string;
  mentorStud: string;
  contactEmail: string;
  contactPhone: string;
}

interface AppContextProps {
  products: Product[];
  chapters: CourseChapter[];
  messages: Message[];
  siteConfig: SiteConfig;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addChapter: (chapter: CourseChapter) => void;
  updateChapter: (num: string, updatedFields: Partial<CourseChapter>) => void;
  deleteChapter: (num: string) => void;
  addMessage: (message: Omit<Message, "id" | "date" | "read">) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  updateSiteConfig: (updatedFields: Partial<SiteConfig>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "t1",
    title: "Counter Pro 2",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "After Effect Plugin",
    downloads: "150+ DLs",
    image: "/product-counter.png",
    description: "Professionally designed counter plugin for After Effects. Build smooth transitions, visual timers, data charts, and dynamic scoreboards inside your edits easily.",
  },
  {
    id: "t2",
    title: "Nebula Cosmic Trailer SFX",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "Sound Effects Pack",
    downloads: "150+ DLs",
    image: "/product-nebula.png",
    description: "Deep, celestial sound design elements built for cinematic real estate trailers, high-impact titles, and epic product reviews.",
  },
  {
    id: "t3",
    title: "Video Editing Playbook",
    price: "$32",
    originalPrice: "$42",
    category: "Trending",
    tag: "Beginner to Pro Course",
    downloads: "150+ DLs",
    image: "/product-playbook.png",
    description: "A comprehensive playbook on modern video editing workflows. Contains cheat sheets, keyboard layouts, presets, and asset management guides.",
  },
  {
    id: "t4",
    title: "Vaporwave Transition pack",
    price: "$29",
    originalPrice: "$39",
    category: "New Releases",
    tag: "Premiere Transitions Pack",
    downloads: "80+ DLs",
    image: "/product-nebula.png",
    description: "Retro-futuristic transition overlays featuring aesthetic VHS noise, pixelated splits, and neon glitch effects for premier creators.",
  },
];

const DEFAULT_CHAPTERS: CourseChapter[] = [
  { num: "01", title: "Introduction & Setup",      sub: "3 Lessons • 24 Min",   duration: "24 Min" },
  { num: "02", title: "Editing Workflow",           sub: "6 Lessons • 1h 10m",  duration: "1h 10m" },
  { num: "03", title: "Cinematic Transitions",      sub: "7 Lessons • 1h 08m",  duration: "1h 08m" },
  { num: "04", title: "Color Grading Mastery",      sub: "8 Lessons • 1h 18m",  duration: "1h 18m" },
  { num: "05", title: "Sound Design",               sub: "5 Lessons • 36 Min",  duration: "36 Min" },
  { num: "06", title: "Real Estate Projects",       sub: "6 Lessons • 59 Min",  duration: "59 Min" },
  { num: "07", title: "Automotive Projects",        sub: "6 Lessons • 61 Min",  duration: "61 Min" },
  { num: "08", title: "Client Delivery & Export",   sub: "4 Lessons • 28 Min",  duration: "28 Min" },
];

const DEFAULT_MESSAGES: Message[] = [
  {
    id: "msg-1",
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 555-0199",
    message: "Hey Jowel, I love the real estate editing styles! Do you offer customized agency discounts for team packages?",
    date: "July 03, 2026",
    read: false,
  },
  {
    id: "msg-2",
    firstName: "Arif",
    lastName: "Hossain",
    email: "arif.h@example.com",
    phone: "+880 1711-223344",
    message: "Is there going to be a DaVinci Resolve specific template pack in your new releases? I work exclusively in Resolve.",
    date: "July 02, 2026",
    read: true,
  },
];

const DEFAULT_CONFIG: SiteConfig = {
  homeHeroTitle1: "Creative Assets & Digital",
  homeHeroTitle2: "Products, Crafted for",
  homeHeroTitle3: "Impact",
  homeHeroSubtitle: "Step up your post-production workflow with premium assets built for filmmakers and professional real estate editors.",
  coursePrice: "$149",
  courseDescription: "A complete step-by-step system to edit stunning real estate, automotive & commercial videos that get clients and sell.",
  mentorName: "Jowel Mahmud",
  mentorTitle: "Founder Of 'KinetiQ Visuals'",
  mentorBio: "I've helped 100+ businesses and creators elevate their brand with cinematic videos that drive results. Now I'm teaching the exact system I use.",
  mentorExp: "6+",
  mentorProj: "100+",
  mentorStud: "1200+",
  contactEmail: "hello@kinetiqvisuals.com",
  contactPhone: "+880 1XXX-XXXXXX",
};

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("kq_products");
      const storedChapters = localStorage.getItem("kq_chapters");
      const storedMessages = localStorage.getItem("kq_messages");
      const storedConfig = localStorage.getItem("kq_config");

      setProducts(storedProducts ? JSON.parse(storedProducts) : DEFAULT_PRODUCTS);
      setChapters(storedChapters ? JSON.parse(storedChapters) : DEFAULT_CHAPTERS);
      setMessages(storedMessages ? JSON.parse(storedMessages) : DEFAULT_MESSAGES);
      setSiteConfig(storedConfig ? JSON.parse(storedConfig) : DEFAULT_CONFIG);
      setLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes (after first mount load)
  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("kq_products", JSON.stringify(products));
    }
  }, [products, loaded]);

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("kq_chapters", JSON.stringify(chapters));
    }
  }, [chapters, loaded]);

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("kq_messages", JSON.stringify(messages));
    }
  }, [messages, loaded]);

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("kq_config", JSON.stringify(siteConfig));
    }
  }, [siteConfig, loaded]);

  const updateSiteConfig = (updatedFields: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updatedFields }));
  };

  const addProduct = (p: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...p,
      id: `p-${Date.now()}`,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addChapter = (c: CourseChapter) => {
    setChapters((prev) => [...prev, c]);
  };

  const updateChapter = (num: string, updatedFields: Partial<CourseChapter>) => {
    setChapters((prev) =>
      prev.map((c) => (c.num === num ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteChapter = (num: string) => {
    setChapters((prev) => prev.filter((c) => c.num !== num));
  };

  const addMessage = (m: Omit<Message, "id" | "date" | "read">) => {
    const newMsg: Message = {
      ...m,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      read: false,
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        chapters,
        messages,
        siteConfig,
        addProduct,
        updateProduct,
        deleteProduct,
        addChapter,
        updateChapter,
        deleteChapter,
        addMessage,
        markMessageRead,
        deleteMessage,
        updateSiteConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppStore must be used within an AppStoreProvider");
  }
  return context;
}

"use client";

import React from "react";

const AMBIENT_GRADIENT_CSS = `
  /* Keyframe Animations for Fluid Morphing and Movement */
  @keyframes float-blob-1 {
    0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
    33% { transform: translate(80px, -100px) scale(1.2) rotate(120deg); }
    66% { transform: translate(-60px, 70px) scale(0.9) rotate(240deg); }
    100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
  }
  @keyframes float-blob-2 {
    0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
    50% { transform: translate(-100px, 90px) scale(1.15) rotate(-180deg); }
    100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
  }
  @keyframes float-blob-3 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(-50px, -60px) scale(0.95); }
    66% { transform: translate(60px, 50px) scale(1.1); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  .animated-blob-1 {
    animation: float-blob-1 25s infinite ease-in-out;
  }
  .animated-blob-2 {
    animation: float-blob-2 30s infinite ease-in-out;
  }
  .animated-blob-3 {
    animation: float-blob-3 20s infinite ease-in-out;
  }

  /* Force all page sections to have a transparent background to show the gradients behind them */
  section, footer, main {
    background-color: transparent !important;
  }
`;

export default function BackgroundVisuals() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      <style>{AMBIENT_GRADIENT_CSS}</style>

      {/* --- Rich Theme Gradient Blobs (Brighter, Normal Blending to avoid browser GPU bugs) --- */}

      {/* Blob 1: Vibrant Royal Blue */}
      <div className="animated-blob-1 absolute top-[-5%] left-[-5%] w-[650px] h-[650px] rounded-full bg-blue-600/20 blur-[130px]" />

      {/* Blob 2: Bright Electric Blue */}
      <div className="animated-blob-2 absolute top-[30%] right-[-10%] w-[750px] h-[750px] rounded-full bg-blue-500/20 blur-[140px]" />

      {/* Blob 3: Rich Indigo */}
      <div className="animated-blob-3 absolute bottom-[15%] left-[5%] w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* Blob 4: Soft Glowing Cyan */}
      <div className="animated-blob-1 absolute top-[50%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-400/15 blur-[100px]" />

      {/* Blob 5: Ambient Purple Lens */}
      <div className="animated-blob-2 absolute bottom-[-5%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-[130px]" />

      {/* Dark overlay to ensure absolute readability of text */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/40 via-transparent to-[#020205]/40" />
    </div>
  );
}

import { ReactNode } from "react";
import BackgroundVisuals from "@/components/shared/main/BackgroundVisuals";
import Link from "next/link";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-[#020205] text-white">
      {/* Animated gradient blobs backdrop */}
      <BackgroundVisuals />

      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Minimal top bar with brand */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12">
          <Link
            href="/"
            className="font-logo text-2xl tracking-wide text-white/90 transition hover:text-white"
            style={{ fontFamily: "'Sekuya', sans-serif" }}
          >
            KinetiQ
          </Link>
          <Link
            href="/"
            className="text-sm text-white/60 transition hover:text-white"
          >
            ← Back to Home
          </Link>
        </header>

        {/* Center the auth card */}
        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          {children}
        </main>

        {/* Footer note */}
        <footer className="px-6 pb-6 text-center text-xs text-white/40 md:px-12">
          &copy; {new Date().getFullYear()} KinetiQ Visuals. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;

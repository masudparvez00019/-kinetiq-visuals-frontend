import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/lenis-provider";

const syne = Syne({
  variable: "--font-syne-google",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KinetiQ Visuals - Luxury Real Estate Video Editing",
  description: "Luxury Real Estate Videos That Sell Faster. Expert video editing services built around your goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${plusJakartaSans.variable} font-sans antialiased bg-[#020205] text-foreground overflow-x-hidden`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}


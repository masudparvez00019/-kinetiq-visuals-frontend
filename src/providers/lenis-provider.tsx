"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import "lenis/dist/lenis.css";

interface LenisProviderProps {
  children: ReactNode;
}

function LenisScrollHandler() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Suppress dev-server overlay for transient network timeouts or aborted signals
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const isTimeout =
        reason?.name === "TimeoutError" ||
        reason?.code === "ETIMEDOUT" ||
        (typeof reason?.message === "string" &&
          (reason.message.includes("timed out") ||
            reason.message.includes("signal timed out") ||
            reason.message.includes("aborted")));

      if (isTimeout) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  // Reset scroll to top or scroll to target element on route change
  useEffect(() => {
    if (!lenis) return;

    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector<HTMLElement>(hash);
      if (element) {
        setTimeout(() => {
          lenis.scrollTo(element, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }, 50);
        return;
      }
    }

    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");

        // Check if the link contains a hash pointing to an element
        if (href) {
          const hashIndex = href.indexOf("#");
          if (hashIndex !== -1) {
            const hash = href.substring(hashIndex); // e.g. "#services"
            const element = document.querySelector<HTMLElement>(hash);

            if (element) {
              e.preventDefault();
              lenis.scrollTo(element, {
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
              });
              // Update URL address bar hash without triggering default jump
              window.history.pushState(null, "", hash);
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [lenis]);

  return null;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, syncTouch: true }}>
      <LenisScrollHandler />
      {children}
    </ReactLenis>
  );
}


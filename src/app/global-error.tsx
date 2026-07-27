"use client";

import { useEffect } from "react";

/**
 * Top-level error boundary. Next.js renders this **outside of the root
 * layout's `<html>` tree** when the root layout itself throws, so this file
 * MUST NOT import anything that depends on the root layout's providers
 * (Zustand store, Lenis provider, `next/font` setup, `globals.css`, etc.).
 *
 * Without a custom `global-error.tsx`, Next.js auto-generates a default
 * boundary at `/_global-error` and statically prerenders it as part of the
 * build. That prerender fails when any client component on the import graph
 * calls `useContext` against a provider the boundary tree doesn't have — a
 * common failure mode with Turbopack on Next 16. Providing this file
 * short-circuits Next's auto-generation and replaces it with a tree that has
 * no client dependencies.
 *
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Best-effort logging — the global error boundary has no other context
    // to surface diagnostic info to. Server-side logs already include the
    // error digest, so we keep this purely for client console visibility.
    // eslint-disable-next-line no-console
    console.error("KinetiQ global-error boundary hit");
  }, []);

  return (
    // NOTE: we render our own `<html>` and `<body>` here because this
    // boundary replaces the root layout entirely when triggered.
    <html lang="en">
      <body
        style={{
          background: "#020205",
          color: "#fff",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", margin: "0 0 0.75rem" }}>
            Something went wrong
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 1.5rem",
              fontSize: "0.9rem",
            }}
          >
            The site hit an unexpected error. You can try again, or come
            back in a moment.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#0080ff",
              color: "#fff",
              border: 0,
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
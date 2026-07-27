import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `standalone` produces a `.next/standalone` directory that contains only
   * the `node_modules` Next needs to run in production, so the Docker runner
   * image can copy just that subtree (instead of shipping the full ~600 MB
   * dev `node_modules`).
   */
  output: "standalone",

  /**
   * Pin Turbopack's project root to this directory. Without this, Next 16 +
   * Turbopack walks up the filesystem looking for the nearest lockfile and
   * warns "we inferred your workspace root" — and worse, the standalone
   * emit path becomes `.next/standalone/<absolute path>/...` instead of
   * `.next/standalone/<projectRoot>/...`, which makes the Dockerfile paths
   * brittle. The root MUST be absolute (Turbopack complains otherwise);
   * `process.cwd()` is reliable because `next build` is always invoked from
   * the project root in both local dev and CI.
   */
  turbopack: {
    root: path.resolve(process.cwd(), "."),
  },
};

export default nextConfig;
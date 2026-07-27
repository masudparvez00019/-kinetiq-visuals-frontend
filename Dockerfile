# ── Stage 1: dependencies ─────────────────────────────────────────────────────
# Installs full deps (incl. devDeps) for the build stage.
FROM node:24-alpine AS deps
WORKDIR /app

# `python3 make g++` are required by some Next.js optional deps that build
# native modules on install (e.g. `sharp`, `bcrypt`-shaped adapters).
RUN apk add --no-cache python3 make g++ openssl
COPY package*.json ./
RUN npm ci

# ── Stage 2: build ────────────────────────────────────────────────────────────
# Produces `.next/standalone` (used in the runner) plus the static asset
# folders that the standalone server expects at `.next/static` and `public/`.
FROM node:24-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl

ENV NEXT_TELEMETRY_DISABLED=1
# Bake the public API base URL at build time so the browser bundle has it.
# `NEXT_PUBLIC_*` values are inlined by Next during the build, so they must
# be present as ARGs / env during `next build`, not at runtime.
ARG NEXT_PUBLIC_API_BASE_URL=https://kinetiq-api.saikat.com.bd/api/v1
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Stage 3: runtime ──────────────────────────────────────────────────────────
# Lean image: only what's needed to serve the prebuilt Next.js app.
FROM node:24-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl tini && \
    mkdir -p /app && \
    chown -R node:node /app

# Re-declare the same build-arg so the runtime env is in sync. The actual
# value used by the JS bundle is the one baked into the builder stage; this
# ENV is only for any server-side code path that reads `process.env` at
# request time.
ARG NEXT_PUBLIC_API_BASE_URL=https://kinetiq-api.saikat.com.bd/api/v1
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy the standalone server entrypoint (owns its pruned node_modules).
COPY --from=builder --chown=node:node /app/.next/standalone ./
# Static assets and public/ are NOT included in standalone — Next expects
# them alongside the server. Mount them at the same paths.
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
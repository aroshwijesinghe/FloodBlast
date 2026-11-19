# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace manifests first (better layer caching)
COPY package*.json ./
COPY packages/shared-types/package*.json ./packages/shared-types/
COPY apps/server/package*.json ./apps/server/

# Install all dependencies (including devDeps for build)
RUN npm ci --workspace=apps/server --workspace=packages/shared-types

# Copy source
COPY packages/shared-types ./packages/shared-types
COPY apps/server ./apps/server

# Build shared types then server
RUN npm run build --workspace=packages/shared-types || true
RUN npm run build --workspace=apps/server

# ── Stage 2: Production Runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Only copy production artifacts
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Non-root user for security
RUN addgroup -S floodblast && adduser -S floodblast -G floodblast
USER floodblast

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/main"]

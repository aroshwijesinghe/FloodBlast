# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
# Output: /app/dist

# ── Stage 2: Nginx Static Server ─────────────────────────────────────────────
FROM nginx:1.25-alpine AS runner

# Copy Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx config (SPA fallback + gzip + security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]

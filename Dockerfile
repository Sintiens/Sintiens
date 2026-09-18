# Dockerfile - Sintiens Web & AI Server
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runner stage — Oracle / Render ready (non-root + healthcheck)
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
# PORT por defecto; Oracle/Render lo sobreescribe con $PORT
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server
# public ya va dentro de dist vía Vite; no duplicar

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-3000}/api/ping || exit 1

CMD ["node", "dist-server/server.cjs"]

FROM node:20-slim

# Les moteurs Prisma ont besoin d'OpenSSL, absent de l'image slim
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# postinstall lance `prisma generate` : le schéma doit être présent avant npm ci
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Les pages sont dynamiques : aucune base n'est nécessaire au build
RUN npm run build

EXPOSE 3000

CMD ["sh", "/app/docker-entrypoint.sh"]

# ========== Development dependencies ==========
FROM node:22-alpine AS development-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# ========== Production dependencies ==========
FROM node:22-alpine AS production-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ========== Build ==========
FROM node:22-alpine AS build-env
WORKDIR /app
COPY --from=development-dependencies-env /app ./
RUN npm run build

# ========== Final image ==========
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build

CMD ["npm", "run", "start"]

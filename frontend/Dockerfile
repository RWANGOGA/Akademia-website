# =============================================================
# STAGE 1: Builder (Installs dependencies and builds the app)
# =============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies needed for building)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production
RUN npm run build

# =============================================================
# STAGE 2: Runner (A clean, lightweight image for production)
# =============================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables for production
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js will run on
EXPOSE 3000

# Start the optimized production server
CMD ["npm", "start"]
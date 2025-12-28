# Use Node.js as the base image
FROM node:20-bookworm-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-bookworm-slim

WORKDIR /app

# Install sqlite3 for persistence
RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

# Create data directory for persistence
RUN mkdir -p /app/data && chown -R node:node /app/data

# Copy only the necessary files for production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# Expose the application port
EXPOSE 80

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80
ENV DATABASE_URL="file:/app/data/sqlite.db"

# Set user to node for security
USER node

# Command to run the application
CMD ["npm", "start"]

# ---- Build Stage ----
FROM node:alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install \
    && npm install ts-node --save-dev \
    && npm install -g ts-node \
    && npm cache clean --force

# Copy Prisma schema
COPY prisma/schema.prisma ./prisma/schema.prisma

# Generate Prisma client
RUN npx prisma generate

# Copy other source code files
COPY . .

# Run TypeScript compiler
RUN npx tsc

# ---- Run Stage ----
FROM node:alpine

WORKDIR /usr/src/app

# Copy compiled JavaScript files
COPY --from=builder /usr/src/app/build/src ./dist

# Copy generated Prisma client
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma

# Copy package files and install production dependencies
COPY package*.json ./

RUN npm install --only=production

# Copy environment files
COPY .env ./

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD [ "node", "dist/index.js" ]
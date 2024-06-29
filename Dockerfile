# Use a smaller base image
FROM --platform=linux/amd64 node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately to leverage Docker layer caching
COPY --chown=node:node package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY --chown=node:node . .

# Build production bundle
RUN npm run build

# Start a new stage for production image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY --chown=node:node package.json package-lock.json ./

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Switch to a non-root user
USER node

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build backend
echo "📦 Building backend..."
cd backend
npm install
npm run build
cd ..

# Copy frontend build to web root
echo "📋 Copying frontend files..."
sudo cp -r frontend/dist/* /var/www/sol-showcase/frontend/dist/

# Copy backend files
echo "📋 Copying backend files..."
sudo mkdir -p /var/www/sol-showcase/backend
sudo cp -r backend/dist /var/www/sol-showcase/backend/
sudo cp backend/package.json /var/www/sol-showcase/backend/
sudo cp backend/.env.production /var/www/sol-showcase/backend/.env

# Install backend production dependencies
echo "📦 Installing backend production dependencies..."
cd /var/www/sol-showcase/backend
npm install --production

# Restart PM2 processes
echo "🔄 Restarting PM2 processes..."
pm2 reload ecosystem.config.js --env production

# Restart Nginx
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment completed successfully!" 
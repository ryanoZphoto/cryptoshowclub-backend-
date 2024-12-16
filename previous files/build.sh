#!/bin/bash

# Clean up previous builds
rm -rf dist
mkdir -p dist

# Build backend
echo "Building backend..."
cd backend
npm install
npm run build
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Copy frontend build to dist
cp -r frontend/dist/* dist/

# Create .htaccess for React routing
echo "Creating .htaccess..."
cat > dist/.htaccess << EOL
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
EOL

echo "Build complete! Files are ready in the 'dist' directory" 
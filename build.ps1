# Clean up previous builds
if (Test-Path dist) {
    Remove-Item -Recurse -Force dist
}
New-Item -ItemType Directory -Force dist

# Build backend
Write-Host "Building backend..."
Set-Location backend
npm install
npm run build
Set-Location ..

# Build frontend
Write-Host "Building frontend..."
Set-Location frontend
npm install
npm run build
Set-Location ..

# Copy frontend build to dist
Copy-Item -Recurse frontend/dist/* dist/

# Create .htaccess for React routing
Write-Host "Creating .htaccess..."
@"
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteRule . /index.html [L]
</IfModule>
"@ | Out-File -FilePath "dist/.htaccess" -Encoding UTF8

Write-Host "Build complete! Files are ready in the 'dist' directory" 
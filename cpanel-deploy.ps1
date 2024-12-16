# Configuration
$CPANEL_HOST = "cryptoshowclub.com"
$CPANEL_USERNAME = "a61u1xuuzn4"
$PUBLIC_HTML = "/home/$CPANEL_USERNAME/public_html"

Write-Host "🚀 Starting deployment process..."

# Build the application
Write-Host "📦 Building application..."
.\build.ps1

# Create necessary directories in cPanel (using SSH)
Write-Host "📁 Creating directories..."
@"
mkdir -p $PUBLIC_HTML/api
mkdir -p $PUBLIC_HTML/frontend
"@ | Out-File -FilePath "setup-dirs.sh" -Encoding UTF8

# Upload files using FTP
Write-Host "📤 Uploading files..."
Write-Host @"
Please upload the following files using FTP:
1. Upload all files from 'dist/' to '$PUBLIC_HTML/'
2. Upload 'backend/dist/' to '$PUBLIC_HTML/api/'
3. Upload '.env' to '$PUBLIC_HTML/api/'
4. Upload 'package.json' to '$PUBLIC_HTML/api/'
"@

# Create Node.js app configuration
Write-Host "⚙️ Node.js Application Setup in cPanel:"
Write-Host @"
1. Go to cPanel -> Setup Node.js App
2. Create a new application:
   - Node.js version: 18.x
   - Application mode: Production
   - Application root: $PUBLIC_HTML/api
   - Application URL: https://$CPANEL_HOST/api
   - Application startup file: dist/index.js
   - Environment variables (copy from .env):
     PORT=3000
     DB_USER=$CPANEL_USERNAME
     DB_NAME=i10181616_vpux1
     NODE_ENV=production
"@

Write-Host "✅ Deployment instructions generated!" 
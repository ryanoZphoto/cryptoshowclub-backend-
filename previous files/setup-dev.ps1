# PowerShell setup script for Windows

Write-Host "Setting up development environment..." -ForegroundColor Blue

# Install global dependencies
Write-Host "Installing global dependencies..." -ForegroundColor Green
npm install -g pm2 typescript ts-node nodemon @types/node

# Setup frontend
Write-Host "Setting up frontend..." -ForegroundColor Green
Set-Location frontend
npm install
if (Test-Path .env.example) {
    Copy-Item .env.example .env -Force
} else {
    @"
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=CryptoShow
VITE_APP_DESCRIPTION=Exclusive Token Showcase Platform
"@ | Out-File -FilePath ".env" -Encoding UTF8
}

# Add start script to package.json if it doesn't exist
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if (-not $packageJson.scripts.start) {
    $packageJson.scripts | Add-Member -Name "start" -Value "vite" -MemberType NoteProperty
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
}

Set-Location ..

# Setup backend
Write-Host "Setting up backend..." -ForegroundColor Green
Set-Location backend
npm install

# Install all required TypeScript definitions
npm install --save-dev @types/express @types/node @types/cors @types/supertest @types/nodemailer @types/cookiejar @types/methods supertest

if (Test-Path .env.example) {
    Copy-Item .env.example .env -Force
} else {
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cryptoshow
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3000
SENDGRID_API_KEY=your_sendgrid_api_key_here
"@ | Out-File -FilePath ".env" -Encoding UTF8
}

Set-Location ..

# Create development database directory
Write-Host "Setting up development database..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path data/db

# Create development start script
Write-Host "Creating development scripts..." -ForegroundColor Green
@"
# PowerShell script to start development servers
Write-Host "Starting development servers..." -ForegroundColor Blue

# Start MongoDB (if installed locally)
if (Get-Command mongod -ErrorAction SilentlyContinue) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "mongod --dbpath ./data/db"
}

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location frontend; npm run dev"

# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location backend; npm run dev"
"@ | Out-File -FilePath "dev-start.ps1" -Encoding UTF8

Write-Host "Development environment setup complete!" -ForegroundColor Blue
Write-Host @"
To complete setup:
1. Add your SendGrid API key to backend/.env
2. Run .\dev-start.ps1 to start development servers
"@ -ForegroundColor Blue
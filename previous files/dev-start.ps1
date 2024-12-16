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

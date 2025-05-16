# Script to build and deploy the application to GitHub Pages

# Build the application
Write-Host "Building the application..."
npm run build

# Check if the build was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please check the errors above."
    exit 1
}

Write-Host "Build successful!"

# Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..."
npm run deploy

# Check if deployment was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed. Please check the errors above."
    exit 1
}

Write-Host "Deployment successful! Your application is now live at https://abuursaminor.github.io/jobbar-mia/"

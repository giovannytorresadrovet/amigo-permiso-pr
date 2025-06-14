
#!/bin/bash

# Cloudflare Pages Deployment Script for PermitPR

set -e

echo "🚀 Starting Cloudflare Pages deployment for PermitPR..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Please install it first:"
    echo "npm install -g wrangler"
    exit 1
fi

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please log in to Cloudflare first:"
    echo "wrangler login"
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to Cloudflare Pages
echo "🌐 Deploying to Cloudflare Pages..."

if [ "$1" = "production" ]; then
    echo "🎯 Deploying to PRODUCTION environment..."
    wrangler pages deploy dist --project-name permitpr --env production
elif [ "$1" = "staging" ]; then
    echo "🧪 Deploying to STAGING environment..."
    wrangler pages deploy dist --project-name permitpr --env staging
else
    echo "🔍 Deploying to PREVIEW environment..."
    wrangler pages deploy dist --project-name permitpr
fi

echo "✅ Deployment completed successfully!"
echo "🔗 Your app should be available at:"

if [ "$1" = "production" ]; then
    echo "   https://permitpr.com"
elif [ "$1" = "staging" ]; then
    echo "   https://staging.permitpr.com"
else
    echo "   Check the deployment URL in the output above"
fi

echo ""
echo "📊 To monitor your deployment:"
echo "   wrangler pages deployment list --project-name permitpr"
echo ""
echo "🔧 To view logs:"
echo "   wrangler pages deployment tail --project-name permitpr"

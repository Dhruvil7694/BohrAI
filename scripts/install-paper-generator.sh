#!/bin/bash

# Installation script for Paper Generator

echo "🚀 Installing Paper Generator Dependencies..."

# Navigate to project root
cd "$(dirname "$0")/.."

# Install project dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p exports
mkdir -p .paper-gen-state
mkdir -p logs

# Copy environment file if it doesn't exist (repo root is cwd)
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please configure your .env file with API keys"
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Configure .env file with your API keys"
echo "2. Run 'npm run dev' to start the Bohr CLI, or use the bohr / paper-generator entry points in the repo docs"

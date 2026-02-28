#!/bin/bash

# Database Setup Script
# This script sets up the Neon PostgreSQL database for the blog feature

set -e

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  echo "Please set it before running this script:"
  echo "export DATABASE_URL='postgresql://...'"
  exit 1
fi

echo "Setting up database schema..."

# Run Drizzle migrations
npx drizzle-kit push

echo "Database setup complete!"
echo ""
echo "You can now start the development server:"
echo "pnpm run dev"

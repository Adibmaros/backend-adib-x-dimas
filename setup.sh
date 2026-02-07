#!/usr/bin/env bash

# Quick setup script untuk testing backend dengan seeder
# Run: chmod +x setup.sh && ./setup.sh

echo "🚀 Setting up Backend Dimas for testing..."

echo "📦 Installing dependencies..."
npm install

echo "🗃️ Installing seeder dependency..."
npm install --save-dev tsx

echo "🔥 Generating Prisma Client..."
npm run db:generate

echo "📊 Pushing database schema..."
npm run db:push

echo "🌱 Seeding database with dummy data..."
npm run db:seed

echo "✅ Setup completed!"
echo ""
echo "🎉 Ready to test!"
echo "📚 API Documentation: http://localhost:3000/docs"
echo "🗃️ Database Studio: npm run db:studio"
echo "🔥 Start dev server: npm run dev"
echo ""
echo "🧪 Quick API tests:"
echo "curl 'http://localhost:3000/api/users'"
echo "curl 'http://localhost:3000/api/posts?published=true'"
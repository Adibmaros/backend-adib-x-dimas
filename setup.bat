@echo off
echo 🚀 Setting up Backend Dimas for testing...

echo 📦 Installing dependencies...
call npm install

echo 🗃️ Installing seeder dependency...
call npm install --save-dev tsx

echo 🔥 Generating Prisma Client...
call npm run db:generate

echo 📊 Pushing database schema...
call npm run db:push

echo 🌱 Seeding database with dummy data...
call npm run db:seed

echo ✅ Setup completed!
echo.
echo 🎉 Ready to test!
echo 📚 API Documentation: http://localhost:3000/docs
echo 🗃️ Database Studio: npm run db:studio
echo 🔥 Start dev server: npm run dev
echo.
echo 🧪 Quick API tests:
echo curl "http://localhost:3000/api/users"
echo curl "http://localhost:3000/api/posts?published=true"

pause
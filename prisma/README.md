# Database Seeder

Database seeder untuk mengisi database dengan data dummy yang berguna untuk development dan testing.

## 📋 Data yang Di-seed

### Users (5 users)

- **John Doe** (johndoe) - Active user dengan avatar
- **Jane Smith** (janesmith) - Active user dengan avatar
- **Dimas Pratama** (dimas123) - Active user dengan avatar
- **Sarah Wilson** (sarahw) - Active user dengan avatar
- **Mike Johnson** (mikej) - Inactive user (untuk testing)

### Posts (8 posts)

- **6 Published posts** dengan berbagai topik (Next.js, Prisma, TypeScript, etc.)
- **2 Draft posts** (untuk testing draft functionality)
- Setiap post memiliki:
  - Title dan content lengkap
  - Slug yang SEO-friendly
  - Tags yang relevan
  - Thumbnail dari Unsplash
  - Relasi ke author
  - View count yang realistis

## 🚀 Cara Menggunakan

### 1. Persiapan

Pastikan dependencies sudah terinstall:

```bash
npm install
npm install --save-dev tsx
```

### 2. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push
```

### 3. Run Seeder

```bash
# Method 1: Menggunakan script npm
npm run db:seed

# Method 2: Menggunakan prisma db seed
npx prisma db seed

# Method 3: Manual execution
npx tsx prisma/seed.ts
```

### 4. Verifikasi

Setelah seeder berhasil, Anda dapat:

- Buka Prisma Studio: `npm run db:studio`
- Test API endpoints:
  - `GET /api/users` - Lihat semua users
  - `GET /api/posts` - Lihat semua posts
  - `GET /api/posts?published=true` - Lihat published posts

## 📊 Output Seeder

Seeder akan menampilkan progress dan summary:

```
🌱 Starting database seeding...
🗑️ Cleaning existing data...
👥 Creating users...
✅ Created 5 users
📝 Creating posts...
✅ Created 8 posts
📊 Updating view counts...
✅ Updated view counts

🎉 Database seeding completed successfully!
📊 Summary:
   - Users created: 5
   - Posts created: 8
   - Published posts: 6
   - Draft posts: 2
   - Active users: 4
```

## ⚠️ Important Notes

### Data Cleaning

Seeder akan **menghapus semua data existing** sebelum mengisi data baru. Jika Anda tidak ingin ini terjadi, comment out bagian ini di `prisma/seed.ts`:

```typescript
// Comment these lines to keep existing data
// await prisma.post.deleteMany()
// await prisma.user.deleteMany()
```

### Production Usage

**JANGAN jalankan seeder di production database!** Seeder ini dirancang untuk development dan testing.

### Password Security

Data seeder menggunakan plaintext password untuk simplicity. Untuk production, gunakan bcrypt:

```bash
npm install bcrypt @types/bcrypt
```

```typescript
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash("password123", 10);
```

## 🔄 Reset Database

Untuk reset complete database dan re-seed:

```bash
# Reset migrations dan database
npm run db:reset

# Re-run seeder
npm run db:seed
```

## 🧪 Testing API dengan Data Seeder

Setelah seeder berjalan, Anda bisa test API:

```bash
# Get all users
curl "http://localhost:3000/api/users"

# Get specific user with posts
curl "http://localhost:3000/api/users/1"

# Get published posts only
curl "http://localhost:3000/api/posts?published=true"

# Get posts by author
curl "http://localhost:3000/api/posts?authorId=1"

# Get post with view count increment
curl "http://localhost:3000/api/posts/1"
```

## 🛠️ Customization

Anda dapat memodifikasi `prisma/seed.ts` untuk:

- Menambah/mengurangi jumlah data
- Mengubah content data
- Menambah field custom
- Mengubah relasi antar data

Selamat menggunakan seeder! 🎉

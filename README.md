# Backend Dimas API

Backend API yang dibangun dengan Next.js, Prisma ORM, dan Supabase sebagai database. API ini menyediakan operasi CRUD lengkap untuk manajemen User dan Post dengan dokumentasi Swagger yang komprehensif.

## 🚀 Technology Stack

- **Framework**: Next.js 16.1.6 dengan App Router
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Validation**: Zod
- **Documentation**: Swagger (OpenAPI 3.0)
- **TypeScript**: Full type safety

## 📋 Features

### User Management

- ✅ Create, Read, Update, Delete users
- ✅ User authentication ready (password hashing recommended)
- ✅ Profile management dengan avatar upload
- ✅ User activity tracking

### Post Management

- ✅ Create, Read, Update, Delete posts
- ✅ Content management dengan slug dan tags
- ✅ Post publishing workflow
- ✅ View count tracking
- ✅ Author relationship

### API Features

- ✅ RESTful API design
- ✅ Input validation dengan Zod
- ✅ Error handling yang konsisten
- ✅ Pagination untuk list endpoints
- ✅ Query filtering
- ✅ Complete API documentation dengan Swagger

## 🛠️ Installation & Setup

### 1. Clone dan Install Dependencies

```bash
cd backend-dimas
npm install
```

### 2. Environment Setup

Salin file `.env` dan update dengan kredensial database Anda:

```env
# Supabase Configuration
SUPABASE_URL=https://mhrlydsyuwnxwxcxtdmk.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# Database Configuration
DATABASE_URL="postgresql://postgres:[password]@db.mhrlydsyuwnxwxcxtdmk.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@db.mhrlydsyuwnxwxcxtdmk.supabase.co:5432/postgres"

# Application Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

**⚠️ Important**: Ganti `[password]` dengan password database Supabase Anda

### 3. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# Atau gunakan migrations (untuk production)
npm run db:migrate
```

### 4. Database Seeding (Optional)

Isi database dengan data dummy untuk development:

```bash
# Install tsx untuk TypeScript execution
npm install --save-dev tsx

# Run seeder
npm run db:seed

# Atau gunakan Prisma seed
npx prisma db seed
```

**Data yang akan dibuat:**

- 5 Users (4 active, 1 inactive) dengan avatar
- 8 Posts (6 published, 2 drafts) dengan content lengkap
- Tags, thumbnails, dan view counts yang realistis

⚠️ **Warning**: Seeder akan menghapus semua data existing. Lihat [prisma/README.md](prisma/README.md) untuk detail.

### 5. Run Development Server

```bash
npm run dev
```

API akan berjalan di: `http://localhost:3000`

## 📚 Database Schema

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  username  String   @unique
  password  String
  avatar    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}
```

### Post Model

```prisma
model Post {
  id          Int      @id @default(autoincrement())
  title       String
  content     String?
  slug        String   @unique
  published   Boolean  @default(false)
  tags        String[]
  thumbnail   String?
  viewCount   Int      @default(0)
  authorId    Int
  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔗 API Endpoints

### Users API

| Method | Endpoint          | Description                     |
| ------ | ----------------- | ------------------------------- |
| GET    | `/api/users`      | Get all users (with pagination) |
| POST   | `/api/users`      | Create new user                 |
| GET    | `/api/users/{id}` | Get user by ID (with posts)     |
| PUT    | `/api/users/{id}` | Update user by ID               |
| DELETE | `/api/users/{id}` | Delete user by ID               |

### Posts API

| Method | Endpoint          | Description                               |
| ------ | ----------------- | ----------------------------------------- |
| GET    | `/api/posts`      | Get all posts (with filters & pagination) |
| POST   | `/api/posts`      | Create new post                           |
| GET    | `/api/posts/{id}` | Get post by ID (with author info)         |
| PUT    | `/api/posts/{id}` | Update post by ID                         |
| DELETE | `/api/posts/{id}` | Delete post by ID                         |

### Query Parameters

#### Users List (`/api/users`)

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### Posts List (`/api/posts`)

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `published`: Filter by published status (true/false)
- `authorId`: Filter by author ID

## 📖 API Documentation

Kunjungi dokumentasi Swagger lengkap di:

```
http://localhost:3000/docs
```

Atau akses raw OpenAPI spec:

```
http://localhost:3000/api/docs
```

## 🧪 Example API Usage

### Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "name": "John Doe",
    "username": "johndoe",
    "password": "password123"
  }'
```

### Create Post

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is my first post content",
    "slug": "my-first-post",
    "published": false,
    "tags": ["tech", "programming"],
    "authorId": 1
  }'
```

### Get Posts with Filters

```bash
# Get published posts only
curl "http://localhost:3000/api/posts?published=true&page=1&limit=5"

# Get posts by specific author
curl "http://localhost:3000/api/posts?authorId=1"
```

## 🗃️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:pull      # Pull schema from database
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database
npm run db:studio    # Open Prisma Studio
npm run db:deploy    # Deploy migrations (production)
npm run db:seed      # Seed database with dummy data
```

## 📁 Project Structure

```
backend-dimas/
├── app/
│   ├── api/
│   │   ├── users/
│   │   │   ├── route.ts           # Users CRUD
│   │   │   └── [id]/route.ts      # User by ID operations
│   │   ├── posts/
│   │   │   ├── route.ts           # Posts CRUD
│   │   │   └── [id]/route.ts      # Post by ID operations
│   │   └── docs/route.ts          # OpenAPI spec endpoint
│   ├── docs/page.tsx              # Swagger UI page
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── prisma.ts                  # Prisma client configuration
│   ├── supabase.ts                # Supabase client configuration
│   ├── validations.ts             # Zod validation schemas
│   └── swagger.ts                 # Swagger configuration
├── prisma/
│   └── schema.prisma              # Database schema
├── .env                           # Environment variables
└── package.json
```

## 🔐 Security Considerations

### Current Implementation

- ✅ Input validation dengan Zod
- ✅ SQL injection protection (Prisma)
- ✅ Type safety dengan TypeScript
- ✅ Error handling yang konsisten

### Recommended Additions

- 🔄 Password hashing (bcrypt)
- 🔄 JWT authentication
- 🔄 Rate limiting
- 🔄 CORS configuration
- 🔄 Request logging
- 🔄 API key authentication

## 🚀 Deployment

### Environment Variables untuk Production

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

### Deploy ke Vercel

1. Connect repository ke Vercel
2. Add environment variables
3. Deploy dengan `npm run db:deploy` untuk migrations

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

Untuk pertanyaan atau dukungan:

- **Email**: support@backenddimas.com
- **Documentation**: http://localhost:3000/docs
- **Issues**: Create issue di repository ini

---

**Happy Coding! 🎉**

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log("🗑️ Cleaning existing data...");
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log("👥 Creating users...");
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        password: "hashed_password_123", // In production, use bcrypt to hash passwords
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        username: "janesmith",
        password: "hashed_password_456",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Dimas Pratama",
        email: "dimas@example.com",
        username: "dimas123",
        password: "hashed_password_789",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        username: "sarahw",
        password: "hashed_password_101",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        username: "mikej",
        password: "hashed_password_121",
        isActive: false, // Inactive user for testing
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create Posts
  console.log("📝 Creating posts...");
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "Getting Started with Next.js 15",
        content:
          "Next.js 15 brings exciting new features including improved App Router, better performance optimizations, and enhanced developer experience. In this comprehensive guide, we'll explore the key features and how to migrate your existing applications.",
        slug: "getting-started-nextjs-15",
        published: true,
        tags: ["nextjs", "javascript", "web-development", "react"],
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
        authorId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Building RESTful APIs with Prisma and PostgreSQL",
        content: "Learn how to build robust and scalable RESTful APIs using Prisma ORM with PostgreSQL database. We'll cover schema design, CRUD operations, relationships, and best practices for production applications.",
        slug: "building-apis-prisma-postgresql",
        published: true,
        tags: ["prisma", "postgresql", "api", "backend", "orm"],
        thumbnail: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800",
        authorId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "TypeScript Best Practices for Large Applications",
        content:
          "As TypeScript applications grow larger, maintaining code quality and developer productivity becomes crucial. This article covers essential patterns, type safety strategies, and organizational techniques for enterprise-level TypeScript projects.",
        slug: "typescript-best-practices-large-apps",
        published: true,
        tags: ["typescript", "best-practices", "enterprise", "code-quality"],
        thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
        authorId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Modern Authentication Strategies",
        content: "Security is paramount in modern web applications. This comprehensive guide explores various authentication strategies including JWT tokens, OAuth 2.0, session-based auth, and passwordless authentication methods.",
        slug: "modern-authentication-strategies",
        published: false, // Draft post for testing
        tags: ["authentication", "security", "jwt", "oauth"],
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
        authorId: users[3].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Deploying Full-Stack Applications to Production",
        content: "Moving from development to production requires careful planning and execution. We'll cover deployment strategies, environment configuration, monitoring, and scaling considerations for full-stack applications.",
        slug: "deploying-fullstack-apps-production",
        published: true,
        tags: ["deployment", "production", "devops", "scaling"],
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        authorId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Introduction to Machine Learning with Python",
        content: "Machine learning is transforming how we solve complex problems. In this beginner-friendly guide, we'll introduce core ML concepts and build your first predictive model using Python and scikit-learn.",
        slug: "intro-machine-learning-python",
        published: true,
        tags: ["machine-learning", "python", "ai", "data-science"],
        thumbnail: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800",
        authorId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Building Responsive UIs with Tailwind CSS",
        content: "Tailwind CSS revolutionizes how we approach styling in modern web development. Learn how to create beautiful, responsive interfaces using utility-first CSS methodology and advanced Tailwind features.",
        slug: "building-responsive-uis-tailwind",
        published: false, // Another draft for testing
        tags: ["tailwind", "css", "responsive-design", "ui-ux"],
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        authorId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Database Optimization Techniques",
        content: "Database performance can make or break your application. Explore indexing strategies, query optimization, connection pooling, and caching techniques to ensure your database scales efficiently.",
        slug: "database-optimization-techniques",
        published: true,
        tags: ["database", "optimization", "performance", "sql"],
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
        authorId: users[3].id,
      },
    }),
  ]);

  console.log(`✅ Created ${posts.length} posts`);

  // Update view counts for some posts (simulating real usage)
  console.log("📊 Updating view counts...");
  await prisma.post.update({
    where: { id: posts[0].id },
    data: { viewCount: 1247 },
  });

  await prisma.post.update({
    where: { id: posts[1].id },
    data: { viewCount: 892 },
  });

  await prisma.post.update({
    where: { id: posts[2].id },
    data: { viewCount: 665 },
  });

  await prisma.post.update({
    where: { id: posts[4].id },
    data: { viewCount: 1834 },
  });

  console.log("✅ Updated view counts");

  // Summary
  console.log("\n🎉 Database seeding completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   - Users created: ${users.length}`);
  console.log(`   - Posts created: ${posts.length}`);
  console.log(`   - Published posts: ${posts.filter((p) => p.published).length}`);
  console.log(`   - Draft posts: ${posts.filter((p) => !p.published).length}`);
  console.log(`   - Active users: ${users.filter((u) => u.isActive).length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

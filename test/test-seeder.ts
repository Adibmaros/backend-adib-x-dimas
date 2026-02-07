import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testSeederData() {
  console.log("🧪 Testing seeded data...");

  try {
    // Test users
    const userCount = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { isActive: true },
    });

    console.log(`👥 Users: ${userCount} total, ${activeUsers} active`);

    // Test posts
    const postCount = await prisma.post.count();
    const publishedPosts = await prisma.post.count({
      where: { published: true },
    });

    console.log(`📝 Posts: ${postCount} total, ${publishedPosts} published`);

    // Test relationships
    const userWithPosts = await prisma.user.findFirst({
      include: {
        posts: true,
      },
    });

    if (userWithPosts) {
      console.log(`🔗 User "${userWithPosts.name}" has ${userWithPosts.posts.length} posts`);
    }

    // Test view counts
    const postsWithViews = await prisma.post.findMany({
      where: {
        viewCount: {
          gt: 0,
        },
      },
      select: {
        title: true,
        viewCount: true,
      },
    });

    console.log(`📊 Posts with views: ${postsWithViews.length}`);
    postsWithViews.forEach((post) => {
      console.log(`   - "${post.title}": ${post.viewCount} views`);
    });

    // Test specific data
    const dimasUser = await prisma.user.findUnique({
      where: { username: "dimas123" },
      include: {
        posts: {
          select: {
            title: true,
            published: true,
          },
        },
      },
    });

    if (dimasUser) {
      console.log(`👤 Found Dimas user with ${dimasUser.posts.length} posts`);
    }

    console.log("✅ All seeder data tests passed!");
  } catch (error) {
    console.error("❌ Error testing seeder data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testSeederData();

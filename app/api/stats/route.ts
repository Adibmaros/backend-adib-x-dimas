import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Returns overview statistics including user counts, post counts, top posts by views, recent posts, and tag distribution.
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         active:
 *                           type: integer
 *                         inactive:
 *                           type: integer
 *                     posts:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         published:
 *                           type: integer
 *                         draft:
 *                           type: integer
 *                         totalViews:
 *                           type: integer
 *                     topPosts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           title:
 *                             type: string
 *                           slug:
 *                             type: string
 *                           viewCount:
 *                             type: integer
 *                           author:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               username:
 *                                 type: string
 *                     recentPosts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PostWithAuthor'
 *                     topAuthors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           username:
 *                             type: string
 *                           avatar:
 *                             type: string
 *                           _count:
 *                             type: object
 *                             properties:
 *                               posts:
 *                                 type: integer
 */
export async function GET() {
  try {
    const [totalUsers, activeUsers, totalPosts, publishedPosts, viewsAggregate, topPosts, recentPosts, topAuthors] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.aggregate({ _sum: { viewCount: true } }),
      prisma.post.findMany({
        take: 5,
        where: { published: true },
        orderBy: { viewCount: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          viewCount: true,
          author: {
            select: { name: true, username: true },
          },
        },
      }),
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { posts: { _count: "desc" } },
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          _count: { select: { posts: true } },
        },
      }),
    ]);

    return NextResponse.json({
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: totalUsers - activeUsers,
        },
        posts: {
          total: totalPosts,
          published: publishedPosts,
          draft: totalPosts - publishedPosts,
          totalViews: viewsAggregate._sum.viewCount || 0,
        },
        topPosts,
        recentPosts,
        topAuthors,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}

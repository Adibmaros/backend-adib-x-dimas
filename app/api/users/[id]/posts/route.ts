import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UserIdSchema = z.object({
  id: z.string().transform(Number),
});

/**
 * @swagger
 * /api/users/{id}/posts:
 *   get:
 *     summary: Get all posts by a specific user
 *     description: Returns all posts belonging to a user, with optional filters for published status and sorting.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: published
 *         schema:
 *           type: boolean
 *         description: Filter by published status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, viewCount, title]
 *           default: createdAt
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: User's posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     username:
 *                       type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 total:
 *                   type: integer
 *       404:
 *         description: User not found
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = UserIdSchema.parse(params);
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, username: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const where: any = { authorId: id };
    if (published !== null && published !== undefined && published !== "") {
      where.published = published === "true";
    }

    const validSortFields = ["createdAt", "viewCount", "title"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = order === "asc" ? "asc" : "desc";

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        select: {
          id: true,
          title: true,
          content: true,
          slug: true,
          published: true,
          tags: true,
          thumbnail: true,
          viewCount: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      user,
      data: posts,
      total,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    console.error("Error fetching user posts:", error);
    return NextResponse.json({ error: "Failed to fetch user posts" }, { status: 500 });
  }
}

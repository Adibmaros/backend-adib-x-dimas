import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/posts/tags:
 *   get:
 *     summary: Get all unique tags
 *     description: Returns a list of all unique tags used across posts with their usage count.
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of tags with counts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tag:
 *                         type: string
 *                         example: "nextjs"
 *                       count:
 *                         type: integer
 *                         example: 5
 */
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      select: { tags: true },
    });

    const tagCount: Record<string, number> = {};
    for (const post of posts) {
      for (const tag of post.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    }

    const data = Object.entries(tagCount)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}

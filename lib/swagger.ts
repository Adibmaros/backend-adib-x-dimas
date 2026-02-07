import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Adib x Dimas API",
      version: "1.0.0",
      description: "A comprehensive REST API built with Next.js, Prisma, and Supabase",
      contact: {
        name: "API Support",
        email: "support@backenddimas.com",
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", format: "email", example: "john@example.com" },
            name: { type: "string", nullable: true, example: "John Doe" },
            username: { type: "string", example: "johndoe" },
            avatar: { type: "string", format: "uri", nullable: true, example: "https://example.com/avatar.jpg" },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        UserWithPosts: {
          allOf: [
            { $ref: "#/components/schemas/User" },
            {
              type: "object",
              properties: {
                posts: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      title: { type: "string" },
                      slug: { type: "string" },
                      published: { type: "boolean" },
                      createdAt: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          ],
        },
        Post: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "My First Post" },
            content: { type: "string", nullable: true, example: "This is the post content..." },
            slug: { type: "string", example: "my-first-post" },
            published: { type: "boolean", example: false },
            tags: { type: "array", items: { type: "string" }, example: ["tech", "programming"] },
            thumbnail: { type: "string", format: "uri", nullable: true, example: "https://example.com/thumb.jpg" },
            viewCount: { type: "integer", example: 0 },
            authorId: { type: "integer", example: 1 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        PostWithAuthor: {
          allOf: [
            { $ref: "#/components/schemas/Post" },
            {
              type: "object",
              properties: {
                author: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    name: { type: "string", nullable: true },
                    username: { type: "string" },
                    avatar: { type: "string", nullable: true },
                  },
                },
              },
            },
          ],
        },
        CreateUserRequest: {
          type: "object",
          required: ["email", "username", "password"],
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            name: { type: "string", example: "John Doe" },
            username: { type: "string", minLength: 3, example: "johndoe" },
            password: { type: "string", minLength: 6, example: "password123" },
            avatar: { type: "string", format: "uri", example: "https://example.com/avatar.jpg" },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            name: { type: "string", example: "John Doe" },
            username: { type: "string", minLength: 3, example: "johndoe" },
            password: { type: "string", minLength: 6, example: "password123" },
            avatar: { type: "string", format: "uri", example: "https://example.com/avatar.jpg" },
            isActive: { type: "boolean", example: true },
          },
        },
        CreatePostRequest: {
          type: "object",
          required: ["title", "slug", "authorId"],
          properties: {
            title: { type: "string", minLength: 1, example: "My First Post" },
            content: { type: "string", example: "This is the post content..." },
            slug: { type: "string", minLength: 1, example: "my-first-post" },
            published: { type: "boolean", default: false, example: false },
            tags: { type: "array", items: { type: "string" }, default: [], example: ["tech", "programming"] },
            thumbnail: { type: "string", format: "uri", example: "https://example.com/thumb.jpg" },
            authorId: { type: "integer", example: 1 },
          },
        },
        UpdatePostRequest: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 1, example: "Updated Post Title" },
            content: { type: "string", example: "Updated post content..." },
            slug: { type: "string", minLength: 1, example: "updated-post-title" },
            published: { type: "boolean", example: true },
            tags: { type: "array", items: { type: "string" }, example: ["tech", "programming", "tutorial"] },
            thumbnail: { type: "string", format: "uri", example: "https://example.com/new-thumb.jpg" },
            authorId: { type: "integer", example: 1 },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 10 },
            total: { type: "integer", example: 100 },
            totalPages: { type: "integer", example: 10 },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string", example: "An error occurred" },
            details: { type: "array", items: { type: "object" } },
          },
        },
      },
    },
    tags: [
      {
        name: "Users",
        description: "User management operations",
      },
      {
        name: "Posts",
        description: "Post management operations",
      },
      {
        name: "Stats",
        description: "Dashboard statistics and analytics",
      },
    ],
  },
  apis: ["./app/api/**/*.ts"], // Path to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJSDoc(options);

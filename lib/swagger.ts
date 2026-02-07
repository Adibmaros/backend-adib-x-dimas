import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Adib x Dimas API",
      version: "1.0.0",
      description: "A comprehensive REST API built with Next.js, Prisma, and Supabase. Provides endpoints for managing users, posts, tags, and dashboard statistics.",
      contact: {
        name: "API Support",
        email: "support@backenddimas.com",
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        description: "API Server",
      },
    ],
    tags: [
      { name: "Users", description: "User management endpoints" },
      { name: "Posts", description: "Post management endpoints" },
      { name: "Stats", description: "Dashboard statistics" },
    ],

    // ================================================================
    // SEMUA PATHS DI-HARDCODE AGAR 100% MUNCUL DI VERCEL PRODUCTION
    // ================================================================
    paths: {
      // ========================
      //         USERS
      // ========================
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          description: "Returns paginated list of all users.",
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
              description: "Page number",
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 10 },
              description: "Number of items per page",
            },
          ],
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/User" },
                      },
                      pagination: { $ref: "#/components/schemas/Pagination" },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Users"],
          summary: "Create a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateUserRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      data: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
            400: { description: "Validation error" },
            409: { description: "User already exists" },
          },
        },
      },

      "/api/users/{id}": {
        get: {
          tags: ["Users"],
          summary: "Get user by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "User ID",
            },
          ],
          responses: {
            200: {
              description: "User found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/UserWithPosts" },
                    },
                  },
                },
              },
            },
            404: { description: "User not found" },
          },
        },
        put: {
          tags: ["Users"],
          summary: "Update user by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "User ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateUserRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "User updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      data: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
            404: { description: "User not found" },
            409: { description: "Email or username already exists" },
          },
        },
        delete: {
          tags: ["Users"],
          summary: "Delete user by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "User ID",
            },
          ],
          responses: {
            200: {
              description: "User deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
            404: { description: "User not found" },
          },
        },
      },

      "/api/users/{id}/posts": {
        get: {
          tags: ["Users"],
          summary: "Get all posts by a specific user",
          description: "Returns all posts belonging to a user, with optional filters for published status and sorting.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "User ID",
            },
            {
              in: "query",
              name: "published",
              schema: { type: "boolean" },
              description: "Filter by published status",
            },
            {
              in: "query",
              name: "sortBy",
              schema: {
                type: "string",
                enum: ["createdAt", "viewCount", "title"],
                default: "createdAt",
              },
              description: "Sort field",
            },
            {
              in: "query",
              name: "order",
              schema: {
                type: "string",
                enum: ["asc", "desc"],
                default: "desc",
              },
              description: "Sort order",
            },
          ],
          responses: {
            200: {
              description: "User's posts",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          name: { type: "string" },
                          username: { type: "string" },
                        },
                      },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Post" },
                      },
                      total: { type: "integer" },
                    },
                  },
                },
              },
            },
            404: { description: "User not found" },
          },
        },
      },

      "/api/users/with-posts": {
        get: {
          tags: ["Users"],
          summary: "Get all users with their posts",
          description: "Returns all users along with their posts. Supports pagination and filtering by active status.",
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
              description: "Page number",
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 10 },
              description: "Number of items per page",
            },
            {
              in: "query",
              name: "isActive",
              schema: { type: "boolean" },
              description: "Filter by active status",
            },
          ],
          responses: {
            200: {
              description: "List of users with their posts",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/UserWithPosts" },
                      },
                      pagination: { $ref: "#/components/schemas/Pagination" },
                    },
                  },
                },
              },
            },
          },
        },
      },

      // ========================
      //         POSTS
      // ========================
      "/api/posts": {
        get: {
          tags: ["Posts"],
          summary: "Get all posts",
          description: "Returns paginated list of posts with author info.",
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
              description: "Page number",
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 10 },
              description: "Number of items per page",
            },
            {
              in: "query",
              name: "published",
              schema: { type: "boolean" },
              description: "Filter by published status",
            },
            {
              in: "query",
              name: "authorId",
              schema: { type: "integer" },
              description: "Filter by author ID",
            },
          ],
          responses: {
            200: {
              description: "List of posts",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/PostWithAuthor" },
                      },
                      pagination: { $ref: "#/components/schemas/Pagination" },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Posts"],
          summary: "Create a new post",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreatePostRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "Post created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      data: { $ref: "#/components/schemas/PostWithAuthor" },
                    },
                  },
                },
              },
            },
            400: { description: "Validation error" },
            404: { description: "Author not found" },
            409: { description: "Post with this slug already exists" },
          },
        },
      },

      "/api/posts/{id}": {
        get: {
          tags: ["Posts"],
          summary: "Get post by ID",
          description: "Retrieve a single post by ID. Also increments the view count.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "Post ID",
            },
          ],
          responses: {
            200: {
              description: "Post found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/PostWithAuthor" },
                    },
                  },
                },
              },
            },
            404: { description: "Post not found" },
          },
        },
        put: {
          tags: ["Posts"],
          summary: "Update post by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "Post ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdatePostRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Post updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      data: { $ref: "#/components/schemas/PostWithAuthor" },
                    },
                  },
                },
              },
            },
            404: { description: "Post not found" },
            409: { description: "Slug already exists" },
          },
        },
        delete: {
          tags: ["Posts"],
          summary: "Delete post by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "Post ID",
            },
          ],
          responses: {
            200: {
              description: "Post deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
            404: { description: "Post not found" },
          },
        },
      },

      "/api/posts/search": {
        get: {
          tags: ["Posts"],
          summary: "Search posts by keyword",
          description: "Full-text search across post titles and content. Returns matching posts with author info.",
          parameters: [
            {
              in: "query",
              name: "q",
              required: true,
              schema: { type: "string" },
              description: "Search keyword",
            },
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
              description: "Page number",
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 10 },
              description: "Number of items per page",
            },
            {
              in: "query",
              name: "published",
              schema: { type: "boolean" },
              description: "Filter by published status",
            },
          ],
          responses: {
            200: {
              description: "Search results",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      query: { type: "string" },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/PostWithAuthor" },
                      },
                      pagination: { $ref: "#/components/schemas/Pagination" },
                    },
                  },
                },
              },
            },
            400: { description: "Missing search query" },
          },
        },
      },

      "/api/posts/slug/{slug}": {
        get: {
          tags: ["Posts"],
          summary: "Get post by slug",
          description: "Retrieve a single post by its unique slug. Also increments the view count.",
          parameters: [
            {
              in: "path",
              name: "slug",
              required: true,
              schema: { type: "string" },
              description: "Post slug",
            },
          ],
          responses: {
            200: {
              description: "Post found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/PostWithAuthor" },
                    },
                  },
                },
              },
            },
            404: { description: "Post not found" },
          },
        },
      },

      "/api/posts/tags": {
        get: {
          tags: ["Posts"],
          summary: "Get all unique tags",
          description: "Returns a list of all unique tags used across posts with their usage count.",
          responses: {
            200: {
              description: "List of tags with counts",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            tag: { type: "string", example: "nextjs" },
                            count: { type: "integer", example: 5 },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      // ========================
      //         STATS
      // ========================
      "/api/stats": {
        get: {
          tags: ["Stats"],
          summary: "Get dashboard statistics",
          description: "Returns overview statistics including user counts, post counts, top posts by views, recent posts, and tag distribution.",
          responses: {
            200: {
              description: "Dashboard statistics",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        properties: {
                          users: {
                            type: "object",
                            properties: {
                              total: { type: "integer" },
                              active: { type: "integer" },
                              inactive: { type: "integer" },
                            },
                          },
                          posts: {
                            type: "object",
                            properties: {
                              total: { type: "integer" },
                              published: { type: "integer" },
                              draft: { type: "integer" },
                              totalViews: { type: "integer" },
                            },
                          },
                          topPosts: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: { type: "integer" },
                                title: { type: "string" },
                                slug: { type: "string" },
                                viewCount: { type: "integer" },
                                author: {
                                  type: "object",
                                  properties: {
                                    name: { type: "string" },
                                    username: { type: "string" },
                                  },
                                },
                              },
                            },
                          },
                          recentPosts: {
                            type: "array",
                            items: {
                              $ref: "#/components/schemas/PostWithAuthor",
                            },
                          },
                          topAuthors: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: { type: "integer" },
                                name: { type: "string" },
                                username: { type: "string" },
                                avatar: { type: "string", nullable: true },
                                _count: {
                                  type: "object",
                                  properties: {
                                    posts: { type: "integer" },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    // ========================
    //      COMPONENTS
    // ========================
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", format: "email", example: "user@example.com" },
            name: { type: "string", nullable: true, example: "John Doe" },
            username: { type: "string", example: "johndoe" },
            avatar: { type: "string", nullable: true, example: "https://example.com/avatar.jpg" },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Post: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "My First Post" },
            content: { type: "string", nullable: true, example: "Post content here..." },
            slug: { type: "string", example: "my-first-post" },
            published: { type: "boolean", example: false },
            tags: { type: "array", items: { type: "string" }, example: ["nextjs", "prisma"] },
            thumbnail: { type: "string", nullable: true, example: "https://example.com/thumb.jpg" },
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
                      tags: { type: "array", items: { type: "string" } },
                      thumbnail: { type: "string", nullable: true },
                      viewCount: { type: "integer" },
                      createdAt: { type: "string", format: "date-time" },
                    },
                  },
                },
                _count: {
                  type: "object",
                  properties: {
                    posts: { type: "integer" },
                  },
                },
              },
            },
          ],
        },
        Pagination: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 10 },
            total: { type: "integer", example: 50 },
            totalPages: { type: "integer", example: 5 },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["email", "username", "password"],
          properties: {
            email: { type: "string", format: "email", example: "newuser@example.com" },
            username: { type: "string", minLength: 3, example: "newuser" },
            password: { type: "string", minLength: 6, example: "secret123" },
            name: { type: "string", example: "New User" },
            avatar: { type: "string", format: "uri", example: "https://example.com/avatar.jpg" },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            username: { type: "string", minLength: 3 },
            password: { type: "string", minLength: 6 },
            name: { type: "string" },
            avatar: { type: "string", format: "uri" },
            isActive: { type: "boolean" },
          },
        },
        CreatePostRequest: {
          type: "object",
          required: ["title", "slug", "authorId"],
          properties: {
            title: { type: "string", example: "My New Post" },
            slug: { type: "string", example: "my-new-post" },
            content: { type: "string", example: "Post content here..." },
            published: { type: "boolean", default: false },
            tags: { type: "array", items: { type: "string" }, example: ["tech", "web"] },
            thumbnail: { type: "string", format: "uri" },
            authorId: { type: "integer", example: 1 },
          },
        },
        UpdatePostRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            slug: { type: "string" },
            content: { type: "string" },
            published: { type: "boolean" },
            tags: { type: "array", items: { type: "string" } },
            thumbnail: { type: "string", format: "uri" },
            authorId: { type: "integer" },
          },
        },
      },
    },
  },
  apis: [], // KOSONG - semua sudah di-hardcode di paths agar aman di Vercel
};

export const swaggerSpec = swaggerJSDoc(options);

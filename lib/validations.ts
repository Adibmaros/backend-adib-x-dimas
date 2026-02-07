import { z } from "zod";

// User Schemas
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  username: z.string().min(3),
  password: z.string().min(6),
  avatar: z.string().url().optional(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  username: z.string().min(3).optional(),
  password: z.string().min(6).optional(),
  avatar: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const UserParamsSchema = z.object({
  id: z.string().transform(Number),
});

// Post Schemas
export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  slug: z.string().min(1),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().url().optional(),
  authorId: z.number(),
});

export const UpdatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  slug: z.string().min(1).optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().url().optional(),
  authorId: z.number().optional(),
});

export const PostParamsSchema = z.object({
  id: z.string().transform(Number),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;

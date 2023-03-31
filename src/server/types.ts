import { z } from "zod";

export const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  territory: z.string(),
  summary: z.string(),
});

export const userDetailsWithId = z.object({
  id: z.string(),
  email: z.string(),
  role: z.union([z.literal("Admin"), z.literal("User")]),
});

export const userDetails = z.object({
  email: z.string(),
  role: z.union([z.literal("Admin"), z.literal("User")]),
});

export type UserDetails = z.infer<typeof userDetails>;

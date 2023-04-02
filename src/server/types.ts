import { z } from "zod";

export const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable().optional(),
  territory: z.string().nullable(),
  summary: z.string().nullable(),
});

export const userDetailsWithId = z.object({
  id: z.string(),
  email: z.string(),
  role: z.union([z.literal("Admin"), z.literal("User")]),
});

export const userDetails = z.object({
  email: z.string(),
  role: z.union([z.literal("Admin"), z.literal("User")]),
  partner: z.string().optional(),
});

export type UserDetails = z.infer<typeof userDetails>;

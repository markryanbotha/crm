import { z } from "zod";

export const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4),
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

export const partnerProjectSchema = z.object({
  id: z.string().optional(),
  deviceType: z.string(),
  jiraProject: z.string(),
  partnerId: z.string(),
  tpmId: z.string(),
});

export const communicationInputSchema = z.object({
  id: z.string(),
  type: z.string(),
  header: z.string().min(1).max(50).nullable(),
  content: z.string().min(1).max(1000).nullable(),
  date: z.date(),
  partnerProjectId: z.string().nullable(),
  recipientId: z.string(),
});

export const communicationSchema = communicationInputSchema.extend({
  senderId: z.string(),
  partnerProject: partnerProjectSchema.pick({ jiraProject: true }),
  sender: userDetails.pick({ email: true }),
});

export type CommunicationWithAggregations = z.infer<typeof communicationSchema>;

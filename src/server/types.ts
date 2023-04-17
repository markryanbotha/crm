import { z } from "zod";

// Define Zod types that can be used to validate inputs to tRPC routers,
// and also used to validate user input in forms in the frontend
// This ensures that consistent data enters the database according to a single definition
export const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "The name of the partner must be defined"),
  email: z.string().email(),
  phone: z
    .string()
    .regex(
      /((\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/,
      "The phone number is invalid, please ensure that it begins with 0 or an area code, followed by 10 digits"
    ),
  territory: z.string().min(2).max(3),
  summary: z.string().nullable(),
});

export const userDetails = z.object({
  email: z.string().email(),
  name: z.string().min(1, "You must specify your name"),
  jobTitle: z.string().min(1, "You must specify your Job Title"),
  role: z.union([z.literal("Admin"), z.literal("User")]),
  partner: z.string().optional(),
});

export type UserDetails = z.infer<typeof userDetails>;

export const userDetailsWithId = userDetails.extend({
  id: z.string(),
});

export const partnerProjectSchema = z.object({
  id: z.string().optional(),
  deviceType: z.string().min(1, "The device type must be defined"),
  jiraProject: z.string().min(1, "The Jira Project ID must be defined"),
  partnerId: z.string(),
  tpmId: z.string(),
});

export const communicationInputSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  header: z.string().min(1).max(50).nullable(),
  content: z.string().min(1).max(1000).nullable(),
  date: z.date(),
  partnerProjectId: z.string().nullable(),
  recipientId: z.string(),
});

export const communicationSchema = communicationInputSchema.extend({
  id: z.string(),
  senderId: z.string(),
  partnerProject: partnerProjectSchema.pick({ jiraProject: true }).nullable(),
  sender: userDetails.pick({ email: true }),
});

export type CommunicationWithAggregations = z.infer<typeof communicationSchema>;

// Import the zod validation library and necessary functions and schemas
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { communicationInputSchema, communicationSchema } from "~/server/types";

// Create a router for communication related functions
export const communicationRouter = createTRPCRouter({
  // Retrieve all messages
  getAllMessages: protectedProcedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.communication.findMany({
      include: {
        partnerProject: { select: { jiraProject: true } },
        sender: { select: { email: true } },
      },
    });
    // Parse the messages using the communication schema, which allows for type-inference in frontend components
    return communicationSchema.array().parse(messages);
  }),
  // Retrieve all messages sent by the logged-in user
  getSentMessages: protectedProcedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.communication.findMany({
      where: { senderId: ctx.session.user.id },
      include: {
        partnerProject: { select: { jiraProject: true } },
        sender: { select: { email: true } },
      },
    });
    // Parse the messages using the communication schema
    return communicationSchema.array().parse(messages);
  }),
  // Retrieve all messages received by the logged-in user
  getReceivedMessages: protectedProcedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.communication.findMany({
      where: { recipientId: ctx.session.user.id },
      include: {
        partnerProject: { select: { jiraProject: true } },
        sender: { select: { email: true } },
      },
    });
    // Parse the messages using the communication schema
    return communicationSchema.array().parse(messages);
  }),
  // Send a new message
  sendMessage: protectedProcedure
    .input(communicationInputSchema)
    .mutation(async ({ ctx, input }) => {
      const senderId = ctx.session.user.id;
      // Create a new message with the logged-in user as the sender
      return await ctx.prisma.communication.create({
        data: { ...input, senderId },
      });
    }),
  // Edit an existing message
  editMessage: protectedProcedure
    .input(communicationInputSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Update the message with the provided ID
      return await ctx.prisma.user.update({
        where: { id: input.id },
        data: input,
      });
    }),
});

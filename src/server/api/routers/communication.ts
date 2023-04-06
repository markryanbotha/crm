import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { communicationInputSchema, communicationSchema } from "~/server/types";

export const communicationRouter = createTRPCRouter({
  getAllMessages: protectedProcedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.communication.findMany({
      include: {
        partnerProject: { select: { jiraProject: true } },
        sender: { select: { email: true } },
      },
    });
    return communicationSchema.array().parse(messages);
  }),
  sendMessage: protectedProcedure
    .input(communicationInputSchema)
    .mutation(async ({ ctx, input }) => {
      const senderId = ctx.session.user.id;
      return await ctx.prisma.communication.create({
        data: { ...input, senderId },
      });
    }),
  editMessage: protectedProcedure
    .input(communicationInputSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: { id: input.id },
        data: input,
      });
    }),
});

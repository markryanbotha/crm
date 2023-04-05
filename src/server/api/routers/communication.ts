import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { communicationSchema } from "~/server/types";

export const communicationRouter = createTRPCRouter({
  getAllMessages: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.communication.findMany({
      include: {
        PartnerProject: { select: { jiraProject: true } },
        recipient: { select: { email: true } },
      },
    });
  }),
  sendMessage: protectedProcedure
    .input(communicationSchema.omit({ id: true, senderId: true }))
    .mutation(async ({ ctx, input }) => {
      const senderId = ctx.session.user.id;
      return await ctx.prisma.communication.create({
        data: { ...input, senderId },
      });
    }),
  editMessage: protectedProcedure
    .input(communicationSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: { id: input.id },
        data: input,
      });
    }),
});

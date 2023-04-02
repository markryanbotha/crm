import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { userDetails } from "~/server/types";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(userDetails)
    .mutation(async ({ ctx, input }) => {
      if (input.partner) {
        return await ctx.prisma.user.create({
          data: { ...input, partner: { connect: { name: input.partner } } },
        });
      }

      return await ctx.prisma.user.create({
        data: { email: input.email, role: input.role },
      });
    }),

  assignPartner: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await ctx.prisma.user.update({
        where: { id: userId },
        data: { partner: { connect: { name: input } } },
      });
    }),
});

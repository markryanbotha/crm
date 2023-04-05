import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { partnerProjectSchema } from "~/server/types";

export const partnerProjectRouter = createTRPCRouter({
  getAllPartnerProjects: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.partnerProject.findMany({
      include: {
        partner: { select: { name: true } },
        tpm: { select: { email: true } },
      },
    });
  }),
  createPartnerProject: protectedProcedure
    .input(partnerProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partnerProject.create({ data: input });
    }),
  updatePartnerProject: protectedProcedure
    .input(partnerProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partnerProject.update({
        where: { id: input.id },
        data: input,
      });
    }),
  deletePartnerProject: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partnerProject.delete({ where: { id: input } });
    }),
});

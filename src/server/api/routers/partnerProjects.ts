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
  getAllProjectsForUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    // If the user is an Admin, then return all projects
    if (user.role === "Admin") {
      return await ctx.prisma.partnerProject.findMany({
        include: {
          partner: { select: { name: true } },
          tpm: { select: { email: true } },
        },
      });
    }

    // Only return projects that belong to that specific partner
    return await ctx.prisma.partnerProject.findMany({
      where: {
        partnerId: user.partnerId,
      },
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

import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { partnerSchema } from "~/server/types";

export const partnerRouter = createTRPCRouter({
  getAllPartnerNames: publicProcedure.query(async ({ ctx }) => {
    const partners = await ctx.prisma.partner.findMany();
    return partners.map((partner) => partner.name);
  }),
  getAllPartners: protectedProcedure.query(async ({ ctx }) => {
    // If the user is not an admin, only return their respective partner
    if (ctx.session.user.role === "User") {
      return await ctx.prisma.partner.findMany({
        where: { id: ctx.session.user.partnerId },
      });
    }
    return await ctx.prisma.partner.findMany();
  }),
  getEmployeesInPartner: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.partner.findFirst({
        where: { id: input },
        include: { employees: true },
      });
    }),
  createPartner: adminProcedure
    .input(partnerSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.create({ data: input });
    }),
  updatePartner: protectedProcedure
    .input(partnerSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.update({
        where: { id: input.id },
        data: input,
      });
    }),
  deletePartner: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.delete({ where: { id: input } });
    }),
  addUserToPartner: publicProcedure
    .input(z.object({ partnerName: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.update({
        where: { name: input.partnerName },
        data: { employees: { connect: { id: input.userId } } },
      });
    }),
});

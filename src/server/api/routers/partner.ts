import { z } from "zod";
import {
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
    return await ctx.prisma.partner.findMany();
  }),
  createPartner: protectedProcedure
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
  deletePartner: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.delete({ where: { id: input } });
    }),
});

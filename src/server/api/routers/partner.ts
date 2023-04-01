import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { partnerSchema } from "~/server/types";

export const partnerRouter = createTRPCRouter({
  getAllPartners: protectedProcedure.query(async () => {
    return await prisma.partner.findMany();
  }),
  createPartner: protectedProcedure
    .input(partnerSchema)
    .mutation(async ({ input }) => {
      return await prisma.partner.create({ data: input });
    }),
  updatePartner: protectedProcedure
    .input(partnerSchema)
    .mutation(async ({ input }) => {
      return await prisma.partner.update({
        where: { id: input.id },
        data: input,
      });
    }),
  deletePartner: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await prisma.partner.delete({ where: { id: input } });
    }),
});

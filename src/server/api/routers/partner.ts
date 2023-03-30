import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  territory: z.string(),
  summary: z.string(),
});

export const partnerRouter = createTRPCRouter({
  getAllPartners: publicProcedure.query(async () => {
    const partners = await prisma.partner.findMany();
    return partners;
  }),
  createPartner: publicProcedure
    .input(partnerSchema)
    .mutation(async ({ input }) => {
      return await prisma.partner.create({ data: input });
    }),
  updatePartner: publicProcedure
    .input(partnerSchema)
    .mutation(async ({ input }) => {
      return await prisma.partner.update({
        where: { id: input.id },
        data: input,
      });
    }),
  deletePartner: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await prisma.partner.delete({ where: { id: input } });
    }),
});

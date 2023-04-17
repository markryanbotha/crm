import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { partnerSchema } from "~/server/types";

// Create a TRPC router for the partner model
export const partnerRouter = createTRPCRouter({
  // Get all partner names and return them
  getAllPartnerNames: publicProcedure.query(async ({ ctx }) => {
    const partners = await ctx.prisma.partner.findMany();
    return partners.map((partner) => partner.name);
  }),

  // Get all partners based on the user role
  getAllPartners: protectedProcedure.query(async ({ ctx }) => {
    // If the user is not an admin, only return their respective partner
    if (ctx.session.user.role === "User") {
      return await ctx.prisma.partner.findMany({
        where: { id: ctx.session.user.partnerId },
      });
    }
    // If the user is an admin, return all partners
    return await ctx.prisma.partner.findMany();
  }),

  // Get employees in a partner by its ID
  getEmployeesInPartner: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.partner.findFirst({
        where: { id: input },
        include: { employees: true },
      });
    }),

  // Create a partner
  createPartner: adminProcedure
    .input(partnerSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.create({ data: input });
    }),

  // Update a partner
  updatePartner: protectedProcedure
    .input(partnerSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.update({
        where: { id: input.id },
        data: input,
      });
    }),

  // Delete a partner
  deletePartner: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.delete({ where: { id: input } });
    }),

  // Add a user to a partner
  addUserToPartner: publicProcedure
    .input(z.object({ partnerName: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partner.update({
        where: { name: input.partnerName },
        data: { employees: { connect: { id: input.userId } } },
      });
    }),
});

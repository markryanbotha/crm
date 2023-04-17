// Importing the necessary functions from the trpc module and the zod module for input validation
import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { partnerProjectSchema } from "~/server/types";

// Creating a router for partner project related API endpoints using the createTRPCRouter function
export const partnerProjectRouter = createTRPCRouter({
  // Defining an endpoint to get all partner projects, which is only accessible by authenticated users with the "Admin" role
  getAllPartnerProjects: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.partnerProject.findMany({
      include: {
        partner: { select: { name: true } },
        tpm: { select: { email: true } },
      },
    });
  }),

  // Defining an endpoint to get all projects for a user, which is only accessible by authenticated users
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

  // Defining an endpoint to create a partner project, which is only accessible by authenticated users
  createPartnerProject: protectedProcedure
    .input(partnerProjectSchema) // Specifying the expected input format for this endpoint using the partnerProjectSchema object
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partnerProject.create({ data: input });
    }),

  // Defining an endpoint to update a partner project, which is only accessible by authenticated users
  updatePartnerProject: protectedProcedure
    .input(partnerProjectSchema) // Specifying the expected input format for this endpoint using the partnerProjectSchema object
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partnerProject.update({
        where: { id: input.id },
        data: input,
      });
    }),

  // Defining an endpoint to delete a partner project, which is only accessible by authenticated users with the "Admin" role
  deletePartnerProject: adminProcedure
    .input(z.string()) // Specifying the expected input format for this endpoint using the z.string() method
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.partnerProject.delete({ where: { id: input } });
    }),
});

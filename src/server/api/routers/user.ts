import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { userDetails } from "~/server/types";

// Creating a router for user related API endpoints using the createTRPCRouter function
export const userRouter = createTRPCRouter({
  // Defining a signUp endpoint that is accessible publicly using the publicProcedure function
  signUp: publicProcedure
    .input(userDetails) // Specifying the expected input format for this endpoint
    .mutation(async ({ ctx, input }) => {
      if (input.partner) {
        // If the input includes a partner, create a user and assign that partner
        return await ctx.prisma.user.create({
          data: { ...input, partner: { connect: { name: input.partner } } },
        });
      }
      // Otherwise, create a user with the provided information
      return await ctx.prisma.user.create({
        data: {
          email: input.email,
          role: input.role,
          name: input.name,
          jobTitle: input.jobTitle,
        },
      });
    }),

  // Defining a getAllAdminUsers endpoint that is only accessible by authenticated users with the "Admin" role using the protectedProcedure function
  getAllAdminUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({ where: { role: "Admin" } });
  }),

  // Defining a getAllUsers endpoint that is only accessible by authenticated users using the protectedProcedure function
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
});

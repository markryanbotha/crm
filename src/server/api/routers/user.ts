import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { userDetails } from "~/server/types";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure.input(userDetails).mutation(async ({ input }) => {
    return await prisma.user.create({
      data: input,
    });
  }),
});

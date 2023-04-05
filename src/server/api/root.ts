import { createTRPCRouter } from "~/server/api/trpc";
import { partnerRouter } from "./routers/partner";
import { partnerProjectRouter } from "./routers/partnerProjects";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  partner: partnerRouter,
  user: userRouter,
  project: partnerProjectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

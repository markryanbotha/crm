import { createTRPCRouter } from "~/server/api/trpc";
import { partnerRouter } from "./routers/partner";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  partner: partnerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

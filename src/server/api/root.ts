import { createTRPCRouter } from "~/server/api/trpc";
import { partnerRouter } from "./routers/partner";
import { partnerProjectRouter } from "./routers/partnerProjects";
import { userRouter } from "./routers/user";
import { communicationRouter } from "./routers/communication";

export const appRouter = createTRPCRouter({
  partner: partnerRouter,
  user: userRouter,
  project: partnerProjectRouter,
  communication: communicationRouter,
});

export type AppRouter = typeof appRouter;

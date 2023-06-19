import { exampleRouter } from "~/server/api/routers/example";
import { projectRouter } from "~/server/api/routers/project";
import { sprintRouter } from "~/server/api/routers/sprint";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  project: projectRouter,
  sprint: sprintRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

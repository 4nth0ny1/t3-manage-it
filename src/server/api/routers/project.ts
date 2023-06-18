import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({


  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),


});
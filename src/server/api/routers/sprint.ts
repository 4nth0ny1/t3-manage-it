import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {getAllSprints} from '../../../types'

export const sprintRouter = createTRPCRouter({
  getAllSprints: protectedProcedure
  .input(getAllSprints)
  .query(({ ctx, input }) => {
    return ctx.prisma.sprint.findMany({
      where: {
        project: {
          id: input.projectId
        }
      },
        orderBy: [{ createdAt: "desc" }],
    });
  }),
});
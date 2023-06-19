import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {getAllSprints, getOneSprint} from '../../../types'

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

  getOneSprint: protectedProcedure
  .input(getOneSprint)
  .query(async({ctx, input}) => {
    return await ctx.prisma.sprint.findUnique({
      where: {
        id: input.sprintId
      }
    })
  }),

  createSprint: protectedProcedure
  .input(z.object({name: z.string(), description: z.string(), projectId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.prisma.sprint.create({
      data: {
        name: input.name,
        description: input.description,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        },
        project: {
          connect: {
            id: input.projectId
          }
        }
        
      }
    })
  }), 

  deleteSprint: protectedProcedure
  .input(z.string())
  .mutation(({ctx, input}) => {
    return ctx.prisma.sprint.delete({
      where: {
        id: input
      }
    })
  })
});
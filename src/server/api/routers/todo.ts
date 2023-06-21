import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,

} from "~/server/api/trpc";
import {getAllTodos} from '../../../types'

export const todoRouter = createTRPCRouter({
  getAllTodos: protectedProcedure
  .input(getAllTodos)
  .query(({ ctx, input }) => {
    return ctx.prisma.todo.findMany({
      where: {
        sprint: {
          id: input.sprintId
        }
      },
        orderBy: [{ createdAt: "desc" }],
    });
  }),

  getAllTodosFromProject: protectedProcedure
  .input(z.object({projectId: z.string()}))
  .query(({ctx, input}) => {
    return ctx.prisma.todo.findMany({
      where: {
        project: {
          id: input.projectId
        }
      }
    })
  })
})
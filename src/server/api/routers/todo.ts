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
      }, 
      include: {
        sprint: true
      }
    })
  }), 

  createTodo: protectedProcedure
  .input(z.object({name: z.string(), description: z.string(), sprintId: z.string(), projectId: z.string()}))
  .mutation( async ({ctx, input}) => {
    return await ctx.prisma.todo.create({
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
        }, 
        sprint: {
          connect: {
            id: input.sprintId
          }
        }
      }
    })
  }), 

  updateTodo: protectedProcedure
  .input(z.object({name: z.string(), description: z.string(), id: z.string()}))
  .mutation(async ({ctx, input}) => {
    return await ctx.prisma.todo.update({
      where: {
        id: input.id
      },
      data: {
        name: input.name,
        description: input.description
      }
    })
  }),

  deleteTodo: protectedProcedure
  .input(z.string())
  .mutation(({ctx, input}) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input
      }
    })
  })
})
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

  getOneProject: protectedProcedure
  .input(z.object({projectId: z.string()}))
  .query(async ({ctx, input}) => {
    return await ctx.prisma.project.findUnique({
      where: {
        id: input.projectId
      }
    })
  }), 

  createProject: protectedProcedure
  .input(z.object({name: z.string(), description: z.string()}))
  .mutation(async ({ctx, input}) => {
    return await ctx.prisma.project.create({
      data: {
        name: input.name,
        description: input.description,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      }
    })
  })

});
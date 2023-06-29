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
      }, 
      
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
  }), 

  updateProject: protectedProcedure
  .input(z.object({projectId: z.string(), name: z.string(), description: z.string()}))
  .mutation( async ({ctx, input}) => {
    return await ctx.prisma.project.update({
      where: {
        id: input.projectId
      }, 
      data: {
        name: input.name,
        description: input.description
      }
    })
  }), 

  deleteProject: protectedProcedure
  .input(z.object({projectId: z.string(), id: z.string()}))
  .mutation(async ({ctx, input}) => {
    return await ctx.prisma.project.delete({
      where: {
        id: input.id
      }
    })
    // const deleteSprints = ctx.prisma.sprint.deleteMany({
    //   where: {
    //     projectId: input.projectId,
    //   },
    // })
    
    // const deleteProject = ctx.prisma.project.delete({
    //   where: {
    //     id: input.id,
    //   },
    // })
    
    // const transaction = await ctx.prisma.$transaction([deleteSprints, deleteProject])
    // return transaction
  })

});
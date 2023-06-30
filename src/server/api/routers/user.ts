import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAllUsers: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany();
    }),

    getUserProfile: protectedProcedure
        .input(z.object({userId: z.string()}))
        .query(({ctx, input})=> {
            return ctx.prisma.user.findUnique({
                where: {id: input.userId}
            });
        })
});


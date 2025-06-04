import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'
// import { auth } from "@fm-apps/auth"

export const sessionRouter = router({
    getById: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return await prisma.session.findUnique({
                where : {
                    id: input,
                },
            })
        }),
    getByValues: publicProcedure
        .input(z.object({
                token : z.string(),
                userId : z.string(),
            })
        )
        .query(async ({ input }) => {
            return await prisma.session.findUnique({
                where : {
                    token: input.token,
                    userId : input.userId,
                },
            })
        }),
})
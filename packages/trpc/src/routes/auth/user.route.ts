import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'
import { auth } from "@fm-apps/auth"

export const userRouter = router({
    getById: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return await prisma.user.findUnique({
                where : {
                    id: input,
                },
            })
        }),
    signUpByMailAndPassword: publicProcedure
        .input(
            z.object({
                email : z.string(),
                password : z.string(),
                name: z.string(),
                callbackURL : z.string().optional(),
            })
        )
        .mutation(async ({ input }) => { 
            const result = await auth.api.signUpEmail({
                asResponse: false,
                body: {
                    email: input.email,
                    password: input.password,
                    name: input.name,
                },
            })
            return result
        }),
    signInByMailAndPassword: publicProcedure
        .input(
            z.object({
                email : z.string(),
                password : z.string(),
                callbackURL : z.string().optional(),
                rememberMe : z.boolean().default(true),
            })
        )
        .mutation(async ({ input }) => {
            return await auth.api.signInEmail({
                asResponse: false,
                body: {
                    email: input.email,
                    password: input.password,
                    callbackURL : input.callbackURL,
                    rememberMe: input.rememberMe,
                },
            })
        }),
})
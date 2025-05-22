import { z } from 'zod'
// import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc' //publicProcedure, 
import { auth } from "@fm-apps/auth"
// UTILISER AUTH 

export const userRouter = router({
    signUpByMailAndPassword: publicProcedure
        .input(
            z.object({
                email : z.string(),
                password : z.string(),
                name: z.string()
            })
        )
        .mutation(async ({ input }) => {
            return await auth.api.signUpEmail({
                asResponse: true,
                body: {
                    email: input.email,
                    password: input.password,
                    name: input.name,
                },
            })
        })
})
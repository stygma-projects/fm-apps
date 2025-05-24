import { z } from 'zod'
import { publicProcedure, router } from '../../trpc'
import { auth } from "@fm-apps/auth"

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
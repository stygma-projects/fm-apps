import { router, publicProcedure } from '../index';
import { z } from 'zod';
import prisma from '../prisma';

export const userRouter = router({
    list: publicProcedure.query(() => {
        return prisma.user.findMany();
    }),
    create: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().min(2),
        lastName: z.string().min(2),
    })).mutation(async ({ input }) => {
        try {
            const {email, password, firstName, lastName} = input;
            return await prisma.user.create({
                data: {
                    email,
                    password,
                    firstName,
                    lastName,
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    })
});
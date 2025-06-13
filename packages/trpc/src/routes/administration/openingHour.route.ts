import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

export const openingHourRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.openingHour.findMany({})
  }),
  getById: publicProcedure
    .input(
        z.object({
            id: z.string(),
        }),
    )
    .query(async ({ input }) => {
        const { id } = input
        return await prisma.openingHour.findUnique({
            where: { id },
        })
    }),
})
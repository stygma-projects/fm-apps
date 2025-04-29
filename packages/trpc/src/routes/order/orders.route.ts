import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

export const ordersRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.order.findMany()
  }),
})

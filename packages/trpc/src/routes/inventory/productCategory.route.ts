import { router, publicProcedure } from '../../index'
import { z } from 'zod'
import prisma from '../../libs/prisma'

export const productCategoryRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.productCategory.findMany()
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input
      return await prisma.productCategory.findUnique({ where: { id } })
    }),
  create: publicProcedure
    .input(
      z.object({
        label: z.string().min(2),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.productCategory.create({
          data: input,
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        label: z.string().min(2).optional(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      try {
        return await prisma.productCategory.update({
          where: { id },
          data,
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.productCategory.delete({
          where: { id: input.id },
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    }),
})

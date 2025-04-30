import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

export const productRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.product.findMany({ include: { ingredients: true } }) // include: { ingredients : true }
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input
      return await prisma.product.findUnique({
        where: { id },
        include: { ingredients: true },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        label: z.string().min(2),
        priceExclTax: z.number().min(0),
        priceIncludingTax: z.number().min(0),
        imageUrl: z.string().optional().nullable(),
        available: z.boolean().default(true),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.product.create({
        data: input,
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        label: z.string().min(2).optional(),
        priceExclTax: z.number().min(0).optional(),
        priceIncludingTax: z.number().min(0).optional(),
        imageUrl: z.string().optional(),
        available: z.boolean().default(true).optional(),
        categoryId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      return await prisma.product.update({
        where: { id },
        data,
      })
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.product.delete({
        where: { id: input.id },
      })
    }),
  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return await prisma.product.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      })
    }),
})

import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

export const ingredientRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.ingredient.findMany({
      include: { category: true },
      orderBy: {
        label: 'asc',
      },
    })
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input
      return await prisma.ingredient.findUnique({
        where: { id },
        include: { category: true },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        label: z.string().min(2),
        priceExclTax: z.number().min(0),
        priceIncludingTax: z.number().min(0),
        imageUrl: z.string().optional().nullable(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { categoryId, ...ingredientData } = input

      if (await prisma.ingredient.findUnique({ where: { label: ingredientData.label } })) {
        throw new Error(`Ingredient ${ingredientData.label} already exists`)
      }

      return await prisma.ingredient.create({
        data: {
          ...ingredientData,
          category: { connect: { id: categoryId } },
        },
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        label: z.string().min(2),
        priceExclTax: z.number().min(0),
        priceIncludingTax: z.number().min(0),
        imageUrl: z.string().optional().nullable(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input

      if (await prisma.ingredient.findUnique({ where: { label: data.label } })) {
        throw new Error(`Ingredient ${data.label} already exists`)
      }

      return await prisma.ingredient.update({
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
      const { id } = input
      return await prisma.ingredient.delete({
        where: { id },
      })
    }),
  deleteMany: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      const { ids } = input

      const ingredient = await prisma.ingredient.deleteMany({
        where: {
          id: { in: ids },
        },
      })
      return { ingredient }
    }),
})

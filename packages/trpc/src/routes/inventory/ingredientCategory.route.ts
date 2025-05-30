import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

export const ingredientCategoryRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.ingredientCategory.findMany({
      orderBy: {
        label: 'asc',
      },
      include: {
        // Allow to know if there's an ingredient in the ingredientCategory
        ingredients: {
          select: { category: { select: { id: true }}}
        }
      }
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
      return await prisma.ingredientCategory.findUnique({ where: { id } })
    }),
  create: publicProcedure
    .input(
      z.object({
        label: z.string().min(2),
        imageUrl: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ input }) => {

      if (await prisma.ingredientCategory.findUnique({ where: { label: input.label } })) {
        throw new Error(`Ingredient category ${input.label} already exists`)
      }

      return await prisma.ingredientCategory.create({
        data: input,
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        label: z.string().min(2).optional(),
        imageUrl: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input

      if (await prisma.ingredientCategory.findUnique({ where: { label: data.label } })) {
        throw new Error(`Ingredient category ${data.label} already exists`)
      }

      return await prisma.ingredientCategory.update({
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
      return await prisma.ingredientCategory.delete({
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
      return await prisma.ingredientCategory.deleteMany({
        where: {
          id: { in: ids },
        },
      })
    }),
})

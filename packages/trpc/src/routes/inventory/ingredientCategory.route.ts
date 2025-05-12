import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

const isExistingCategoryLabel = (label: string) => {
  return !!prisma.ingredientCategory.findUnique({
    where: { label },
  })
}

export const ingredientCategoryRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.ingredientCategory.findMany({
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
      const existingCategoryLabel = isExistingCategoryLabel(input.label)
      if (existingCategoryLabel) {
        throw new Error('Une catégorie avec ce nom existe déjà')
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

      if (data.label) {
        const existingCategoryLabel = isExistingCategoryLabel(data.label)
        if (existingCategoryLabel) {
          throw new Error('Une catégorie avec ce nom existe déjà')
        }
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

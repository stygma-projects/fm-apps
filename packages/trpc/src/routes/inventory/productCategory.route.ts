import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

const isExistingCategoryLabel = (label: string) => {
  return !!prisma.productCategory.findUnique({
    where: { label },
  })
}

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
        imageUrl: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      const existingCategoryLabel = isExistingCategoryLabel(input.label)
      if (existingCategoryLabel) {
        throw new Error('Une catégorie avec ce nom existe déjà')
      }

      return await prisma.productCategory.create({
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

      return await prisma.productCategory.update({
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
      return await prisma.productCategory.delete({
        where: { id: input.id },
      })
    }),
  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return await prisma.productCategory.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      })
    }),
})

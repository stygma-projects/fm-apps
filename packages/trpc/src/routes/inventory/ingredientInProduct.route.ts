import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'
// import { IngredientComposition } from '@fm-apps/db'

export const ingredientInProductRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.ingredientInProduct.findMany()
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const id = input
    return await prisma.ingredientInProduct.findUnique({
      where: { id },
    })
  }),
  getByProductId: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.ingredientInProduct.findMany({
      where: {
        productId: input,
      },
    })
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.ingredientInProduct.delete({
      where: { id: input },
    })
  }),
  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return await prisma.ingredientInProduct.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      })
    }),
  deleteForProduct: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await prisma.ingredientInProduct.deleteMany({
        where: {
          productId: input,
        },
      })
    }),
  deleteForManyProduct: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return await prisma.ingredientInProduct.deleteMany({
        where: {
          productId: {
            in: input,
          },
        },
      })
    }),
  // update: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       ingredientId: z.string(),
  //       productId: z.string(),
  //       composition: z.enum(Object.values(IngredientComposition)),
  //       mandatory: z.boolean(),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const { id, ...data } = input
  //     return await prisma.ingredientInProduct.update({
  //       where: { id },
  //       data,
  //     })
  //   }),
})

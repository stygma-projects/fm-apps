import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'

export const productInOrderRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.productInOrder.findMany({
      orderBy: {
        orderId: 'asc',
      },
      include: {
        mandatory: true,
        optionalBase: true,
        extraIngredients: {
          include: { ingredient: true },
        },
        product: {
          include: {
            nonUpdatable: true,
            mandatory: true,
            optionalBase: true,
            extra: true,
          },
        },
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
      return await prisma.productInOrder.findUnique({
        where: { id },
        include: {
          mandatory: true,
          optionalBase: true,
          extraIngredients: {
            include: { ingredient: true },
          },
          product: {
            include: {
              nonUpdatable: true,
              mandatory: true,
              optionalBase: true,
              extra: true,
            },
          },
        },
      })
    }),
  getByOrderId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input
      return await prisma.productInOrder.findMany({
        where: { orderId: id },
        include: {
          mandatory: true,
          optionalBase: true,
          extraIngredients: {
            include: { ingredient: true },
          },
          product: {
            include: {
              nonUpdatable: true,
              mandatory: true,
              optionalBase: true,
              extra: true,
            },
          },
        },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        productId: z.string(),
        orderId: z.string(),
        mandatory: z.array(z.string()).default([]),
        optionalBase: z.array(z.string()).default([]),
        extra: z
          .array(
            z.object({
              ingredientId: z.string(),
              quantity: z.number().int().positive().default(1),
            }),
          )
          .default([]),
      }),
    )
    .mutation(async ({ input }) => {
      const { mandatory, optionalBase, extra, ...data } = input

      return await prisma.productInOrder.create({
        data: {
          ...data,
          mandatory: {
            connect: mandatory.map((id) => ({ id })),
          },
          optionalBase: {
            connect: optionalBase.map((id) => ({ id })),
          },
          extraIngredients: {
            create: extra.map((item) => ({
              ingredientId: item.ingredientId,
              quantity: item.quantity,
            })),
          },
        },
      })
    }),
  createMany: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          productId: z.string(),
          orderId: z.string(),
          mandatory: z.array(z.string()).default([]),
          optionalBase: z.array(z.string()).default([]),
          extra: z.array(z.string()).default([]),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        const results = []

        for (const item of input) {
          const { mandatory, optionalBase, extra, ...data } = item

          const created = await tx.productInOrder.create({
            data: {
              ...data,
              mandatory: {
                connect: mandatory.map((id) => ({ id })),
              },
              optionalBase: {
                connect: optionalBase.map((id) => ({ id })),
              },
              extraIngredients: {
                connect: extra.map((id) => ({ id })),
              },
            },
          })

          results.push(created)
        }

        return results
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        productId: z.string().optional(),
        orderId: z.string().optional(),
        mandatory: z.array(z.string()).default([]).optional(),
        optionalBase: z.array(z.string()).default([]).optional(),
        extra: z.array(z.string()).default([]).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, mandatory, optionalBase, extra, ...data } = input

      return await prisma.productInOrder.update({
        where: { id },
        data: {
          ...data,
          mandatory: mandatory
            ? {
                set: mandatory.map((id) => ({ id })),
              }
            : undefined,
          optionalBase: optionalBase
            ? {
                set: optionalBase.map((id) => ({ id })),
              }
            : undefined,
          extraIngredients: extra
            ? {
                set: extra.map((id) => ({ id })),
              }
            : undefined,
        },
      })
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.productInOrder.delete({
        where: { id: input.id },
      })
    }),
  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return await prisma.productInOrder.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      })
    }),
})

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
        extraIngredients: {
          include: { ingredient: true },
        },
        optionalBaseIngredient: {
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
          extraIngredients: {
            include: { ingredient: true },
          },
          optionalBaseIngredient: {
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
          extraIngredients: {
            include: { ingredient: true },
          },
          optionalBaseIngredient: {
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
        extra: z
          .array(
            z.object({
              ingredientId: z.string(),
              quantity: z.number().int().positive().default(1),
            }),
          )
          .default([]),
        optionalBase: z
          .array(
            z.object({
              ingredientId: z.string(),
              isSelected: z.boolean().default(true),
            }),
          )
          .default([]),
      }),
    )
    .mutation(async ({ input }) => {
      const { mandatory, extra, optionalBase, ...data } = input

      return await prisma.productInOrder.create({
        data: {
          ...data,
          mandatory: {
            connect: mandatory.map((id) => ({ id })),
          },
          extraIngredients: {
            create: extra.map((item) => ({
              ingredientId: item.ingredientId,
              quantity: item.quantity,
            })),
          },
          optionalBaseIngredient: {
            create: optionalBase.map((item) => ({
              ingredientId: item.ingredientId,
              isSelected: item.isSelected,
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
          extra: z
            .array(
              z.object({
                ingredientId: z.string(),
                quantity: z.number().int().positive().default(1),
              }),
            )
            .default([]),
          optionalBase: z
            .array(
              z.object({
                ingredientId: z.string(),
                isSelected: z.boolean().default(true),
              }),
            )
            .default([]),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        const results = []

        for (const item of input) {
          const { mandatory, extra, optionalBase, ...data } = item

          const created = await tx.productInOrder.create({
            data: {
              ...data,
              mandatory: {
                connect: mandatory.map((id) => ({ id })),
              },
              extraIngredients: {
                create: extra.map((extraItem) => ({
                  ingredientId: extraItem.ingredientId,
                  quantity: extraItem.quantity,
                })),
              },
              optionalBaseIngredient: {
                create: optionalBase.map((optionalItem) => ({
                  ingredientId: optionalItem.ingredientId,
                  isSelected: optionalItem.isSelected,
                })),
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
        mandatory: z.array(z.string()).optional(),
        extra: z
          .array(
            z.object({
              ingredientId: z.string(),
              quantity: z.number().int().positive().default(1),
            }),
          )
          .optional(),
        optionalBase: z
          .array(
            z.object({
              ingredientId: z.string(),
              isSelected: z.boolean(),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, mandatory, extra, optionalBase, ...data } = input

      return await prisma.productInOrder.update({
        where: { id },
        data: {
          ...data,
          mandatory: mandatory
            ? {
                set: mandatory.map((id) => ({ id })),
              }
            : undefined,
          extraIngredients: extra
            ? {
                deleteMany: {},
                create: extra.map((item) => ({
                  ingredientId: item.ingredientId,
                  quantity: item.quantity,
                })),
              }
            : undefined,
          optionalBaseIngredient: optionalBase
            ? {
                deleteMany: {},
                create: optionalBase.map((item) => ({
                  ingredientId: item.ingredientId,
                  isSelected: item.isSelected,
                })),
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

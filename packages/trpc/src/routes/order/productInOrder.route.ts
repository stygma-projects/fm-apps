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
        extra: true,
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
          extra: true,
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
          extra: true,
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
        extra: z.array(z.string()).default([]),
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
          extra: {
            connect: extra.map((id) => ({ id })),
          },
        },
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
          extra: extra
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

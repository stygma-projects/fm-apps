import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'
import { OrderType, OrderStatus, WithdrawalMethod } from '@fm-apps/db'

const orderTypeEnum = z.enum([
  ...(Object.values(OrderType) as [string, ...string[]]),
])
const statusEnum = z.enum([
  ...(Object.values(OrderStatus) as [string, ...string[]]),
])
const withdrawalMethodEnum = z.enum([
  ...(Object.values(WithdrawalMethod) as [string, ...string[]]),
])

export const ordersRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.order.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        products: {
          include: {
            mandatory : true,
            optionnalBase : true,
            extra : true,
          },
        },
      },
    })
  }),
  listInProgress: publicProcedure.query(async () => {
    return await prisma.order.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        status: OrderStatus.IN_PROGRESS,
      },
      include: {
        products: {
          include: {
            mandatory : true,
            optionnalBase : true,
            extra : true,
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
      return await prisma.order.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              mandatory : true,
              optionnalBase : true,
              extra : true,
            },
          },
        },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        orderId: z.number(),
        type: orderTypeEnum,
        status: statusEnum.default(statusEnum.enum.PENDING),
        withdrawalMethod: withdrawalMethodEnum,
        terminalId: z.number().optional(),
        price: z.number().min(0),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.order.create({
        data: {
          ...input,
          type: input.type as OrderType,
          status: input.status as OrderStatus,
          withdrawalMethod: input.withdrawalMethod as WithdrawalMethod,
        },
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        orderId: z.number(),
        type: orderTypeEnum,
        status: statusEnum,
        withdrawalMethod: withdrawalMethodEnum,
        terminalId: z.number().optional(),
        price: z.number().min(0),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input
      return await prisma.order.update({
        where: { id },
        data: {
          ...input,
          type: input.type as OrderType,
          status: input.status as OrderStatus,
          withdrawalMethod: input.withdrawalMethod as WithdrawalMethod,
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
      const { id } = input
      return await prisma.order.delete({
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
      return await prisma.order.deleteMany({
        where: {
          id: { in: ids },
        },
      })
    }),
})

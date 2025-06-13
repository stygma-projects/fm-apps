import { z } from 'zod'
import prisma from '../../libs/prisma'
import { publicProcedure, router } from '../../trpc'
import { Days } from '../../../../db/generated/client/index';

export const scheduleRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.schedule.findMany({
      include: {
        openingHours: true,
      },
      orderBy: {
        day: 'asc',
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
      return await prisma.schedule.findUnique({
        where: { id },
        include: {
          openingHours: true,
        },
      })
    }),
  getByDay: publicProcedure
    .input(
      z.object({
        day: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { day } = input
      return await prisma.schedule.findUnique({
        where: { 
            day: day as Days
        },
        include: {
          openingHours: true,
        },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        day: z.enum([Days.MONDAY, Days.TUESDAY]),
        openingHours: z.array(z.string()),
        opened: z.boolean().default(true),
      }),
    )
    .mutation(async ({ input }) => {
      const { openingHours, ...data } = input

      return await prisma.schedule.create({
        data: {
          ...data,
          openingHours: {
            connect: openingHours.map((id) => ({ id })),
          },
        },
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        label: z.string().min(2).optional(),
        priceExclTax: z.number().min(0).optional().nullable(),
        priceIncludingTax: z.number().min(0).optional().nullable(),
        imageUrl: z.string().nullable().optional(),
        available: z.boolean().default(true).optional(),
        categoryId: z.string().optional(),
        nonUpdatable: z.array(z.string()).optional(), // Liste des IDs d'ingrédients
        mandatory: z.array(z.string()).optional(),
        optionalBase: z.array(z.string()).optional(),
        extra: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, nonUpdatable, mandatory, optionalBase, extra, ...data } =
        input

      if (
        !(await prisma.product.findUnique({ where: { label: data.label } }))
      ) {
        throw new Error(`Product ${data.label} doesn't exist !`)
      }

      return await prisma.product.update({
        where: { id },
        data: {
          ...data,
          nonUpdatable: nonUpdatable
            ? {
                set: nonUpdatable.map((id) => ({ id })), // Remplace les relations existantes
              }
            : undefined,
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
      return await prisma.schedule.delete({
        where: { id: input.id },
      })
    }),

  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return await prisma.schedule.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      })
    }),
})

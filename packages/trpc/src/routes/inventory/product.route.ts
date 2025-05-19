import {z} from 'zod'
import prisma from '../../libs/prisma'
import {publicProcedure, router} from '../../trpc'

export const productRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.product.findMany({
      include: {
        category: true,
        mandatory: {
          include: {
            category: {
              select: {
                label: true
              }
            }
          }
        },
        optionalBase: true,
        extra: true,
      },
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
      return await prisma.product.findUnique({
        where: { id },
        include: {
          mandatory: true,
          optionalBase: true,
          extra: true,
        },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        label: z.string().min(2),
        priceExclTax: z.number().min(0),
        priceIncludingTax: z.number().min(0),
        imageUrl: z.string().optional().nullable(),
        available: z.boolean().default(true),
        categoryId: z.string(),
        mandatory: z.array(z.string()).default([]), // Liste des IDs d'ingrédients
        optionalBase: z.array(z.string()).default([]),
        extra: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ input }) => {

      if (await prisma.product.findUnique({ where: { label: input.label } })) {
        throw new Error(`Product ${input.label} already exists`)
      }

      const { mandatory, optionalBase, extra, ...data } = input

      return await prisma.product.create({
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
        label: z.string().min(2).optional(),
        priceExclTax: z.number().min(0).optional(),
        priceIncludingTax: z.number().min(0).optional(),
        imageUrl: z.string().nullable().optional(),
        available: z.boolean().default(true).optional(),
        categoryId: z.string().optional(),
        mandatory: z.array(z.string()).optional(), // Liste des IDs d'ingrédients
        optionalBase: z.array(z.string()).optional(),
        extra: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {

      const { id, mandatory, optionalBase, extra, ...data } = input

      if (!(await prisma.product.findUnique({ where: { label: data.label } }))) {
        throw new Error(`Product ${data.label} doesn't exist !`)
      }
      
      return await prisma.product.update({
        where: { id },
        data: {
          ...data,
          mandatory: mandatory
            ? {
                set: mandatory.map((id) => ({ id })), // Remplace les relations existantes
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
      return await prisma.product.delete({
        where: { id: input.id },
      })
    }),

  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return await prisma.product.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      })
    }),
})

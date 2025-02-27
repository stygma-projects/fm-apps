import { router, publicProcedure } from '../trpc';
import prisma from "../prisma";

export const productCategoryRouter = router({
    list: publicProcedure.query(() => {
       prisma.productCategory.findMany();
    }),

    create: publicProcedure.mutation((input: { name: string }) => {
        prisma.productCategory.create({
            data: {
                name: input.name,
            },
        });
    }),

    update: publicProcedure.mutation((input: { id: number, name: string }) => {
        prisma.productCategory.update({
            where: {
                id: input.id,
            },
            data: {
                name: input.name,
            },
        });
    }),

    delete: publicProcedure.mutation((input: { id: number }) => {
        prisma.productCategory.delete({
            where: {
                id: input.id,
            },
        });
    }),
});
import {publicProcedure, router} from '../trpc';
import prisma from "../prisma";

export const productCategoryRouter = router({
    list: publicProcedure.query(() => {
        return prisma.productCategory.findMany();
    }),
});
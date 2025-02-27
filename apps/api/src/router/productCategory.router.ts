import { router, publicProcedure } from '../trpc';

export const productCategoryRouter = router({
    list: publicProcedure.query(() => {
        // [..]
        return [];
    }),
});
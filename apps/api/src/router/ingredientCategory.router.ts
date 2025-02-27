import { router, publicProcedure } from '../trpc';

export const ingredientCategoryRouter = router({
    list: publicProcedure.query(() => {
        // [..]
        return [];
    }),
});
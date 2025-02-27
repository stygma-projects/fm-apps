import { router, publicProcedure } from '../trpc';

export const ingredientRouter = router({
    list: publicProcedure.query(() => {
        // [..]
        return [];
    }),
});
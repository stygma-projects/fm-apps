import { router, publicProcedure } from '../trpc';

export const productRouter = router({
    list: publicProcedure.query(() => {
        // [..]
        return [];
    }),
});
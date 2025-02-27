import { router, publicProcedure } from '../trpc';

export const orderRouter = router({
    list: publicProcedure.query(() => {
        // [..]
        return [];
    }),
});
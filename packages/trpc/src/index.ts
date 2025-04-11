import {userRouter} from "./routes/user.router";

import { initTRPC} from '@trpc/server';
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
    user: userRouter,
});

export type AppRouter = typeof appRouter;


import {productCategoryRouter} from "./routes/inventory/productCategory.route";

import { initTRPC} from '@trpc/server';
import * as trpcExpress from "@trpc/server/adapters/express";
import { ingredientCategoryRouter } from './routes/inventory/ingredientCategory.route';
import { inventoryRouter } from './routes/inventory/inventory.route';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
    ingredientCategory: ingredientCategoryRouter,
    productCategory: productCategoryRouter,
    inventory: inventoryRouter,
});

export type AppRouter = typeof appRouter;


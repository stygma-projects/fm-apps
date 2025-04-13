import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({})

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

import { inventoryRouter } from './routes/inventory/inventory.route'

export const appRouter = router({
  inventory: inventoryRouter,
})

export type AppRouter = typeof appRouter

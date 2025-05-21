import { router } from './trpc'
import { inventoryRouter } from './routes/inventory/inventory.route'
import { orderRouter } from './routes/order/order.route'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { apiRouter } from "./routes/api/api.route"

export const appRouter = router({
  inventory: inventoryRouter,
  order: orderRouter,
  api: apiRouter
})

export type AppRouter = typeof appRouter

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

export { createContext } from './trpc'

// Export types
export * from './types'

import { router } from './trpc'
import { inventoryRouter } from './routes/inventory/inventory.route'
import { orderRouter } from './routes/order/order.route'

export const appRouter = router({
  inventory: inventoryRouter,
  order: orderRouter,
})

export type AppRouter = typeof appRouter

export { createContext } from './trpc'

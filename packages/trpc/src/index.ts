import { router } from './trpc'
import { inventoryRouter } from './routes/inventory/inventory.route'

export const appRouter = router({
  inventory: inventoryRouter,
})

export type AppRouter = typeof appRouter

export { createContext } from './trpc'

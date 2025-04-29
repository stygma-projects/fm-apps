import { router } from '../../trpc'
import { ordersRouter } from './orders.route'

export const orderRouter = router({
  order: ordersRouter,
})

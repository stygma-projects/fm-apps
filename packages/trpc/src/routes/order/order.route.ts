import { router } from '../../trpc'
import { ordersRouter } from './orders.route'
import { productInOrderRouter } from './productInOrder.route'

export const orderRouter = router({
  orders: ordersRouter,
  productInOrder : productInOrderRouter,
})

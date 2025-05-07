import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { Order } from '@fm-apps/db'

export const useFetchOrder = () => {
  return useQuery('order', () => trpc.order.orders.list.query())
}

export const useUpdateOrder = () => {
  return useMutation((orderInput: Order) =>
    trpc.order.orders.update.mutate({
      id: orderInput.id,
      orderId: orderInput.orderId,
      type: orderInput.type,
      status: orderInput.status,
      withdrawalMethod: orderInput.withdrawalMethod,
      terminalId: orderInput.terminalId ?? undefined,
      price: orderInput.price,
    }),
  )
}

import { ref } from 'vue'
import { trpc } from '../api/trpc'
import type { Order } from '@fm-apps/db'
import { useQuery } from 'vue-query'

export const useFetchOrders = () => {
  const orders = ref<Order[]>([])
  const terminalOrders = ref<Order[]>([])
  const pickupOrders = ref<Order[]>([])
  const deliveryOrders = ref<Order[]>([])

  const { refetch } = useQuery(
    ['orders'],
    () => trpc.order.orders.list.query(),
    {
      onSuccess: (result: Order[]) => {
        const formattedOrders = result.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt),
        }))
        orders.value = formattedOrders

        // Update the filtered orders
        terminalOrders.value = orders.value
          .filter((o: Order) => o.type === 'TERMINALS')
          .slice(0, 4)

        pickupOrders.value = orders.value
          .filter((o: Order) => o.type === 'PICKUP')
          .slice(0, 4)

        deliveryOrders.value = orders.value
          .filter((o: Order) => o.type === 'DELIVERY')
          .slice(0, 4)
      },
    },
  )

  return { terminalOrders, pickupOrders, deliveryOrders, refetch }
}

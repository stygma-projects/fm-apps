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
    ['in-progress-orders'],
    () => trpc.order.orders.listInProgress.query(),
    {
      // Rafraîchit toutes les minutes
      refetchInterval: 60000,

      onSuccess: (result: Order[]) => {
        const formattedOrders = result.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt),
        }))

        // Mise à jour si les données ont changé
        if (JSON.stringify(orders.value) !== JSON.stringify(formattedOrders)) {
          orders.value = formattedOrders

          // Mise à jour des listes filtrées
          terminalOrders.value = formattedOrders
            .filter((o: Order) => o.type === 'TERMINALS')
            .slice(0, 6)

          pickupOrders.value = formattedOrders
            .filter((o: Order) => o.type === 'PICKUP')
            .slice(0, 6)

          deliveryOrders.value = formattedOrders
            .filter((o: Order) => o.type === 'DELIVERY')
            .slice(0, 6)
        }
      },
    },
  )

  return {
    terminalOrders,
    pickupOrders,
    deliveryOrders,
    refetch,
  }
}

import { ref, watch } from 'vue'
import { trpc } from '../api/trpc'
import type { Order } from '@fm-apps/db'
import { useQuery, } from '@tanstack/vue-query'

export const useFetchOrders = () => {
  const orders = ref<Order[]>([])
  const terminalOrders = ref<Order[]>([])
  const pickupOrders = ref<Order[]>([])
  const deliveryOrders = ref<Order[]>([])

  const { data, refetch } = useQuery({
    queryKey: ['in-progress-orders'],
    queryFn: () => trpc.order.orders.listInProgress.query(),
    refetchInterval: 60000,
  })

  watch(data, (result) => {
    if (!result) return
    const formattedOrders = result.map((order) => ({
      ...order,
      createdAt: new Date(order.createdAt),
    }))
    if (JSON.stringify(orders.value) !== JSON.stringify(formattedOrders)) {
      orders.value = formattedOrders
      terminalOrders.value = formattedOrders.filter((o) => o.type === 'TERMINALS').slice(0, 6)
      pickupOrders.value = formattedOrders.filter((o) => o.type === 'PICKUP').slice(0, 6)
      deliveryOrders.value = formattedOrders.filter((o) => o.type === 'DELIVERY').slice(0, 6)
    }
  }, { immediate: true })

  return {
    terminalOrders,
    pickupOrders,
    deliveryOrders,
    refetch,
    // isError,
    // error,
  }
}

    // onSuccess: (result: Order[]) => {
    //   const formattedOrders = result.map((order) => ({
    //     ...order,
    //     createdAt: new Date(order.createdAt),
    //   }))
    //   if (JSON.stringify(orders.value) !== JSON.stringify(formattedOrders)) {
    //     orders.value = formattedOrders
    //     terminalOrders.value = formattedOrders.filter((o) => o.type === 'TERMINALS').slice(0, 6)
    //     pickupOrders.value = formattedOrders.filter((o) => o.type === 'PICKUP').slice(0, 6)
    //     deliveryOrders.value = formattedOrders.filter((o) => o.type === 'DELIVERY').slice(0, 6)
    //   }
    // },
import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../api/trpc'
import type {
  ListOrderOutput,
  UpdateOrderInput,
  UpdateOrderOutput,
} from '@fm-apps/trpc'

enum OrderQueryKey {
  LIST = 'listOrders',
}

enum OrderMutationKey {
  UPDATE = 'updateOrder',
}


export const useFetchOrder = () => {
    return useQuery<ListOrderOutput, Error>({
    queryKey: [OrderQueryKey.LIST],
    queryFn: () => trpc.order.orders.list.query(),
  })
}

export const useUpdateOrder = () => {
  return useMutation<
    UpdateOrderOutput,
    Error,
    UpdateOrderInput
  >({
    mutationKey: [OrderMutationKey.UPDATE],
    mutationFn: (updateOrderInput) =>
      trpc.order.orders.update.mutate(updateOrderInput),
  })
}

// export const useUpdateOrder = () => {
//   return useMutation((orderInput: Order) =>
//     trpc.order.orders.update.mutate({
//       id: orderInput.id,
//       orderId: orderInput.orderId,
//       type: orderInput.type,
//       status: orderInput.status,
//       withdrawalMethod: orderInput.withdrawalMethod,
//       terminalId: orderInput.terminalId ?? undefined,
//       price: orderInput.price,
//     }),
//   )
// }
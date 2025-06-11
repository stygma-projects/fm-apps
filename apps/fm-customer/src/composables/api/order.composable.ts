import { useTrpcMutation } from '../utils/useTrpcMutation'
import type { CreateOrderInput, CreateOrderOutput } from '@fm-apps/trpc'

export const useCreateOrder = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcMutation<CreateOrderInput, CreateOrderOutput>(
    (input: CreateOrderInput) => $trpc.order.orders.create.mutate(input),
  )
}

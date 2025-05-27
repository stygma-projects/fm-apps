import type { ListProductOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useFetchAllProduct = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcQuery<ListProductOutput>('product', () =>
    $trpc.inventory.product.list.query(),
  )
}

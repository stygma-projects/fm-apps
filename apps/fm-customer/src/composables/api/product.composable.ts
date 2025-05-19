import type { ListProductOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useProduct = () => {
  const { $trpc } = useNuxtApp()
  
  const fetchAllProducts = useTrpcQuery<ListProductOutput>(
    'products',
    () => $trpc.inventory.product.list.query()
  )

  return {
    fetchAllProducts, 
  }
}
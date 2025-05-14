import type { GetByIdProductOutput, ListProductOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useProduct = (productId?: string) => {
  const { $trpc } = useNuxtApp()
  
  const fetchAllProducts = useTrpcQuery<ListProductOutput>(
    'products',
    () => $trpc.inventory.product.list.query()
  )

  const fetchProductById = useTrpcQuery<GetByIdProductOutput>(
    'product',
    () => productId ? $trpc.inventory.product.getById.query({ id: productId }) : Promise.resolve(null)
  )

  return {
    fetchAllProducts, 
    fetchProductById
  }
}
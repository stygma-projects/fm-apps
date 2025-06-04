import type { ListProductCategoryOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useProductCategory = () => {
  const { $trpc } = useNuxtApp()
  
  const fetchAllProductCategories = useTrpcQuery<ListProductCategoryOutput>(
    'productCategory',
    () => $trpc.inventory.productCategory.list.query()
  )

  return {
    fetchAllProductCategories
  }
}
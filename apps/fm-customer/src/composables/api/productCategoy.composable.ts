import type { ListProductCategoryOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useFetchAllProductCategories = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcQuery<ListProductCategoryOutput>('productCategory', () =>
    $trpc.inventory.productCategory.list.query(),
  )
}
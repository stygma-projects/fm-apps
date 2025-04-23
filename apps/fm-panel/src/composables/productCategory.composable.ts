import { useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { ProductCategory } from '@fm-apps/db'

export const useFetchProductCategories = () => {
  return useQuery('productCategories', () =>
    trpc.inventory.productCategory.list.query(),
  )
}

export const useUpdateProductCategories = (productModel : ProductCategory) => {
  return useQuery('productCategories', () =>
    trpc.inventory.productCategory.update.mutate(productModel),
  )
}
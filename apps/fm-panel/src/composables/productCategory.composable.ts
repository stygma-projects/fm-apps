import { useQuery } from 'vue-query'
import { trpc } from '../api/trpc'

export const useFetchProductCategories = () => {
  return useQuery('productCategories', () =>
    trpc.inventory.productCategory.list.query(),
  )
}

export const useFetchProductCategory = (id: string) => {
  return useQuery('productCategory', () =>
    trpc.inventory.productCategory.get.query(id),
  )
}

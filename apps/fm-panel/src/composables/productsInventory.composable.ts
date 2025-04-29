import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { Product } from '@fm-apps/db'

export const useFetchProducts = () => {
  return useQuery('fetchProducts', () => trpc.inventory.product.list.query())
}

export const useUpdateProduct = () => {
  return useMutation('updateProduct', (product: Product) =>
    trpc.inventory.productCategory.update.mutate(product),
  )
}

export const useDeleteProduct = () => {
  return useMutation('deleteProduct', (a: { id: string }) =>
    trpc.inventory.product.delete.mutate(a),
  )
}

export const useCreateProduct = () => {
  return useMutation(
    'createProduct',
    (a: {
      label: string
      priceExclTax: number
      priceIncludingTax: number
      categoryId: string
      imageUrl: string | null
      available: boolean
    }) => trpc.inventory.product.create.mutate(a),
  )
}

export const useDeleteManyProducts = () => {
  return useMutation('deleteManyProducts', (a: string[]) =>
    trpc.inventory.productCategory.deleteMany.mutate(a),
  )
}

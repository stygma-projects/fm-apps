import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { ProductCategory } from '@fm-apps/db'

export const useFetchProductCategories = () => {
  return useQuery('productCategories', () =>
    trpc.inventory.productCategory.list.query(),
  )
}

export const useUpdateProductCategory = () => {
  return useMutation(
    'updateProductCategories',
    (productCategory: ProductCategory) =>
      trpc.inventory.productCategory.update.mutate(productCategory),
  )
}

export const useDeleteProductCategory = () => {
  return useMutation('deleteProductCategory', (a: { id: string }) =>
    trpc.inventory.productCategory.delete.mutate(a),
  )
}

export const useCreateProductCategory = () => {
  return useMutation(
    'createProductCategory',
    (a: { label: string; imageUrl: string | null }) =>
      trpc.inventory.productCategory.create.mutate(a),
  )
}

export const useDeleteManyProductCategories = () => {
  return useMutation('deleteManyProductCategories', (a: string[]) =>
    trpc.inventory.productCategory.deleteMany.mutate(a),
  )
}

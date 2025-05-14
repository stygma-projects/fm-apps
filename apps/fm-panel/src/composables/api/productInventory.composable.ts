import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../../api/trpc'
import type {
    CreateProductInput,
    CreateProductOutput,
    DeleteManyProductInput,
    DeleteManyProductOutput,
    DeleteProductInput,
    DeleteProductOutput,
    ListProductOutput,
    UpdateProductInput,
    UpdateProductOutput,
} from '@fm-apps/trpc'

enum ProductQueryKey {
    LIST = 'listProducts',
}

enum ProductMutationKey {
    UPDATE = 'updateProduct',
    DELETE = 'deleteProduct',
    CREATE = 'createProduct',
    DELETE_MANY = 'deleteManyProducts',
}

export const useListProducts = () => {
  return useQuery<ListProductOutput, Error>({
    queryKey: [ProductQueryKey.LIST],
    queryFn: () => trpc.inventory.product.list.query(),
  })
}

export const useUpdateProduct = () => {
  return useMutation<
    UpdateProductOutput,
    Error,
    UpdateProductInput
  >({
    mutationKey: [ProductMutationKey.UPDATE],
    mutationFn: (updateProductInput) =>
      trpc.inventory.product.update.mutate(updateProductInput),
  })
}

export const useDeleteProduct = () => {
  return useMutation<
    DeleteProductOutput,
    Error,
    DeleteProductInput
  >({
    mutationKey: [ProductMutationKey.DELETE],
    mutationFn: (deleteProductInput) =>
      trpc.inventory.product.delete.mutate(deleteProductInput),
  })
}

export const useCreateProduct = () => {
  return useMutation<
    CreateProductOutput,
    Error,
    CreateProductInput
  >({
    mutationKey: [ProductMutationKey.CREATE],
    mutationFn: (createProductInput) =>
      trpc.inventory.product.create.mutate(createProductInput)
  })
}

export const useDeleteManyProducts = () => {
  return useMutation<
    DeleteManyProductOutput,
    Error,
    DeleteManyProductInput
  >({
    mutationKey: [ProductMutationKey.DELETE_MANY],
    mutationFn: (deleteManyProductInput) =>
      trpc.inventory.product.deleteMany.mutate(
        deleteManyProductInput,
      ),
  })
}
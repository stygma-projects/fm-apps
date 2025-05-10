import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../../api/trpc'
import type {
  CreateProductCategoryInput,
  CreateProductCategoryOutput,
  DeleteManyProductCategoryInput,
  DeleteManyProductCategoryOutput,
  DeleteProductCategoryInput,
  DeleteProductCategoryOutput,
  ListProductCategoryOutput,
  UpdateProductCategoryInput,
  UpdateProductCategoryOutput,
} from '@fm-apps/trpc'

enum ProductCategoryQueryKey {
  LIST = 'listProductCategories',
}

enum ProductCategoryMutationKey {
  UPDATE = 'updateProductCategory',
  DELETE = 'deleteProductCategory',
  CREATE = 'createProductCategory',
  DELETE_MANY = 'deleteManyProductCategories',
}

export const useListProductCategories = () => {
  return useQuery<ListProductCategoryOutput, Error>({
    queryKey: [ProductCategoryQueryKey.LIST],
    queryFn: () => trpc.inventory.productCategory.list.query(),
  })
}

export const useUpdateProductCategory = () => {
  return useMutation<
    UpdateProductCategoryOutput,
    Error,
    UpdateProductCategoryInput
  >({
    mutationKey: [ProductCategoryMutationKey.UPDATE],
    mutationFn: (updateProductCategoryInput) =>
      trpc.inventory.productCategory.update.mutate(updateProductCategoryInput),
  })
}

export const useDeleteProductCategory = () => {
  return useMutation<
    DeleteProductCategoryOutput,
    Error,
    DeleteProductCategoryInput
  >({
    mutationKey: [ProductCategoryMutationKey.DELETE],
    mutationFn: (deleteProductCategoryInput) =>
      trpc.inventory.productCategory.delete.mutate(deleteProductCategoryInput),
  })
}

export const useCreateProductCategory = () => {
  return useMutation<
    CreateProductCategoryOutput,
    Error,
    CreateProductCategoryInput
  >({
    mutationKey: [ProductCategoryMutationKey.CREATE],
    mutationFn: (createProductCategoryInput) =>
      trpc.inventory.productCategory.create.mutate(createProductCategoryInput),
  })
}

export const useDeleteManyProductCategories = () => {
  return useMutation<
    DeleteManyProductCategoryOutput,
    Error,
    DeleteManyProductCategoryInput
  >({
    mutationKey: [ProductCategoryMutationKey.DELETE_MANY],
    mutationFn: (deleteManyProductCategoriesInput) =>
      trpc.inventory.productCategory.deleteMany.mutate(
        deleteManyProductCategoriesInput,
      ),
  })
}

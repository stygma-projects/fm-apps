import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
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

export const useFetchProductCategories = () => {
  return useQuery<ListProductCategoryOutput, Error>('productCategories', () =>
    trpc.inventory.productCategory.list.query(),
  )
}

export const useUpdateProductCategory = () => {
  return useMutation<
    UpdateProductCategoryOutput,
    Error,
    UpdateProductCategoryInput
  >('updateProductCategories', (updateProductCategoryInput) =>
    trpc.inventory.productCategory.update.mutate(updateProductCategoryInput),
  )
}

export const useDeleteProductCategory = () => {
  return useMutation<
    DeleteProductCategoryOutput,
    Error,
    DeleteProductCategoryInput
  >('deleteProductCategory', (deleteProductCategoryInput) =>
    trpc.inventory.productCategory.delete.mutate(deleteProductCategoryInput),
  )
}

export const useCreateProductCategory = () => {
  return useMutation<
    CreateProductCategoryOutput,
    Error,
    CreateProductCategoryInput
  >('createProductCategory', (createProductCategoryInput) =>
    trpc.inventory.productCategory.create.mutate(createProductCategoryInput),
  )
}

export const useDeleteManyProductCategories = () => {
  return useMutation<
    DeleteManyProductCategoryOutput,
    Error,
    DeleteManyProductCategoryInput
  >('deleteManyProductCategories', (deleteManyProductCategoriesInput) =>
    trpc.inventory.productCategory.deleteMany.mutate(
      deleteManyProductCategoriesInput,
    ),
  )
}

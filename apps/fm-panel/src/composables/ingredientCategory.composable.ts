import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type {
  CreateIngredientCategoryInput,
  UpdateIngredientCategoryInput,
  DeleteIngredientCategoryInput,
  DeleteManyIngredientCategoryInput,
} from '@fm-apps/trpc'

export const useFetchIngredientCategories = () => {
  return useQuery('ingredientCategory', () =>
    trpc.inventory.ingredientCategory.list.query(),
  )
}
export const useUpdateIngredientCategory = () => {
  return useMutation(
    (updateIngredientCategoryInput: UpdateIngredientCategoryInput) =>
      trpc.inventory.ingredientCategory.update.mutate(
        updateIngredientCategoryInput,
      ),
  )
}
export const useCreateIngredientCategory = () => {
  return useMutation(
    (createIngredientCategoryInput: CreateIngredientCategoryInput) => {
      if (!createIngredientCategoryInput.label)
        throw new Error('Le label est requis')
      return trpc.inventory.ingredientCategory.create.mutate(
        createIngredientCategoryInput,
      )
    },
  )
}
export const useDeleteIngredientCategory = () => {
  return useMutation(
    (deleteIngredientCategoryInput: DeleteIngredientCategoryInput) =>
      trpc.inventory.ingredientCategory.delete.mutate(
        deleteIngredientCategoryInput,
      ),
  )
}
export const useDeleteManyIngredientCategory = () => {
  return useMutation(
    (deleteManyIngredientCategoryInput: DeleteManyIngredientCategoryInput) =>
      trpc.inventory.ingredientCategory.deleteMany.mutate(
        deleteManyIngredientCategoryInput,
      ),
  )
}

import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { IngredientCategory } from '@fm-apps/db'

export const useFetchIngredientCategories = () => {
  return useQuery('ingredientCategory', () =>
    trpc.inventory.ingredientCategory.list.query(),
  )
}
export const useUpdateIngredientCategory = () => {
  return useMutation((ingredientCategoryInput: IngredientCategory) =>
    trpc.inventory.ingredientCategory.update.mutate({
      id: ingredientCategoryInput.id,
      label: ingredientCategoryInput.label,
      imageUrl: ingredientCategoryInput.imageUrl,
    })
  )
}
export const useCreateIngredientCategory = () => {
  return useMutation((ingredientCategoryInput: IngredientCategory) => {
    if (!ingredientCategoryInput.label) throw new Error('Le label est requis')
    return trpc.inventory.ingredientCategory.create.mutate({
      label: ingredientCategoryInput.label,
      imageUrl: ingredientCategoryInput.imageUrl,
    })
  })
}
export const useDeleteIngredientCategory = () => {
  return useMutation((ingredientCategoryInput: IngredientCategory) =>
    trpc.inventory.ingredientCategory.delete.mutate(ingredientCategoryInput),
  )
}
export const useDeleteManyIngredientCategory = () => {
  return useMutation((ids: string[]) =>
    trpc.inventory.ingredientCategory.deleteMany.mutate({ ids }),
  )
}
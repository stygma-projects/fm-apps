import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { IngredientCategoryInput } from '../types/ingredientCategory.type'

export const useFetchIngredientCategories = () => {
  return useQuery('ingredientCategory', () =>
    trpc.inventory.ingredientCategory.list.query(),
  )
}
export const useUpdateIngredientCategory = () => {
  return useMutation((ingredientCategoryInput: IngredientCategoryInput) =>
    trpc.inventory.ingredientCategory.update.mutate({
      id: ingredientCategoryInput.id,
      label: ingredientCategoryInput.label,
      imageUrl: ingredientCategoryInput.imageUrl,
    }),
  )
}
export const useCreateIngredientCategory = () => {
  return useMutation((ingredientCategoryInput: IngredientCategoryInput) => {
    if (!ingredientCategoryInput.label) throw new Error('Le label est requis')
    return trpc.inventory.ingredientCategory.create.mutate({
      label: ingredientCategoryInput.label,
      imageUrl: ingredientCategoryInput.imageUrl,
    })
  })
}
export const useDeleteIngredientCategory = () => {
  return useMutation((ingredientCategoryId: string) =>
    trpc.inventory.ingredientCategory.delete.mutate({
      id: ingredientCategoryId,
    }),
  )
}
export const useDeleteManyIngredientCategory = () => {
  return useMutation((ids: string[]) =>
    trpc.inventory.ingredientCategory.deleteMany.mutate({ ids }),
  )
}

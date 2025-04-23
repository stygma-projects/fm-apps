import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { IngredientCategoryInput } from '../types/ingredientCategory.type'

export const useFetchIngredientCategories = () => {
  return useQuery('ingredientCategory', () =>
    trpc.inventory.ingredientCategory.list.query(),
  )
}
export const useUpdateIngredientCategory = () => {
  return useMutation((data: IngredientCategoryInput) =>
    trpc.inventory.ingredientCategory.update.mutate(data),
  )
}
export const useDeleteIngredientCategory = () => {
  return useMutation((data: IngredientCategoryInput) =>
    trpc.inventory.ingredientCategory.delete.mutate(data),
  )
}
export const useCreateIngredientCategory = () => {
  return useMutation((data: IngredientCategoryInput) =>{
    if (!data.label) throw new Error("Le label est requis");
    return trpc.inventory.ingredientCategory.create.mutate({
      label: data.label,
      imageUrl: data.imageUrl
    })
  })
}
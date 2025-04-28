import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { Ingredient } from '@fm-apps/db/src'

export const useFetchIngredient = () => {
  return useQuery('ingredient', () => trpc.inventory.ingredient.list.query())
}
export const useUpdateIngredient = () => {
  return useMutation((ingredientInput: Ingredient) =>
    trpc.inventory.ingredient.update.mutate({
      id: ingredientInput.id,
      label: ingredientInput.label,
      priceExclTax: parseFloat(
        ingredientInput.priceExclTax as unknown as string,
      ),
      priceIncludingTax: parseFloat(
        ingredientInput.priceIncludingTax as unknown as string,
      ),
      imageUrl: ingredientInput.imageUrl,
      categoryId: ingredientInput.categoryId,
    }),
  )
}
export const useCreateIngredient = () => {
  return useMutation((ingredientInput: Ingredient) => {
    if (!ingredientInput.label) throw new Error('Le label est requis')
    return trpc.inventory.ingredient.create.mutate({
      label: ingredientInput.label,
      priceExclTax: parseFloat(
        ingredientInput.priceExclTax as unknown as string,
      ),
      priceIncludingTax: parseFloat(
        ingredientInput.priceIncludingTax as unknown as string,
      ),
      imageUrl: ingredientInput.imageUrl,
      categoryId: ingredientInput.categoryId,
    })
  })
}
export const useDeleteIngredient = () => {
  return useMutation((ingredientId: string) =>
    trpc.inventory.ingredient.delete.mutate({
      id: ingredientId,
    }),
  )
}
export const useDeleteManyIngredient = () => {
  return useMutation((ids: string[]) =>
    trpc.inventory.ingredient.deleteMany.mutate({ ids }),
  )
}

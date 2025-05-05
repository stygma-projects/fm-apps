import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type {
  CreateIngredientInput,
  DeleteIngredientInput,
  DeleteManyIngredientInput,
  UpdateIngredientInput,
} from '@fm-apps/trpc'

export const useFetchIngredient = () => {
  return useQuery('ingredient', () => trpc.inventory.ingredient.list.query())
}
export const useUpdateIngredient = () => {
  return useMutation((updateIngredientInput: UpdateIngredientInput) =>
    trpc.inventory.ingredient.update.mutate(updateIngredientInput),
  )
}
export const useCreateIngredient = () => {
  return useMutation((createIngredientInput: CreateIngredientInput) => {
    return trpc.inventory.ingredient.create.mutate(createIngredientInput)
  })
}
export const useDeleteIngredient = () => {
  return useMutation((deleteIngredientInput: DeleteIngredientInput) =>
    trpc.inventory.ingredient.delete.mutate(deleteIngredientInput),
  )
}
export const useDeleteManyIngredient = () => {
  return useMutation((deleteManyIngredientInput: DeleteManyIngredientInput) =>
    trpc.inventory.ingredient.deleteMany.mutate(deleteManyIngredientInput),
  )
}

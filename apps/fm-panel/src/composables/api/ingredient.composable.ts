import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../../api/trpc'
import type {
  CreateIngredientInput,
  CreateIngredientOutput,
  DeleteIngredientInput,
  DeleteIngredientOutput,
  DeleteManyIngredientInput,
  DeleteManyIngredientOutput,
  ListIngredientOutput,
  UpdateIngredientInput,
  UpdateIngredientOutput,
} from '@fm-apps/trpc'

enum IngredientQueryKey {
  LIST = 'listIngredients',
}

enum IngredientMutationKey {
  UPDATE = 'updateIngredient',
  DELETE = 'deleteIngredient',
  CREATE = 'createIngredient',
  DELETE_MANY = 'deleteManyIngredients',
}

export const useFetchIngredient = () => {
  return useQuery<ListIngredientOutput, Error>({
    queryKey: [IngredientQueryKey.LIST],
    queryFn: () => trpc.inventory.ingredient.list.query(),
  })
}

export const useUpdateIngredient = () => {
  return useMutation<UpdateIngredientOutput, Error, UpdateIngredientInput>({
    mutationKey: [IngredientMutationKey.UPDATE],
    mutationFn: (updateIngredientInput) =>
      trpc.inventory.ingredient.update.mutate(updateIngredientInput),
  })
}

export const useCreateIngredient = () => {
  return useMutation<CreateIngredientOutput, Error, CreateIngredientInput>({
    mutationKey: [IngredientMutationKey.CREATE],
    mutationFn: (createIngredientInput) =>
      trpc.inventory.ingredient.create.mutate(createIngredientInput),
  })
}

export const useDeleteIngredient = () => {
  return useMutation<DeleteIngredientOutput, Error, DeleteIngredientInput>({
    mutationKey: [IngredientMutationKey.DELETE],
    mutationFn: (deleteIngredientInput) =>
      trpc.inventory.ingredient.delete.mutate(deleteIngredientInput),
  })
}

export const useDeleteManyIngredient = () => {
  return useMutation<
    DeleteManyIngredientOutput,
    Error,
    DeleteManyIngredientInput
  >({
    mutationKey: [IngredientMutationKey.DELETE_MANY],
    mutationFn: (deleteManyIngredientInput) =>
      trpc.inventory.ingredient.deleteMany.mutate(deleteManyIngredientInput),
  })
}

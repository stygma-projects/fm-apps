import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../../api/trpc'
import type {
  CreateIngredientCategoryInput,
  CreateIngredientCategoryOutput,
  UpdateIngredientCategoryInput,
  UpdateIngredientCategoryOutput,
  DeleteIngredientCategoryInput,
  DeleteIngredientCategoryOutput,
  DeleteManyIngredientCategoryInput,
  DeleteManyIngredientCategoryOutput,
  ListIngredientCategoryOutput,
} from '@fm-apps/trpc'

enum IngredientCategoryQueryKey {
  LIST = 'listIngredientCategories',
}

enum IngredientCategoryMutationKey {
  UPDATE = 'updateIngredientCategory',
  DELETE = 'deleteIngredientCategory',
  CREATE = 'createIngredientCategory',
  DELETE_MANY = 'deleteManyIngredientCategories',
}

export const useFetchIngredientCategories = () => {
  return useQuery<ListIngredientCategoryOutput, Error>({
    queryKey: [IngredientCategoryQueryKey.LIST],
    queryFn: () => trpc.inventory.ingredientCategory.list.query(),
  })
}

export const useUpdateIngredientCategory = () => {
  return useMutation<
    UpdateIngredientCategoryOutput,
    Error,
    UpdateIngredientCategoryInput
  >({
    mutationKey: [IngredientCategoryMutationKey.UPDATE],
    mutationFn: (updateIngredientCategoryInput) =>
      trpc.inventory.ingredientCategory.update.mutate(
        updateIngredientCategoryInput,
      ),
  })
}

export const useCreateIngredientCategory = () => {
  return useMutation<
    CreateIngredientCategoryOutput,
    Error,
    CreateIngredientCategoryInput
  >({
    mutationKey: [IngredientCategoryMutationKey.CREATE],
    mutationFn: (createIngredientCategoryInput) => {
      if (!createIngredientCategoryInput.label)
        throw new Error('Le label est requis')
      return trpc.inventory.ingredientCategory.create.mutate(
        createIngredientCategoryInput,
      )
    },
  })
}

export const useDeleteIngredientCategory = () => {
  return useMutation<
    DeleteIngredientCategoryOutput,
    Error,
    DeleteIngredientCategoryInput
  >({
    mutationKey: [IngredientCategoryMutationKey.DELETE],
    mutationFn: (deleteIngredientCategoryInput) =>
      trpc.inventory.ingredientCategory.delete.mutate(
        deleteIngredientCategoryInput,
      ),
  })
}

export const useDeleteManyIngredientCategory = () => {
  return useMutation<
    DeleteManyIngredientCategoryOutput,
    Error,
    DeleteManyIngredientCategoryInput
  >({
    mutationKey: [IngredientCategoryMutationKey.DELETE_MANY],
    mutationFn: (deleteManyIngredientCategoryInput) =>
      trpc.inventory.ingredientCategory.deleteMany.mutate(
        deleteManyIngredientCategoryInput,
      ),
  })
}

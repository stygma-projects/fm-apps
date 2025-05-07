import { useQuery, useMutation } from 'vue-query'
import { trpc } from '../api/trpc'
import type { IngredientInProduct } from '../../../../packages/db/generated/client'
// import type { IngredientInProduct } from '@fm-apps/db'
// import { useFetchIngredient } from './ingredient.composable';

export const useFetchIngredientInProduct = () => {
  return useQuery('fetchIngredientInProduct', () =>
    trpc.inventory.ingredientInProduct.list.query(),
  )
}

// export const useFetchIngredientInProductByProductId = (id: string) => {
//   return useQuery(
//       ['fetchIngredientInProductByProductId', id], // Clé de cache dynamique
//       () => trpc.inventory.ingredientInProduct.getByProductId.query(id), // Fonction de récupération
//       {
//           enabled: !!id, // Active la requête uniquement si `id` est défini
//       }
//   )
// }

export const useDeleteIngredientInProduct = () => {
  return useMutation('deleteIngredientInProduct', (id: string) =>
    trpc.inventory.ingredientInProduct.delete.mutate(id),
  )
}

export const useDeleteManyProducts = () => {
  return useMutation('deleteManyIngredientInProduct', (id: string[]) =>
    trpc.inventory.ingredientInProduct.deleteMany.mutate(id),
  )
}

export const useDeleteIngredientInProductForProduct = () => {
  return useMutation(
    'deleteIngredientInProductForProduct',
    (productId: string) =>
      trpc.inventory.ingredientInProduct.deleteForProduct.mutate(productId),
  )
}

export const useUpdateIngredientInProduct = () => {
  return useMutation('updateProduct', (value: IngredientInProduct) => {
    return trpc.inventory.productCategory.update.mutate(value)
  })
}

export const useDeleteIngredientInProductForManyProduct = () => {
  return useMutation(
    'deleteIngredientInProductForProduct',
    (productIds: string[]) => {
      // console.log('productIds', productIds)
      return trpc.inventory.ingredientInProduct.deleteForManyProduct.mutate(
        productIds,
      )
    },
  )
}

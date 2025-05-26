import type { ListIngredientOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useFetchAllIngredient = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcQuery<ListIngredientOutput>('ingredient', () =>
    $trpc.inventory.ingredient.list.query(),
  )
}
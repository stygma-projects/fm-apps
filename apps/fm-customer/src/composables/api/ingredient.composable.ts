import type { ListIngredientOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useIngredients = () => {
  const { $trpc } = useNuxtApp()
  
  return useTrpcQuery<ListIngredientOutput>(
    'ingredients',
    () => $trpc.inventory.ingredient.list.query()
  )
}
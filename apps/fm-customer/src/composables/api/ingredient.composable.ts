import type { ListIngredientOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useIngredients = () => {
  const { $trpc } = useNuxtApp()
  
  const fetchAllIngredient = useTrpcQuery<ListIngredientOutput>(
    'ingredients',
    () => $trpc.inventory.ingredient.list.query()
  )

  return {
    fetchAllIngredient
  }
}
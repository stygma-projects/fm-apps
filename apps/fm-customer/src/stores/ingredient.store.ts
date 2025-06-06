import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetchAllIngredient } from '~/composables/api/ingredient.composable'
import type { ListIngredientOutput } from '@fm-apps/trpc'

export const useIngredientStore = defineStore('ingredient', () => {
  const allIngredients = ref<ListIngredientOutput>([])
  const filteredIngredients = ref<ListIngredientOutput>([])
  const isLoaded = ref(false) // Already in store?

  const fetchAllIngredients = async () => {
    if (isLoaded.value) return // Load only one time

    const fetchAllIngredient = useFetchAllIngredient()
    await fetchAllIngredient.refresh?.()

    allIngredients.value = fetchAllIngredient.data.value || []
    isLoaded.value = true
  }

  const filterByCategories = (categoryIds: string[]) => {
    filteredIngredients.value = allIngredients.value.filter((ingredient) =>
      categoryIds.includes(ingredient.categoryId),
    )
  }

  return {
    ingredients: filteredIngredients,
    allIngredients,
    isLoaded,
    fetchAllIngredients,
    filterByCategories,
  }
})

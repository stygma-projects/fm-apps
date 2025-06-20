<template>
  <div>
    <Card
      :items="ing"
      :grid="false"
      :selected-items="selectedIngredients"
      class="grid flex-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      @item-click="selectIngredient"
      cy="ingredient-stepper-card"
    />
  </div>
</template>

<script setup lang="ts">
import type { StepperItem } from '~/types/stepper.type'
import Card from '~/components/ui/card.component.vue'
import type { Ingredient } from '@fm-apps/db'

const ingredientStore = useIngredientStore()

const props = defineProps<{
  item: StepperItem
  mandatoryIndex: number
  isLast: boolean
  selections: Ingredient[]
}>()

const selectedIngredients = ref<Ingredient[]>([])
const isUpdatingFromProps = ref(false)

const ing = computed(() => {
  const mandatory = props.item.mandatory
  if (!mandatory || !mandatory[props.mandatoryIndex]) {
    return []
  }

  const categoryId = mandatory[props.mandatoryIndex].id
  return ingredientStore.ingredients.filter(
    (ingredient: Ingredient) => ingredient.categoryId === categoryId,
  )
})

watch(
  () => props.selections,
  async (newSelections: any) => {
    isUpdatingFromProps.value = true
    selectedIngredients.value = [...newSelections]
    await nextTick()
    isUpdatingFromProps.value = false
  },
  { immediate: true },
)

watch(
  selectedIngredients,
  (newSelection: any) => {
    if (!isUpdatingFromProps.value) {
      emit('update-selection', newSelection)
    }
  },
  { deep: true },
)

const selectIngredient = (ingredient: Ingredient) => {
  selectedIngredients.value = [ingredient]
}

const emit = defineEmits<{
  (e: 'update-selection', selection: Ingredient[]): void
}>()
</script>

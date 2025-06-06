<template>
  <div>
    <Card
      v-if="stepperType === 'mandatory'"
      :items="ing"
      :grid="false"
      :selected-items="selectedIngredients"
      class="grid flex-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      @item-click="selectIngredient"
      cy="ingredient-stepper-card"
    />

    <div v-else>
      <!-- <PrimeImage
        src="https://i1.sndcdn.com/artworks-000495235233-01s3nv-t500x500.jpg"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepperItem, StepperType } from '~/types/stepper.type'
import Card from '~/components/ui/card.component.vue'
import type { Ingredient } from '@fm-apps/db'

const ingredientStore = useIngredientStore()

const props = defineProps<{
  item: StepperItem
  mandatoryIndex: number
  isLast: boolean
  selections: Ingredient[]
  stepperType?: StepperType
}>()

const selectedIngredients = ref<Ingredient[]>([])
const isUpdatingFromProps = ref(false)

const ing = computed(() => {
  if (props.stepperType === 'mandatory') {
    const mandatory = props.item.mandatory
    if (!mandatory || !mandatory[props.mandatoryIndex]) {
      return []
    }

    const categoryId = mandatory[props.mandatoryIndex].id
    return ingredientStore.ingredients.filter(
      (ingredient: Ingredient) => ingredient.categoryId === categoryId,
    )
  } else if (props.stepperType === 'extra') {
    return props.item.extra || []
  } else if (props.stepperType === 'optionalBase') {
    return props.item.optionalBase || []
  }

  return []
})

const stepperType = computed(() => props.stepperType || 'mandatory')

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
  if (stepperType.value === 'mandatory') {
    selectedIngredients.value = [ingredient]
  } else {
    const index = selectedIngredients.value.findIndex(
      (item) => item.id === ingredient.id,
    )
    if (index > -1) {
      selectedIngredients.value.splice(index, 1)
    } else {
      selectedIngredients.value.push(ingredient)
    }
  }
}

const emit = defineEmits<{
  (e: 'update-selection', selection: Ingredient[]): void
}>()
</script>

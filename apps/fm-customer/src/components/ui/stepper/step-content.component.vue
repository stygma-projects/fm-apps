<template>
  <div>
    <!-- Interface pour mandatory (unchanged) -->
    <Card
      v-if="stepperType === 'mandatory'"
      :items="ing"
      :grid="false"
      :selected-items="selectedIngredients"
      class="grid flex-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      @item-click="selectIngredient"
      cy="ingredient-stepper-card"
    />

    <div
      v-else-if="stepperType === 'extra' || stepperType === 'optionalBase'"
      class="space-y-4"
    >
      <div
        v-for="ingredient in ing"
        :key="ingredient.id"
        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
      >
        <div class="flex items-center space-x-3 flex-grow">
          <img
            v-if="ingredient.imageUrl"
            :src="ingredient.imageUrl"
            class="w-12 h-12 rounded-lg object-cover"
          />
          <div class="flex-grow">
            <h3 class="font-medium text-gray-900">{{ ingredient.label }}</h3>
            <div
              v-if="ingredient.price && ingredient.price > 0"
              class="text-sm font-medium text-primary-600 space-x-2"
            >
              <span>+{{ ingredient.price.toFixed(2) }}</span>
              <span
                v-if="getIngredientQuantity(ingredient.id) > 0"
                class="text-green-600 font-semibold"
              >
                (Total:
                {{
                  (
                    ingredient.price * getIngredientQuantity(ingredient.id)
                  ).toFixed(2)
                }})
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <PrimeButton
            :disabled="getIngredientQuantity(ingredient.id) === 0"
            severity="secondary"
            size="small"
            icon="pi pi-minus"
            @click="decreaseQuantity(ingredient)"
            class="w-8 h-8 p-0"
            data-cy="decrease-ingredient-button"
          />

          <span
            class="w-8 text-center font-medium text-lg"
            data-cy="ingredient-quantity"
          >
            {{ getIngredientQuantity(ingredient.id) }}
          </span>

          <PrimeButton
            :disabled="hasMaxQuantity(ingredient.id)"
            size="small"
            icon="pi pi-plus"
            @click="increaseQuantity(ingredient)"
            class="w-8 h-8 p-0"
            data-cy="increase-ingredient-button"
          />
        </div>
      </div>

      <div
        v-if="totalSelectedPrice > 0"
        class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
      >
        <div class="flex justify-between items-center">
          <span class="font-medium text-green-800"
            >{{ totalSectionName }} :</span
          >
          <span class="font-bold text-green-800 text-lg">
            {{ totalSelectedPrice.toFixed(2) }}
          </span>
        </div>
      </div>
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
  maxQuantityPerIngredient?: number
}>()

const maxQuantity = computed(() => props.maxQuantityPerIngredient || 10)

const selectedIngredients = ref<Ingredient[]>([])
const ingredientQuantities = ref<Record<string, number>>({})
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

const totalSelectedPrice = computed(() => {
  let total = 0
  Object.entries(ingredientQuantities.value).forEach(
    ([ingredientId, quantity]) => {
      if (quantity > 0) {
        const ingredient = ing.value.find((i) => i.id === ingredientId)
        if (ingredient && ingredient.price) {
          total += ingredient.price * quantity
        }
      }
    },
  )
  return total
})

// Nom dynamique selon le type
const totalSectionName = computed(() => {
  switch (stepperType.value) {
    case 'extra':
      return 'Total des suppléments'
    case 'optionalBase':
      return 'Total des bases optionnelles'
    default:
      return 'Total sélectionné'
  }
})

const getIngredientQuantity = (ingredientId: string): number => {
  return ingredientQuantities.value[ingredientId] || 0
}

const hasMaxQuantity = (ingredientId: string): boolean => {
  return getIngredientQuantity(ingredientId) >= maxQuantity.value
}

const increaseQuantity = (ingredient: Ingredient) => {
  const currentQuantity = getIngredientQuantity(ingredient.id)
  if (currentQuantity < maxQuantity.value) {
    ingredientQuantities.value[ingredient.id] = currentQuantity + 1
    updateSelectedIngredientsFromQuantities()
  }
}

const decreaseQuantity = (ingredient: Ingredient) => {
  const currentQuantity = getIngredientQuantity(ingredient.id)
  if (currentQuantity > 0) {
    ingredientQuantities.value[ingredient.id] = currentQuantity - 1
    updateSelectedIngredientsFromQuantities()
  }
}

const updateSelectedIngredientsFromQuantities = () => {
  const newSelection: Ingredient[] = []

  Object.entries(ingredientQuantities.value).forEach(
    ([ingredientId, quantity]) => {
      if (quantity > 0) {
        const ingredient = ing.value.find((i) => i.id === ingredientId)
        if (ingredient) {
          for (let i = 0; i < quantity; i++) {
            newSelection.push(ingredient)
          }
        }
      }
    },
  )

  selectedIngredients.value = newSelection
}

const updateQuantitiesFromSelections = (selections: Ingredient[]) => {
  // Reset quantities
  ingredientQuantities.value = {}

  // Count occurrences of each ingredient
  selections.forEach((ingredient) => {
    ingredientQuantities.value[ingredient.id] =
      (ingredientQuantities.value[ingredient.id] || 0) + 1
  })
}

watch(
  () => props.selections,
  async (newSelections: Ingredient[]) => {
    isUpdatingFromProps.value = true
    selectedIngredients.value = [...newSelections]

    if (stepperType.value === 'extra' || stepperType.value === 'optionalBase') {
      updateQuantitiesFromSelections(newSelections)
    }

    await nextTick()
    isUpdatingFromProps.value = false
  },
  { immediate: true },
)

watch(
  selectedIngredients,
  (newSelection: Ingredient[]) => {
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

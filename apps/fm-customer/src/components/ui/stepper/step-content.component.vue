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
          <Button
            size="small"
            icon="pi pi-minus"
            :disabled="
              stepperType === 'optionalBase'
                ? false
                : getIngredientQuantity(ingredient.id) === 0
            "
            :severity="Severity.SECONDARY"
            @click="decreaseQuantity(ingredient)"
            data-cy="decrease-ingredient-button"
          />

          <span
            class="w-8 text-center font-medium text-lg"
            data-cy="ingredient-quantity"
          >
            {{ getIngredientQuantity(ingredient.id) }}
          </span>

          <Button
            v-if="stepperType === 'extra'"
            size="small"
            icon="pi pi-plus"
            :severity="Severity.WARNING"
            :disabled="hasMaxQuantity(ingredient.id)"
            @click="increaseQuantity(ingredient)"
            data-cy="increase-ingredient-button"
          />
          <div v-else class="w-8"></div>
        </div>
      </div>

      <div
        v-if="totalSelectedPrice > 0 && stepperType === 'extra'"
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
import { Severity } from '~/types/primevue.type'
import Button from '~/components/ui/button.component.vue'
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
const ingredientQuantities = ref<Record<string, number | boolean>>({})
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
      const qty = getSafeQuantity(quantity)
      if (qty > 0) {
        const ingredient = ing.value.find((i) => i.id === ingredientId)
        if (ingredient?.price) {
          total += ingredient.price * qty
        }
      }
    },
  )
  return total
})

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
  const quantity = ingredientQuantities.value[ingredientId]
  if (stepperType.value === 'optionalBase') {
    return quantity === false ? 1 : 0
  }
  return typeof quantity === 'number' ? quantity : 0
}

const getSafeQuantity = (quantity: number | boolean | undefined): number => {
  if (quantity === undefined) return 0
  return typeof quantity === 'boolean' ? (quantity ? 1 : 0) : quantity
}

const hasMaxQuantity = (ingredientId: string): boolean => {
  const currentQty = getSafeQuantity(ingredientQuantities.value[ingredientId])
  return currentQty >= maxQuantity.value
}

const increaseQuantity = (ingredient: Ingredient) => {
  if (stepperType.value !== 'extra') return

  const currentQuantity = getIngredientQuantity(ingredient.id)
  if (currentQuantity < maxQuantity.value) {
    ingredientQuantities.value[ingredient.id] = currentQuantity + 1
    updateSelectedIngredientsFromQuantities()
  }
}

const decreaseQuantity = (ingredient: Ingredient) => {
  if (stepperType.value === 'optionalBase') {
    ingredientQuantities.value = {
      ...ingredientQuantities.value,
      [ingredient.id]: true,
    }
    updateSelectedIngredientsFromQuantities()
  } else if (stepperType.value === 'extra') {
    const currentQty = getSafeQuantity(
      ingredientQuantities.value[ingredient.id],
    )
    if (currentQty > 0) {
      ingredientQuantities.value = {
        ...ingredientQuantities.value,
        [ingredient.id]: currentQty - 1,
      }
      updateSelectedIngredientsFromQuantities()
    }
  }
}

const updateSelectedIngredientsFromQuantities = () => {
  const newSelection: Ingredient[] = []

  if (stepperType.value === 'optionalBase') {
    ing.value.forEach((ingredient) => {
      if (ingredientQuantities.value[ingredient.id] === true) {
        newSelection.push(ingredient)
      }
    })
  } else {
    Object.entries(ingredientQuantities.value).forEach(
      ([ingredientId, quantity]) => {
        const ingredient = ing.value.find((i) => i.id === ingredientId)
        if (!ingredient) return

        const qty = typeof quantity === 'number' ? quantity : 0
        for (let i = 0; i < qty; i++) {
          newSelection.push(ingredient)
        }
      },
    )
  }

  selectedIngredients.value = newSelection
}

const updateQuantitiesFromSelections = (selections: Ingredient[]) => {
  if (stepperType.value === 'optionalBase') {
    const newQuantities = { ...ingredientQuantities.value }
    ing.value.forEach((ingredient) => {
      newQuantities[ingredient.id] = selections.some(
        (s) => s.id === ingredient.id,
      )
    })
    ingredientQuantities.value = newQuantities
  } else {
    ingredientQuantities.value = {}
    selections.forEach((ingredient) => {
      const currentQty = getSafeQuantity(
        ingredientQuantities.value[ingredient.id],
      )
      ingredientQuantities.value[ingredient.id] = currentQty + 1
    })
  }
}

const initializeOptionalBase = () => {
  if (stepperType.value === 'optionalBase') {
    const newQuantities = { ...ingredientQuantities.value }
    let hasChanges = false

    ing.value.forEach((ingredient) => {
      if (!(ingredient.id in newQuantities)) {
        newQuantities[ingredient.id] = false
        hasChanges = true
      }
    })

    if (hasChanges) {
      ingredientQuantities.value = newQuantities
      updateSelectedIngredientsFromQuantities()
    }
  }
}

const selectIngredient = (ingredient: Ingredient) => {
  if (stepperType.value === 'mandatory') {
    selectedIngredients.value = [ingredient]
  } else if (stepperType.value === 'optionalBase') {
    const currentValue = ingredientQuantities.value[ingredient.id]
    ingredientQuantities.value[ingredient.id] = !currentValue
    updateSelectedIngredientsFromQuantities()
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
  () => [ing.value, stepperType.value],
  () => {
    if (stepperType.value === 'optionalBase' && ing.value.length > 0) {
      const hasExistingSelections =
        Object.keys(ingredientQuantities.value).length > 0
      if (!hasExistingSelections) {
        initializeOptionalBase()
      }
    }
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

const emit = defineEmits<{
  (e: 'update-selection', selection: Ingredient[]): void
}>()
</script>

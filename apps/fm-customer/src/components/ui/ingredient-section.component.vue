<template>
  <PrimeCard :pt="computedCardPt">
    <template #title>
      <div
        v-if="!displayItems || displayItems.length === 0"
        class="flex items-center justify-between"
      >
        <span>{{ title }}</span>
        <Button
          v-if="inCart"
          icon="pi pi-pencil"
          :full-width="Width.AUTO"
          :severity="Severity.SECONDARY"
          @click="handleClick"
        />
      </div>
      <span v-else>{{ title }}</span>
    </template>
    <template #content>
      <div
        v-if="displayItems && displayItems.length > 0"
        class="grid grid-cols-[1fr_auto] gap-4 min-h-[60px]"
      >
        <div class="self-start">
          <ul class="space-y-0.5">
            <li
              v-for="item in displayItems"
              :key="item.id || item.label"
              class="flex flex-row lg:items-center justify-between gap-1 lg:gap-0"
            >
              <span class="text-gray-700 text-sm lg:text-base">
                {{ item.label }}
                <span
                  v-if="item.quantity > 0"
                  class="font-semibold text-gray-900 ml-1"
                >
                  {{ isOptionalBase ? '-' : 'x' }}{{ item.quantity }}
                </span>
              </span>
              <span
                v-if="
                  !isMandatory && item.price > 0 && !isOptionalBaseRemoved(item)
                "
                class="font-medium text-red-700 text-sm lg:text-base"
              >
                {{ item.totalPrice.toFixed(2) }} €
              </span>
            </li>
          </ul>
        </div>

        <div class="self-end">
          <Button
            v-if="inCart"
            icon="pi pi-pencil"
            :full-width="Width.AUTO"
            :severity="Severity.SECONDARY"
            @click="handleClick"
          />
        </div>
      </div>
    </template>
  </PrimeCard>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button.component.vue'
import { Severity, Width } from '~/types/primevue.type'

interface IngredientWithQuantity {
  ingredient: {
    id: string
    label: string
    price: number
  }
  quantity: number | boolean
}

interface SimpleIngredient {
  id?: string
  label: string
  price: number
}

interface DisplayIngredient {
  id: string
  label: string
  price: number
  quantity: number
  totalPrice: number
}

type ColorVariant = 'red' | 'amber' | 'blue'

interface Props {
  title: string
  items?: (IngredientWithQuantity | SimpleIngredient)[]
  color?: ColorVariant
  cardPt?: object
  isMandatory?: boolean
  inCart?: boolean
  isOptionalBase?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'red',
  isOptionalBase: false,
})

const isNewFormat = (item: any): item is IngredientWithQuantity => {
  return item && 'quantity' in item
}

const displayItems = computed((): DisplayIngredient[] => {
  if (!props.items || props.items.length === 0) return []

  const grouped = new Map<string, DisplayIngredient>()

  props.items.forEach((item) => {
    let ingredient: SimpleIngredient
    let quantity: number

    if (isNewFormat(item)) {
      ingredient = item.ingredient
      quantity =
        typeof item.quantity === 'boolean'
          ? item.quantity
            ? 0
            : 1
          : item.quantity || 0
    } else {
      ingredient = item as SimpleIngredient
      quantity = 1
    }

    const key = ingredient.id || ingredient.label

    if (grouped.has(key)) {
      const existing = grouped.get(key)!
      existing.quantity += quantity
      existing.totalPrice = existing.price * existing.quantity
    } else {
      grouped.set(key, {
        id: ingredient.id || key,
        label: ingredient.label,
        price: ingredient.price || 0,
        quantity: quantity,
        totalPrice: (ingredient.price || 0) * quantity,
      })
    }
  })

  return Array.from(grouped.values())
})

const colorVariants: Record<
  ColorVariant,
  {
    title: string
    root: string
    content: string
  }
> = {
  red: {
    title: 'text-red-700 font-bold lg:text-sm',
    root: 'border-l-4 border-red-500 bg-red-50',
    content: 'pt-1',
  },
  amber: {
    title: 'text-amber-700 font-bold lg:text-sm',
    root: 'border-l-4 border-amber-500 bg-amber-50',
    content: 'pt-1',
  },
  blue: {
    title: 'text-blue-700 font-bold lg:text-sm',
    root: 'border-l-4 border-blue-500 bg-blue-50',
    content: 'pt-1',
  },
}

const computedCardPt = computed(() => {
  if (props.cardPt) {
    return props.cardPt
  }

  const variant = colorVariants[props.color as ColorVariant]
  return {
    title: { class: variant.title },
    root: { class: variant.root },
    content: { class: variant.content },
  }
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}

const isOptionalBaseRemoved = (item: DisplayIngredient): boolean => {
  return props.isOptionalBase && item.quantity > 0
}
</script>

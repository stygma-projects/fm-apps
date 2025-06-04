<template>
  <PrimeCard v-if="items && items.length > 0" :pt="computedCardPt">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <ul class="space-y-0.5">
        <li
          v-for="ingredient in items"
          :key="ingredient.label"
          class="flex flex-row lg:items-center justify-between gap-1 lg:gap-0"
        >
          <span class="text-gray-700 text-sm lg:text-base">{{
            ingredient.label
          }}</span>
          <span
            v-if="!isMandatory"
            class="font-medium text-red-700 text-sm lg:text-base"
          >
            {{ ingredient.price }} €
          </span>
        </li>
      </ul>
    </template>
  </PrimeCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Ingredient {
  label: string
  price: number
}

interface Props {
  title: string
  items?: Ingredient[]
  color?: 'red' | 'amber' | 'blue'
  cardPt?: object
  isMandatory?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'red',
})

const colorVariants = {
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

  const variant = colorVariants[props.color]
  return {
    title: { class: variant.title },
    root: { class: variant.root },
    content: { class: variant.content },
  }
})
</script>

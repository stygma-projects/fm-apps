<template>
  <PrimeCard v-if="items && items.length > 0" :pt="cardPt">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <ul class="space-y-2">
        <li
          v-for="ingredient in items"
          :key="ingredient.label"
          class="flex items-center justify-between"
        >
          <span class="text-gray-700">{{ ingredient.label }}</span>
          <span v-if="isNotMandatory" class="font-medium text-red-700"
            >{{ ingredient.price }} €</span
          >
        </li>
      </ul>
    </template>
  </PrimeCard>
</template>

<script setup lang="ts">
interface Ingredient {
  label: string
  price: number
}

interface Props {
  title: string
  items?: Ingredient[]
  cardPt?: object
  isNotMandatory?: boolean
}

defineProps<Props>()
</script>

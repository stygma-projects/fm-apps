<template>
  <li v-if="items && items.length > 0">
    {{ title }} :
    <ul class="list-disc ml-6 mt-2">
      <li v-for="ingredient in items" :key="ingredient.label" class="mb-1">
        {{ ingredient.label }}
        {{ ingredient.priceIncludingTax }} €
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
interface Ingredient {
  label: string
  priceIncludingTax: number
}

interface Props {
  title: string
  items?: Ingredient[]
}

defineProps<Props>()
</script>

<template>
  <PrimeFloatLabel variant="on">
    <PrimeInputText 
      v-if="type === 'string'"
      v-model="model" 
      class="w-full" 
    />
    <PrimeInputNumber 
      v-else-if="type === 'number' || type === 'float'"
      v-model="model"
      :min="0"
      :mode="type === 'number' ? 'decimal' : 'decimal'"
      :maxFractionDigits="type === 'float' ? 2 : 0"
      class="w-full" 
    />
    <label>{{ label }}</label>
  </PrimeFloatLabel>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const model = defineModel<string | number>('modelValue', {
  required: true,
})

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    validator: (value: string) => ['string', 'number', 'float'].includes(value),
    default: 'string'
  }
})

const { label, type } = toRefs(props)
</script>
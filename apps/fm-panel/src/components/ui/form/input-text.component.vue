<template>
  <PrimeFloatLabel variant="on">
    <PrimeInputText v-model="inputValue" class="w-full" />
    <label>{{ label }}</label>
  </PrimeFloatLabel>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const inputValue = defineModel<string>('modelValue', {
  required: true,
  type: String,
})

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

const { label } = toRefs(props)
</script>

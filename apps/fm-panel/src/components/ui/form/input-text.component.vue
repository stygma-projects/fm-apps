<template>
  <PrimeFloatLabel variant="on">
    <PrimeInputText 
      v-if="type === InputType.TEXT"
      v-model="model" 
      class="w-full" 
    />
    <PrimeInputNumber 
      v-else-if="type === InputType.NUMBER"
      v-model="model"
      class="w-full" 
    />
    <label>{{ label }}</label>
  </PrimeFloatLabel>
</template>

<script setup lang="ts">
import { toRefs, type PropType } from 'vue'
import { InputType } from '../../../types/primevue.type'

const model = defineModel<string | number>('modelValue', {
  required: true,
})

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<InputType>,
    default: InputType.TEXT
  }
})

const { label, type } = toRefs(props)
</script>
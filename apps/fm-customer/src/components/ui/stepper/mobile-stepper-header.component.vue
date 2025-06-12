<template>
  <div class="flex items-center px-6 py-4 border-b border-gray-200">
    <h2 class="flex-grow pr-6 ml-4 text-xl font-bold text-center">
      {{ currentCategoryName }}
    </h2>
    <Button
      text="✕"
      :severity="Severity.SECONDARY"
      :full-width="Width.AUTO"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button.component.vue'
import { Severity, Width } from '~/types/primevue.type'

interface Props {
  currentCategoryName: string
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

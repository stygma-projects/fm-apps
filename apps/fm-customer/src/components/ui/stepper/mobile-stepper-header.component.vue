<template>
  <div class="flex items-center px-6 py-4 border-b border-gray-200">
    <h2 class="flex-grow pr-6 ml-4 text-xl font-bold text-center">
      {{ currentCategoryName }}
    </h2>
    <button class="text-gray-500 hover:text-gray-800" @click="$emit('close')">
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentCategoryName: string
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

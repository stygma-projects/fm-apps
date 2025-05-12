<template>
  <PrimeDialog v-model:visible="isVisible" :header="title">
    <div class="mt-2">
      <slot name="content"></slot>
    </div>

    <template #footer>
      <PrimeButton
        v-if="onCancel"
        label="Cancel"
        icon="pi pi-times"
        severity="danger"
        outlined
        @click="handleCancel"
      />
      <PrimeButton
        v-if="onConfirm"
        label="Save"
        icon="pi pi-check"
        @click="handleConfirm"
      />
    </template>
  </PrimeDialog>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
  onConfirm: {
    type: Function,
    required: false,
    default: null,
  },
  onCancel: {
    type: Function,
    required: false,
    default: null,
  },
})

const { title, onConfirm, onCancel } = toRefs(props)

const isVisible = defineModel<boolean>('is-visible', {
  required: true,
  type: Boolean,
})

const handleConfirm = () => {
  onConfirm?.value?.()
  isVisible.value = false
}

const handleCancel = () => {
  onCancel?.value?.()
  isVisible.value = false
}
</script>

<template>
  <PrimeDialog v-model:visible="isVisible" :header="title">
    <div class="mt-2">
      <slot name="content"></slot>
    </div>

    <template #footer>
      <PrimeButton
        v-if="onCancel"
        icon="pi pi-times"
        label="Cancel"
        outlined
        severity="danger"
        @click="handleCancel"
      />
      <PrimeButton
        v-if="onConfirm"
        icon="pi pi-check"
        label="Save"
        @click="handleConfirm"
      />
    </template>
  </PrimeDialog>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required:true
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

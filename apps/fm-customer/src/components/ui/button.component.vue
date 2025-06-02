<template>
  <PrimeButton :severity="severity" @click="handleClick" :class="buttonClasses">
    <div class="flex items-center gap-2">
      <span class="text-xl font-bold text-rose-700">{{ text }}</span>
    </div>
    <span v-if="secondaryText">{{ secondaryText }}</span>
  </PrimeButton>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  text?: string
  secondaryText?: string | number
  severity?:
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'help'
    | 'secondary'
    | undefined
  fullWidth?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  severity: 'success',
  fullWidth: true,
  customClass: '',
})

const emit = defineEmits<{
  click: []
  openCart: []
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'flex items-center justify-between'
  const widthClass = props.fullWidth ? 'w-full' : ''
  return `${baseClasses} ${widthClass} ${props.customClass}`.trim()
})

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <PrimeButton
    :severity="severity"
    @click="handleClick"
    :pt="{
      root: {
        class: `w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 text-center border-none ${customClass}`,
      },
      label: {
        class: 'text-pink-700 lg:text-xl',
      },
    }"
  >
    <div class="flex items-center gap-2">
      <PrimeBadge v-if="secondaryText" severity="danger">{{
        secondaryText
      }}</PrimeBadge>
      <span>{{ text }}</span>
    </div>
  </PrimeButton>
</template>

<script lang="ts" setup>
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

const handleClick = () => {
  emit('click')
}
</script>

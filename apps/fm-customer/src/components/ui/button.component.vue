<template>
  <PrimeButton
    :disabled="disabled || loading"
    :loading="loading"
    :severity="mapSeverityToPrime(severity)"
    @click="handleClick"
    :pt="myPt"
  >
    <div v-if="text || secondaryText" class="flex items-center gap-2">
      <PrimeBadge v-if="secondaryText">{{ secondaryText }}</PrimeBadge>
      <span v-if="text" :class="textClass">{{ text }}</span>
    </div>
  </PrimeButton>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Severity, Width } from '~/types/primevue.type'
import { useRouter } from 'vue-router'

interface Props {
  text?: string
  secondaryText?: string | number
  severity?: Severity
  fullWidth?: Width
  customClass?: string
  textClass?: string
  to?: string | object
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  severity: Severity.PRIMARY,
  fullWidth: Width.FULL,
  customClass: '',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: []
  openCart: []
  navigate: [destination: string | object]
}>()

const mapSeverityToPrime = (severity: Severity) => {
  const severityMap: Record<Severity, string> = {
    [Severity.PRIMARY]: 'primary',
    [Severity.SECONDARY]: 'secondary',
    [Severity.SUCCESS]: 'success',
    [Severity.INFO]: 'info',
    [Severity.WARNING]: 'warn',
    [Severity.DANGER]: 'danger',
    [Severity.CONTRAST]: 'contrast',
  }

  return severityMap[severity] || 'primary'
}

const mapWidthToPrime = (width: Width) => {
  const widthMap: Record<Width, string> = {
    [Width.FULL]: 'w-full',
    [Width.AUTO]: 'w-auto',
    [Width.ATHIRD]: 'w-1/3',
  }

  return widthMap[width] || 'w-full'
}

const myPt = computed(() => {
  return {
    root: {
      class: [
        mapWidthToPrime(props.fullWidth),
        props.customClass,

        'font-bold',
        'transition-all duration-200 ease-in-out',

        {
          'shadow-lg hover:shadow-xl': !props.disabled,
          'transform hover:scale-[1.02] active:scale-[0.98]':
            !props.disabled && !props.loading,
          'hover:brightness-110': !props.disabled && !props.loading,
        },

        'focus:ring-2 focus:ring-offset-2 focus:outline-none',

        {
          'opacity-60 cursor-not-allowed': props.disabled,
        },
      ],
    },
  }
})

const router = useRouter()

const handleClick = async () => {
  if (props.to) {
    await handleNavigation()
  } else {
    emit('click')
  }
}

const handleNavigation = async () => {
  if (props.to) {
    await router.push(props.to)
    emit('navigate', props.to)
  }
}
</script>

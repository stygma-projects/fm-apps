<template>
  <div :class="containerClasses">
    <PrimeButton
      v-if="showCancelButton"
      severity="secondary"
      @click="$emit('cancel')"
      :label="t('stepper.cancel')"
      :class="buttonClasses"
      data-cy="fmc-cancel-step-button"
    />

    <PrimeButton
      v-if="showBackButton"
      severity="secondary"
      @click="$emit('back')"
      :label="t('stepper.back')"
      :class="buttonClasses"
      data-cy="fmc-back-step-button"
    />

    <!-- Step counter for mobile -->
    <div
      v-if="isMobile && showStepCounter"
      class="flex items-center justify-center w-1/3"
    >
      {{ currentStep }} / {{ totalSteps }}
    </div>

    <PrimeButton
      v-if="isLastStep"
      severity="success"
      :disabled="!hasAllMandatorySelections"
      @click="$emit('validate')"
      :label="t('stepper.validate')"
      :class="buttonClasses"
      data-cy="fmc-validate-step-button"
    />
    <PrimeButton
      v-else
      :disabled="!canProceed"
      @click="$emit('next')"
      :label="t('stepper.next')"
      :class="buttonClasses"
      data-cy="fmc-next-step-button"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { NavigationProps } from '~/types/stepper.type'

interface Props extends NavigationProps {}

interface Emits {
  (e: 'cancel'): void
  (e: 'back'): void
  (e: 'next'): void
  (e: 'validate'): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'desktop',
})

defineEmits<Emits>()

const { t } = useI18n()

const isMobile = computed(() => props.variant === 'mobile')
const showCancelButton = computed(() => props.isFirstStep)
const showBackButton = computed(() => !props.isFirstStep)
const showStepCounter = computed(
  () => props.currentStep !== undefined && props.totalSteps !== undefined,
)

const containerClasses = computed(() => {
  const base = 'flex justify-between'
  return isMobile.value ? `${base} px-6 py-4 border-t` : `${base} mt-4`
})

const buttonClasses = computed(() => (isMobile.value ? 'w-1/3' : ''))
</script>

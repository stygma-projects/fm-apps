<template>
  <div :class="containerClasses">
    <Button
      v-if="showCancelButton"
      :severity="Severity.SECONDARY"
      :label="fr.stepper.cancel"
      :class="buttonClasses"
      @click="$emit('cancel')"
      data-cy="fmc-cancel-step-button"
    />

    <Button
      v-if="showBackButton"
      :severity="Severity.SECONDARY"
      :label="fr.stepper.back"
      :class="buttonClasses"
      @click="$emit('back')"
      data-cy="fmc-back-step-button"
    />

    <!-- Step counter for mobile -->
    <div
      v-if="isMobile && showStepCounter"
      class="flex items-center justify-center w-1/3"
    >
      {{ currentStep }} / {{ totalSteps }}
    </div>

    <Button
      v-if="isLastStep"
      :severity="Severity.SUCCESS"
      :disabled="!hasAllMandatorySelections"
      :label="fr.stepper.validate"
      :class="buttonClasses"
      @click="$emit('validate')"
      data-cy="fmc-validate-step-button"
    />
    <Button
      v-else
      :disabled="!canProceed"
      :label="fr.stepper.next"
      :class="buttonClasses"
      @click="$emit('next')"
      data-cy="fmc-next-step-button"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button.component.vue'
import { Severity, Width } from '~/types/primevue.type'
import { fr } from '~/i18n/locales/fr'
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

const isMobile = computed(() => props.variant === 'mobile')
const showCancelButton = computed(() => props.isFirstStep)
const showBackButton = computed(() => !props.isFirstStep)
const showStepCounter = computed(
  () => props.currentStep !== undefined && props.totalSteps !== undefined,
)

const containerClasses = computed(() => {
  const base = 'flex justify-between gap-4'
  return isMobile.value ? `${base} px-6 py-4 border-t` : `${base} mt-4`
})

const buttonClasses = computed(() => (isMobile.value ? Width.ATHIRD : ''))
</script>

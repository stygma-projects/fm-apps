<template>
  <div class="flex justify-between mt-4">
    <PrimeButton
      v-if="isFirstStep"
      severity="secondary"
      @click="$emit('cancel')"
      :label="t('stepper.cancel')"
      data-cy="fmc-cancel-step-button"
    />
    <PrimeButton
      v-if="!isFirstStep"
      severity="secondary"
      @click="$emit('back')"
      :label="t('stepper.back')"
      data-cy="fmc-back-step-button"
    />

    <PrimeButton
      v-if="isLastStep"
      severity="success"
      :disabled="!hasAllMandatorySelections"
      @click="$emit('validate')"
      :label="t('stepper.validate')"
      data-cy="fmc-validate-step-button"
    />
    <PrimeButton
      v-else
      :disabled="!canProceed"
      @click="$emit('next')"
      :label="t('stepper.next')"
      data-cy="fmc-next-step-button"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  isFirstStep: boolean
  isLastStep: boolean
  canProceed: boolean
  hasAllMandatorySelections: boolean
}

interface Emits {
  (e: 'cancel'): void
  (e: 'back'): void
  (e: 'next'): void
  (e: 'validate'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="px-6 py-4 border-t">
    <div class="flex justify-between">
      <PrimeButton
        v-if="activeTabIndex === 0"
        severity="secondary"
        class="w-1/3"
        @click="$emit('cancel')"
        :label="t('stepper.cancel')"
        data-cy="fmc-cancel-step-button"
      />
      <PrimeButton
        v-if="activeTabIndex > 0"
        severity="secondary"
        @click="$emit('back')"
        class="w-1/3"
        :label="t('stepper.back')"
        data-cy="fmc-back-step-button"
      />

      <div class="flex items-center justify-center w-1/3">
        {{ activeTabIndex + 1 }} / {{ totalSteps }}
      </div>

      <PrimeButton
        v-if="activeTabIndex === totalSteps - 1"
        severity="success"
        :disabled="!hasAllMandatorySelections"
        @click="$emit('validate')"
        class="w-1/3"
        :label="t('stepper.validate')"
        data-cy="fmc-validate-step-button"
      />
      <PrimeButton
        v-else
        :disabled="!canProceed"
        @click="$emit('next')"
        class="w-1/3"
        :label="t('stepper.next')"
        data-cy="fmc-next-step-button"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  activeTabIndex: number
  totalSteps: number
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

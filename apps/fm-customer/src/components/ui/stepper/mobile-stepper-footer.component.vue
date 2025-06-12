<template>
  <div class="px-6 py-4 border-t">
    <div class="flex justify-between">
      <Button
        v-if="activeTabIndex === 0"
        :severity="Severity.SECONDARY"
        :full-width="Width.ATHIRD"
        :label="fr.stepper.cancel"
        @click="$emit('cancel')"
        data-cy="fmc-cancel-step-button"
      />
      <PrimeButton
        v-if="activeTabIndex > 0"
        :severity="Severity.SECONDARY"
        :full-width="Width.ATHIRD"
        :label="fr.stepper.back"
        @click="$emit('back')"
        data-cy="fmc-back-step-button"
      />

      <div class="flex items-center justify-center w-1/3">
        {{ activeTabIndex + 1 }} / {{ totalSteps }}
      </div>

      <PrimeButton
        v-if="activeTabIndex === totalSteps - 1"
        :severity="Severity.SUCCESS"
        :disabled="!hasAllMandatorySelections"
        :full-width="Width.ATHIRD"
        :label="fr.stepper.validate"
        @click="$emit('validate')"
        data-cy="fmc-validate-step-button"
      />
      <PrimeButton
        v-else
        :disabled="!canProceed"
        :full-width="Width.ATHIRD"
        :label="fr.stepper.next"
        @click="$emit('next')"
        data-cy="fmc-next-step-button"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button.component.vue'
import { Severity, Width } from '~/types/primevue.type'
import { fr } from '~/i18n/locales/fr'

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

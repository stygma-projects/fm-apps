<template>
  <div class="hidden lg:block">
    <PrimeDialog
      :visible="visible"
      modal
      :header="currentCategoryName"
      :style="{ width: '90vw', maxWidth: '1100px' }"
      @update:visible="$emit('update:visible', $event)"
    >
      <div class="p-4">
        <PrimeStepper :value="currentStep" :linear="true">
          <PrimeStepList>
            <PrimeStep
              v-for="(_, index) in availableSteps"
              :key="index"
              :value="String(index + 1)"
            />
          </PrimeStepList>

          <PrimeStepPanels>
            <PrimeStepPanel
              v-for="(step, index) in availableSteps"
              :key="index"
              :value="String(index + 1)"
            >
              <StepContent
                :item="item"
                :mandatory-index="step.originalIndex"
                :is-last="index === availableSteps.length - 1"
                :selections="currentStepSelections"
                :stepper-type="stepperType"
                @update-selection="$emit('selection-update', $event)"
              />

              <StepperNavigation
                :is-first-step="index === 0"
                :is-last-step="index === availableSteps.length - 1"
                :can-proceed="canProceed"
                :has-all-mandatory-selections="hasAllMandatorySelections"
                @cancel="$emit('cancel')"
                @back="$emit('step-change', String(index))"
                @next="$emit('step-change', String(index + 2))"
                @validate="$emit('validate')"
              />
            </PrimeStepPanel>
          </PrimeStepPanels>
        </PrimeStepper>
      </div>
    </PrimeDialog>
  </div>
</template>

<script setup lang="ts">
import type { StepperType } from '~/types/stepper.type'
import StepContent from './step-content.component.vue'
import StepperNavigation from './stepper-navigation.component.vue'

interface Props {
  visible: boolean
  currentStep: string
  availableSteps: any[]
  currentCategoryName: string
  currentStepSelections: any[]
  canProceed: boolean
  hasAllMandatorySelections: boolean
  item: any
  stepperType: StepperType
}

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'step-change', step: string): void
  (e: 'selection-update', selections: any[]): void
  (e: 'cancel'): void
  (e: 'validate'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

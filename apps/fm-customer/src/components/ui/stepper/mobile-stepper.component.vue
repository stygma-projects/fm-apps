<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 overflow-auto bg-white lg:hidden"
    style="min-height: 100vh; min-height: -webkit-fill-available"
  >
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <MobileStepperHeader
        :current-category-name="currentCategoryName"
        @close="$emit('close')"
      />

      <!-- Body -->
      <div class="flex-grow overflow-auto">
        <div
          v-for="(step, index) in availableSteps"
          :key="index"
          class="p-6"
          v-show="activeTabIndex === index"
        >
          <StepContent
            :item="item"
            :mandatory-index="step.originalIndex"
            :is-last="index === availableSteps.length - 1"
            :selections="currentStepSelections"
            :stepper-type="stepperType"
            @update-selection="$emit('selection-update', $event)"
          />
        </div>
      </div>

      <!-- Footer -->
      <StepperNavigation
        :is-first-step="activeTabIndex === 0"
        :is-last-step="activeTabIndex === availableSteps.length - 1"
        :can-proceed="canProceed"
        :has-all-mandatory-selections="hasAllMandatorySelections"
        :current-step="activeTabIndex + 1"
        :total-steps="availableSteps.length"
        variant="mobile"
        @cancel="$emit('cancel')"
        @back="$emit('tab-change', activeTabIndex - 1)"
        @next="$emit('tab-change', activeTabIndex + 1)"
        @validate="$emit('validate')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StepContent from './step-content.component.vue'
import MobileStepperHeader from './mobile-stepper-header.component.vue'
import StepperNavigation from './stepper-navigation.component.vue'
import type { MobileStepperProps } from '~/types/stepper.type'

interface Emits {
  (e: 'close'): void
  (e: 'tab-change', index: number): void
  (e: 'selection-update', selections: any[]): void
  (e: 'cancel'): void
  (e: 'validate'): void
}

defineProps<MobileStepperProps>()
defineEmits<Emits>()
</script>

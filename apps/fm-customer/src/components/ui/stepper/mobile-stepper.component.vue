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
            @update-selection="$emit('selection-update', $event)"
          />
        </div>
      </div>

      <!-- Footer -->
      <MobileStepperFooter
        :active-tab-index="activeTabIndex"
        :total-steps="availableSteps.length"
        :can-proceed="canProceed"
        :has-all-mandatory-selections="hasAllMandatorySelections"
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
import MobileStepperFooter from './mobile-stepper-footer.component.vue'

interface Props {
  visible: boolean
  activeTabIndex: number
  availableSteps: any[]
  currentCategoryName: string
  currentStepSelections: any[]
  canProceed: boolean
  hasAllMandatorySelections: boolean
  item: any
}

interface Emits {
  (e: 'close'): void
  (e: 'tab-change', index: number): void
  (e: 'selection-update', selections: any[]): void
  (e: 'cancel'): void
  (e: 'validate'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

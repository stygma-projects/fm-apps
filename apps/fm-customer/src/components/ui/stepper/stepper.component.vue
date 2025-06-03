<template>
  <!-- Desktop version -->
  <div class="hidden lg:block">
    <PrimeDialog
      v-model:visible="stepperState.dialogVisible"
      modal
      :header="currentCategoryName"
      :style="{ width: '90vw', maxWidth: '1100px' }"
    >
      <div class="p-4">
        <PrimeStepper v-model:value="stepperState.currentStep" :linear="true">
          <PrimeStepList>
            <PrimeStep
              v-for="(_, index) in availableSteps"
              :key="index"
              :value="String(index + 1)"
            />
          </PrimeStepList>

          <PrimeStepPanels>
            <PrimeStepPanel v-if="availableSteps.length === 0" value="1">
              <div class="p-4">
                <h2 class="mb-4 text-2xl font-bold">TOTO</h2>
                <div class="flex items-center justify-between">
                  <PrimeButton
                    severity="secondary"
                    @click="handleCancel"
                    :label="t('stepper.cancel')"
                    data-cy="fmc-cancel-step-button"
                  />
                  <PrimeButton
                    severity="success"
                    @click="handleValidate"
                    :label="t('stepper.validate')"
                    data-cy="fmc-validate-step-button"
                  />
                </div>
              </div>
            </PrimeStepPanel>

            <template v-else>
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
                  @update-selection="handleSelectionUpdate"
                />

                <div class="flex justify-between mt-4">
                  <PrimeButton
                    v-if="index === 0"
                    severity="secondary"
                    @click="handleCancel"
                    :label="t('stepper.cancel')"
                    data-cy="fmc-cancel-step-button"
                  />
                  <PrimeButton
                    v-if="index > 0"
                    severity="secondary"
                    @click="stepperState.currentStep = String(index)"
                    :label="t('stepper.back')"
                    data-cy="fmc-back-step-button"
                  />

                  <PrimeButton
                    v-if="index === availableSteps.length - 1"
                    severity="success"
                    :disabled="!hasAllMandatorySelections"
                    @click="handleValidate"
                    :label="t('stepper.validate')"
                    data-cy="fmc-validate-step-button"
                  />
                  <PrimeButton
                    v-else
                    :disabled="!canProceed"
                    @click="stepperState.currentStep = String(index + 2)"
                    :label="t('stepper.next')"
                    data-cy="fmc-next-step-button"
                  />
                </div>
              </PrimeStepPanel>
            </template>
          </PrimeStepPanels>
        </PrimeStepper>
      </div>
    </PrimeDialog>
  </div>

  <!-- Mobile format -->
  <div
    v-if="stepperState.mobileVisible"
    class="fixed inset-0 z-50 overflow-auto bg-white lg:hidden"
    style="min-height: 100vh; min-height: -webkit-fill-available"
  >
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <div class="flex items-center px-4 py-4 border-b border-gray-200">
        <button
          class="text-gray-500 hover:text-gray-800"
          @click="closeMobileView"
        ></button>
        <h2 class="flex-grow pr-6 ml-4 text-xl font-bold text-center">
          {{ currentCategoryName }}
        </h2>
      </div>

      <!-- Body -->
      <div class="flex-grow overflow-auto">
        <div v-if="availableSteps.length === 0" class="p-6">
          <p>TOTO</p>
        </div>

        <div
          v-else
          v-for="(step, index) in availableSteps"
          :key="index"
          class="p-6"
          v-show="stepperState.activeTabIndex === index"
        >
          <StepContent
            :item="item"
            :mandatory-index="step.originalIndex"
            :is-last="index === availableSteps.length - 1"
            :selections="currentStepSelections"
            @update-selection="handleSelectionUpdate"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t">
        <div v-if="availableSteps.length === 0" class="flex justify-center">
          <PrimeButton
            severity="secondary"
            class="w-1/3"
            @click="handleCancel"
            :label="t('stepper.cancel')"
            data-cy="fmc-cancel-step-button"
          />

          <div class="flex items-center justify-center w-1/3">1 / 1</div>
          <PrimeButton
            severity="success"
            class="w-1/3"
            @click="handleValidate"
            :label="t('stepper.validate')"
            data-cy="fmc-validate-step-button"
          />
        </div>

        <div v-else class="flex justify-between">
          <PrimeButton
            v-if="stepperState.activeTabIndex === 0"
            severity="secondary"
            class="w-1/3"
            @click="handleCancel"
            :label="t('stepper.cancel')"
            data-cy="fmc-cancel-step-button"
          />
          <PrimeButton
            v-if="stepperState.activeTabIndex > 0"
            severity="secondary"
            @click="stepperState.activeTabIndex--"
            class="w-1/3"
            :label="t('stepper.back')"
            data-cy="fmc-back-step-button"
          />

          <div class="flex items-center justify-center w-1/3">
            {{ stepperState.activeTabIndex + 1 }} / {{ availableSteps.length }}
          </div>

          <PrimeButton
            v-if="stepperState.activeTabIndex === availableSteps.length - 1"
            severity="success"
            :disabled="!hasAllMandatorySelections"
            @click="handleValidate"
            class="w-1/3"
            :label="t('stepper.validate')"
            data-cy="fmc-validate-step-button"
          />
          <PrimeButton
            v-else
            :disabled="!canProceed"
            @click="stepperState.activeTabIndex++"
            class="w-1/3"
            :label="t('stepper.next')"
            data-cy="fmc-next-step-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive, toRefs } from 'vue'
import type {
  StepperEmits,
  StepperProps,
  StepperState,
} from '~/types/stepper.type'
import StepContent from './step-content.component.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const ingredientStore = useIngredientStore()
const cartStore = useCartStore()

interface StepperHooks {
  isMobile: Ref<boolean>
  handleResize: () => void
}

const props = defineProps<
  StepperProps & {
    selectionsKey?: string
  }
>()
const emit = defineEmits<StepperEmits>()

const { item } = toRefs(props)

const stepperState = reactive<
  StepperState & { selections: Record<string, any[]> }
>({
  currentStep: '1',
  activeTabIndex: 0,
  dialogVisible: false,
  mobileVisible: false,
  selections: {},
})

const availableSteps = computed(() => {
  if (!props.item?.mandatory) return []

  const steps: any[] = []

  props.item.mandatory.forEach((mandatoryCategory, index) => {
    const hasIngredients = ingredientStore.ingredients.some(
      (ingredient) => ingredient.categoryId === mandatoryCategory.id,
    )

    if (hasIngredients) {
      steps.push({
        category: mandatoryCategory,
        originalIndex: index,
        stepIndex: steps.length,
      })
    }
  })

  return steps
})

const currentCategoryName = computed(() => {
  if (availableSteps.value.length === 0) {
    return props.item?.label
  }

  const currentStep = availableSteps.value[stepperState.activeTabIndex]
  return currentStep?.category?.label || props.item?.label
})

const currentStepSelections = computed(() => {
  const key = stepperState.currentStep
  return stepperState.selections[key] || []
})

const updateStepSelections = (selections: any[]) => {
  const key = stepperState.currentStep
  stepperState.selections = {
    ...stepperState.selections,
    [key]: selections,
  }
}

const hasSelections = computed(() => {
  return currentStepSelections.value.length > 0
})

const canProceed = computed(() => {
  if (availableSteps.value.length === 0) return true
  return hasSelections.value
})

const hasAllMandatorySelections = computed(() => {
  if (availableSteps.value.length === 0) return true

  // Vérifier que toutes les étapes disponibles ont au moins une sélection
  for (let i = 0; i < availableSteps.value.length; i++) {
    const stepKey = String(i + 1)
    if (!stepperState.selections[stepKey]?.length) {
      return false
    }
  }

  return true
})

const useStepper = (props: StepperProps): StepperHooks => {
  const { visible } = toRefs(props)
  const isMobile = ref(false)

  const handleResize = () => {
    isMobile.value = window.innerWidth < 1024

    if (isMobile.value) {
      stepperState.mobileVisible = visible.value
      stepperState.dialogVisible = false
    } else {
      stepperState.dialogVisible = visible.value
      stepperState.mobileVisible = false
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  })

  return {
    isMobile,
    handleResize,
  }
}

const { isMobile } = useStepper(props)

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue && props.item?.mandatory) {
      await ingredientStore.fetchAllIngredients()

      const categoryIds = props.item.mandatory.map((mandatory) => mandatory.id)
      ingredientStore.filterByCategories(categoryIds)

      if (props.selectionsKey) {
        const existingKey = cartStore.getItemSelections(props.selectionsKey)
        stepperState.selections = { ...existingKey }
      } else {
        stepperState.selections = {}
      }
    }

    if (isMobile.value) {
      stepperState.mobileVisible = newValue
    } else {
      stepperState.dialogVisible = newValue
    }
  },
  { immediate: true },
)

// Watch the desktop
watch(
  () => stepperState.currentStep,
  (newStep) => {
    stepperState.activeTabIndex = parseInt(newStep) - 1
    emit('step-change', newStep)
  },
)

watch(
  () => stepperState.activeTabIndex,
  (newIndex) => {
    stepperState.currentStep = String(newIndex + 1)
    emit('step-change', stepperState.currentStep)
  },
)

const closeMobileView = () => {
  emit('update:visible', false)
  stepperState.mobileVisible = false
  stepperState.dialogVisible = false

  // Reset steps but keep selections
  stepperState.currentStep = '1'
  stepperState.activeTabIndex = 0
}

const emitComplete = (isCancelled = false) => {
  const currentSelections = { ...stepperState.selections }

  if (!isCancelled) {
    if (props.selectionsKey) {
      cartStore.updateItem(props.selectionsKey, currentSelections)
    } else {
      cartStore.addItem(props.item, currentSelections)
    }

    emit('complete', {
      item: props.item,
      step: stepperState.currentStep,
      selections: currentSelections,
    })
  } else {
    emit('cancel', {
      item: props.item,
      step: stepperState.currentStep,
      selections: currentSelections,
    })
  }

  stepperState.selections = {}
  closeMobileView()
}

const handleCancel = () => {
  emitComplete(true)
}

const handleValidate = () => {
  emitComplete(false)
}

const handleSelectionUpdate = (selection: any[]) => {
  updateStepSelections(selection)
}
</script>

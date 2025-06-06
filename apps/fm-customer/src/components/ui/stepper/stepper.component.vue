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
        <div
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
        <div class="flex justify-between">
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

const hasAddedDirectly = ref(false)

const availableSteps = computed(() => {
  if (!props.item?.mandatory) return []

  const steps: any[] = []

  props.item.mandatory.forEach((mandatoryCategory: { id: any }, index: any) => {
    const hasIngredients = ingredientStore.ingredients.some(
      (ingredient: { categoryId: any }) => ingredient.categoryId === mandatoryCategory.id,
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
  return hasSelections.value
})

const hasAllMandatorySelections = computed(() => {
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
  async (newValue: any) => {
    if (!newValue) {
      hasAddedDirectly.value = false
      return
    }

    // if no mandatory, add by closing the stepper instantly
    if (!props.item?.mandatory || props.item.mandatory.length === 0) {
      if (!props.selectionsKey && !hasAddedDirectly.value) {
        hasAddedDirectly.value = true
        cartStore.addItemDirectly(props.item)
        emit('complete', { item: props.item, step: '1', selections: {} })

        emit('update:visible', false)
        stepperState.mobileVisible = false
        stepperState.dialogVisible = false
        return
      }
    }

    // if mandatory, let the stepper work
    if (props.item?.mandatory && props.item.mandatory.length > 0) {
      await ingredientStore.fetchAllIngredients()

      const categoryIds = props.item.mandatory.map((mandatory: { id: any }) => mandatory.id)
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

watch(
  () => stepperState.currentStep,
  (newStep: string) => {
    stepperState.activeTabIndex = parseInt(newStep) - 1
    emit('step-change', newStep)
  },
)

watch(
  () => stepperState.activeTabIndex,
  (newIndex: number) => {
    stepperState.currentStep = String(newIndex + 1)
    emit('step-change', stepperState.currentStep)
  },
)

const closeMobileView = () => {
  emit('update:visible', false)
  stepperState.mobileVisible = false
  stepperState.dialogVisible = false
  hasAddedDirectly.value = false

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

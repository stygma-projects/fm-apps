<!-- components/stepper/stepper-dialog.component.vue (Refactorisé) -->
<template>
  <DesktopStepper
    v-if="!isMobile"
    :visible="stepperStore.state.dialogVisible"
    :current-step="stepperStore.state.currentStep"
    :available-steps="availableSteps"
    :current-category-name="currentCategoryName"
    :current-step-selections="currentStepSelections"
    :can-proceed="canProceed"
    :has-all-mandatory-selections="hasAllMandatorySelections"
    :item="item"
    :stepper-type="stepperType"
    @update:visible="handleVisibilityUpdate"
    @step-change="handleStepChange"
    @selection-update="handleSelectionUpdate"
    @cancel="handleCancel"
    @validate="handleValidate"
  />

  <MobileStepper
    v-else
    :visible="stepperStore.state.mobileVisible"
    :active-tab-index="stepperStore.state.activeTabIndex"
    :available-steps="availableSteps"
    :current-category-name="currentCategoryName"
    :current-step-selections="currentStepSelections"
    :can-proceed="canProceed"
    :has-all-mandatory-selections="hasAllMandatorySelections"
    :item="item"
    :stepper-type="stepperType"
    @close="handleClose"
    @tab-change="handleTabChange"
    @selection-update="handleSelectionUpdate"
    @cancel="handleCancel"
    @validate="handleValidate"
  />
</template>

<script setup lang="ts">
import type { StepperProps, StepperEmits } from '~/types/stepper.type'
import DesktopStepper from './desktop-stepper.component.vue'
import MobileStepper from './mobile-stepper.component.vue'
import { useResponsive } from '~/composables/stepper/useResponsive.composable'
import { useStepperLogic } from '~/composables/stepper/useStepperLogic.composable'
import { useStepperValidation } from '~/composables/stepper/useStepperValidation.composable'

const props = withDefaults(defineProps<StepperProps>(), {
  stepperType: 'mandatory',
})

const emit = defineEmits<StepperEmits>()

// Composables
const stepperStore = useStepperStore()
const cartStore = useCartStore()
const ingredientStore = useIngredientStore()
const { isMobile } = useResponsive()

// Reactive refs
const stepperType = computed(() => props.stepperType || 'mandatory')
const { item } = toRefs(props)

// Stepper logic
const { availableSteps, currentCategoryName, hasStepsToDisplay } =
  useStepperLogic(item, stepperType)
const {
  currentStepSelections,
  canProceed,
  hasAllMandatorySelections,
  updateStepSelections,
} = useStepperValidation(stepperType, availableSteps)

const hasAddedDirectly = ref(false)

// Watch for visibility changes
watch(
  () => props.visible,
  async (newValue) => {
    if (!newValue) {
      hasAddedDirectly.value = false
      return
    }

    await handleStepperOpen()
  },
  { immediate: true },
)

// Watch for responsive changes
watch(isMobile, (newIsMobile) => {
  if (props.visible) {
    stepperStore.setVisibility(props.visible, newIsMobile)
  }
})

const handleStepperOpen = async () => {
  // Handle direct add cases
  if (!hasStepsToDisplay.value) {
    if (!props.selectionsKey && !hasAddedDirectly.value) {
      await handleDirectAdd()
      return
    }
  }

  // Load ingredients for mandatory steppers
  if (stepperType.value === 'mandatory' && props.item?.mandatory?.length > 0) {
    await ingredientStore.fetchAllIngredients()
    const categoryIds = props.item.mandatory.map((mandatory) => mandatory.id)
    ingredientStore.filterByCategories(categoryIds)
  } else if (stepperType.value !== 'mandatory') {
    await ingredientStore.fetchAllIngredients()
  }

  // Load existing selections
  if (props.selectionsKey) {
    const existingSelections = cartStore.getItemSelections(props.selectionsKey)
    stepperStore.setSelections(existingSelections)
  } else {
    stepperStore.resetState()
  }

  stepperStore.setVisibility(true, isMobile.value)
}

const handleDirectAdd = async () => {
  hasAddedDirectly.value = true
  cartStore.addItemDirectly(props.item)

  emit('complete', {
    item: props.item,
    step: '1',
    selections: {},
    stepperType: stepperType.value,
  })

  emit('update:visible', false)
  stepperStore.setVisibility(false, isMobile.value)
}

const handleVisibilityUpdate = (visible: boolean) => {
  emit('update:visible', visible)
  stepperStore.setVisibility(visible, isMobile.value)
}

const handleStepChange = (step: string) => {
  stepperStore.setStep(step)
  emit('step-change', step)
}

const handleTabChange = (index: number) => {
  stepperStore.setTabIndex(index)
  emit('step-change', stepperStore.state.currentStep)
}

const handleClose = () => {
  emit('update:visible', false)
  stepperStore.resetState()
  hasAddedDirectly.value = false
}

const handleSelectionUpdate = (selections: any[]) => {
  updateStepSelections(selections)
}

const emitComplete = (isCancelled = false) => {
  const currentSelections = { ...stepperStore.state.selections }

  if (!isCancelled) {
    if (props.selectionsKey) {
      cartStore.updateItem(
        props.selectionsKey,
        currentSelections,
        stepperType.value,
      )
    } else {
      cartStore.addItem(props.item, currentSelections, stepperType.value)
    }

    emit('complete', {
      item: props.item,
      step: stepperStore.state.currentStep,
      selections: currentSelections,
      stepperType: stepperType.value,
    })
  } else {
    emit('cancel', {
      item: props.item,
      step: stepperStore.state.currentStep,
      selections: currentSelections,
      stepperType: stepperType.value,
    })
  }

  handleClose()
}

const handleCancel = () => {
  emitComplete(true)
}

const handleValidate = () => {
  emitComplete(false)
}
</script>

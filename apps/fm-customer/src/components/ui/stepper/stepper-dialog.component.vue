<template>
  <DesktopStepper
    v-if="!isMobile"
    :visible="stepperState.dialogVisible"
    :current-step="stepperState.currentStep"
    :available-steps="availableSteps"
    :current-category-name="currentCategoryName"
    :current-step-selections="currentStepSelections"
    :can-proceed="canProceed"
    :has-all-mandatory-selections="hasAllMandatorySelections"
    :item="item"
    @update:visible="handleVisibilityUpdate"
    @step-change="handleStepChange"
    @selection-update="handleSelectionUpdate"
    @cancel="handleCancel"
    @validate="handleValidate"
  />

  <MobileStepper
    v-if="isMobile"
    :visible="stepperState.mobileVisible"
    :active-tab-index="stepperState.activeTabIndex"
    :available-steps="availableSteps"
    :current-category-name="currentCategoryName"
    :current-step-selections="currentStepSelections"
    :can-proceed="canProceed"
    :has-all-mandatory-selections="hasAllMandatorySelections"
    :item="item"
    @close="closeMobileView"
    @tab-change="handleTabChange"
    @selection-update="handleSelectionUpdate"
    @cancel="handleCancel"
    @validate="handleValidate"
  />
</template>

<script setup lang="ts">
import type {
  StepperEmits,
  StepperProps,
  StepperState,
} from '~/types/stepper.type'
import DesktopStepper from './desktop-stepper.component.vue'
import MobileStepper from './mobile-stepper.component.vue'

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
      (ingredient: { categoryId: any }) =>
        ingredient.categoryId === mandatoryCategory.id,
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

      const categoryIds = props.item.mandatory.map(
        (mandatory: { id: any }) => mandatory.id,
      )
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

const handleVisibilityUpdate = (visible: boolean) => {
  emit('update:visible', visible)
  stepperState.dialogVisible = visible
}

const handleStepChange = (step: string) => {
  stepperState.currentStep = step
  stepperState.activeTabIndex = parseInt(step) - 1
  emit('step-change', step)
}

const handleTabChange = (index: number) => {
  stepperState.activeTabIndex = index
  stepperState.currentStep = String(index + 1)
  emit('step-change', stepperState.currentStep)
}

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

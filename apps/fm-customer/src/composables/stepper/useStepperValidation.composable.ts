import type { StepperType, StepInfo } from '~/types/stepper.type'

export const useStepperValidation = (
  stepperType: Ref<StepperType>,
  availableSteps: Ref<StepInfo[]>,
) => {
  const stepperStore = useStepperStore()

  const currentStepSelections = computed(() => {
    const key =
      stepperType.value === 'mandatory'
        ? stepperStore.state.currentStep
        : stepperType.value

    return stepperStore.state.selections[key] || []
  })

  const hasSelections = computed(() => {
    return currentStepSelections.value.length > 0
  })

  const canProceed = computed(() => {
    if (stepperType.value === 'extra' || stepperType.value === 'optionalBase') {
      return true
    }
    return hasSelections.value
  })

  const hasAllMandatorySelections = computed(() => {
    if (stepperType.value === 'extra' || stepperType.value === 'optionalBase') {
      return true
    }

    for (let i = 0; i < availableSteps.value.length; i++) {
      const stepKey = String(i + 1)
      if (!stepperStore.state.selections[stepKey]?.length) {
        return false
      }
    }
    return true
  })

  const updateStepSelections = (selections: any[]) => {
    const key =
      stepperType.value === 'mandatory'
        ? stepperStore.state.currentStep
        : stepperType.value

    stepperStore.updateSelections(key, selections)
  }

  return {
    currentStepSelections,
    hasSelections,
    canProceed,
    hasAllMandatorySelections,
    updateStepSelections,
  }
}

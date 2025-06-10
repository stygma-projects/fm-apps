import type { StepperItem, StepperType, StepInfo } from '~/types/stepper.type'
import type { Ingredient } from '@fm-apps/db'
import { fr } from '~/i18n/locales/fr'

export const useStepperLogic = (
  item: Ref<StepperItem>,
  stepperType: Ref<StepperType>,
) => {
  const ingredientStore = useIngredientStore()

  const availableSteps = computed((): StepInfo[] => {
    switch (stepperType.value) {
      case 'mandatory':
        return getMandatorySteps()
      case 'extra':
      case 'optionalBase':
        return getSingleStep(stepperType.value)
      default:
        return []
    }
  })

  const getMandatorySteps = (): StepInfo[] => {
    if (!item.value?.mandatory) return []

    const steps: StepInfo[] = []
    item.value.mandatory.forEach((mandatoryCategory, index) => {
      const hasIngredients = ingredientStore.ingredients.some(
        (ingredient: Ingredient) =>
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
  }

  const getSingleStep = (type: 'extra' | 'optionalBase'): StepInfo[] => {
    const targetData = item.value?.[type]
    if (!targetData || targetData.length === 0) return []

    const labelKey =
      type === 'extra' ? 'extraIngredients' : 'optionalBaseIngredients'
    const label = fr.cart.info[labelKey]

    return [
      {
        category: { id: type, label },
        originalIndex: 0,
        stepIndex: 0,
        [`is${type.charAt(0).toUpperCase() + type.slice(1)}`]: true,
      },
    ]
  }

  const currentCategoryName = computed(() => {
    if (availableSteps.value.length === 0) {
      return item.value?.label
    }

    const stepperStore = useStepperStore()
    const currentStep = availableSteps.value[stepperStore.state.activeTabIndex]
    return currentStep?.category?.label || item.value?.label
  })

  const hasStepsToDisplay = computed(() => {
    const targetData = getTargetData()
    return targetData && targetData.length > 0
  })

  const getTargetData = () => {
    switch (stepperType.value) {
      case 'mandatory':
        return item.value?.mandatory
      case 'extra':
        return item.value?.extra
      case 'optionalBase':
        return item.value?.optionalBase
      default:
        return []
    }
  }

  return {
    availableSteps,
    currentCategoryName,
    hasStepsToDisplay,
    getTargetData,
  }
}

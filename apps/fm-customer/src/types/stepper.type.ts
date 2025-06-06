import type { Ingredient, IngredientCategory, Product } from '@fm-apps/db'

export type StepperType = 'mandatory' | 'extra' | 'optionalBase'

export interface StepperItem extends Product {
  mandatory: IngredientCategory[]
  optionalBase: Ingredient[]
  extra: Ingredient[]
}

export interface StepperProps {
  item: StepperItem
  stepLabels?: string[]
  visible: boolean
  stepperType?: StepperType
}

export interface StepperEmits {
  (
    e: 'complete',
    data: {
      item: StepperItem
      step: string
      selections: Record<string, any[]>
      stepperType?: StepperType
    },
  ): void
  (
    e: 'cancel',
    data: {
      item: StepperItem
      step: string
      selections: Record<string, any[]>
      stepperType?: StepperType
    },
  ): void
  (e: 'step-change', step: string): void
  (e: 'update:visible', visible: boolean): void
}

export interface StepperState {
  currentStep: string
  activeTabIndex: number
  dialogVisible: boolean
  mobileVisible: boolean
}

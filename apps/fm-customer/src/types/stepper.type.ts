import type { Ingredient, IngredientCategory, Product } from '@fm-apps/db'

export type StepperType = 'mandatory' | 'extra' | 'optionalBase'
export type NavigationVariant = 'desktop' | 'mobile'

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
  selectionsKey?: string
}

export interface StepperEmits {
  (e: 'complete', data: StepperCompletionData): void
  (e: 'cancel', data: StepperCompletionData): void
  (e: 'step-change', step: string): void
  (e: 'update:visible', visible: boolean): void
}

export interface StepperCompletionData {
  item: StepperItem
  step: string
  selections: Record<string, any[]>
  stepperType?: StepperType
}

export interface StepperState {
  currentStep: string
  activeTabIndex: number
  dialogVisible: boolean
  mobileVisible: boolean
  selections: Record<string, any[]>
}

export interface NavigationProps {
  isFirstStep: boolean
  isLastStep: boolean
  canProceed: boolean
  hasAllMandatorySelections: boolean
  variant?: NavigationVariant
  currentStep?: number
  totalSteps?: number
}

export interface StepInfo {
  category: IngredientCategory
  originalIndex: number
  stepIndex: number
  isExtra?: boolean
  isOptionalBase?: boolean
}

export interface StepperCompletionData {
  item: StepperItem
  step: string
  selections: Record<string, any[]>
  stepperType?: StepperType
}

export interface BaseStepperProps {
  visible: boolean
  availableSteps: StepInfo[]
  currentCategoryName: string
  currentStepSelections: number[]
  canProceed: boolean
  hasAllMandatorySelections: boolean
  item: StepperItem
  stepperType: StepperType
}

export interface DesktopStepperProps extends BaseStepperProps {
  currentStep: string
}

export interface MobileStepperProps extends BaseStepperProps {
  activeTabIndex: number
}

export interface StepInfo {
  category: IngredientCategory
  originalIndex: number
  stepIndex: number
  isExtra?: boolean
  isOptionalBase?: boolean
}

export interface NavigationProps {
  isFirstStep: boolean
  isLastStep: boolean
  canProceed: boolean
  hasAllMandatorySelections: boolean
  variant?: NavigationVariant
  currentStep?: number
  totalSteps?: number
}

import type { IngredientCategory, Product } from '@fm-apps/db'

export interface StepperItem extends Omit<Product, 'mandatory'> {
  mandatory?: Array<{
    category: IngredientCategory
    id: string
    label: string
    priceExclTax: number
    priceIncludingTax: number
    imageUrl?: string
    categoryId: string
  }>
}

export interface StepperProps {
  item: StepperItem
  stepLabels?: string[]
  visible: boolean
}

export interface StepperEmits {
  (
    e: 'complete',
    data: {
      item: StepperItem
      step: string
      selections: Record<string, any[]>
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

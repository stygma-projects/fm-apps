import type { OrderStatus, OrderType, WithdrawalMethod } from '@fm-apps/db'

export interface OrderDialog {
  id: string
  products?: Product[]
  type: OrderType
  status: OrderStatus
  withdrawalMethod: WithdrawalMethod
  terminalId?: number | null
  price: number
  createdAt: Date | string
}

export interface Product {
  id: string
  label: string
  priceExclTax: number
  priceIncludingTax: number
  imageUrl?: string
  available: boolean
  categoryId: string
  ingredients: IngredientInProduct[]
}

export interface Ingredient {
  id: string
  label: string
  priceExclTax: number
  priceIncludingTax: number
  imageUrl?: string
  categoryId: string
}

export interface IngredientInProduct {
  id: string
  ingredientId: string
  productId: string
  ingredient?: Ingredient
  composition: 'BASE' | 'EXTRA'
  mandatory: boolean
}

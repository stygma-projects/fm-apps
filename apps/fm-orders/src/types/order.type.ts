import type { OrderStatus, OrderType, WithdrawalMethod } from '@fm-apps/db'

// Interface pour l'ingrédient
export interface Ingredient {
  id: string
  label: string
  priceExclTax: number
  priceIncludingTax: number
  imageUrl?: string
  categoryId: string
}

// Interface pour la relation entre ingrédient et produit
export interface IngredientInProduct {
  id: string
  ingredientId: string
  productId: string
  ingredient?: Ingredient
  composition: 'BASE' | 'EXTRA'
  mandatory: boolean
}

// Interface pour le produit
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

// Interface pour la commande
export interface Order {
  orderId: number
  id: string
  products?: Product[]
  type: OrderType
  status: OrderStatus
  withdrawalMethod: WithdrawalMethod
  terminalId?: number | null
  price: number
  createdAt: Date | string
}

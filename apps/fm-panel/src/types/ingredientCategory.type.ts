import type { Ingredient, IngredientCategory } from "../../../../packages/db/generated/client"

export interface IngredientCategoryInput {
  id: string
  label: string
  imageUrl?: string
}
export interface IngredientInput {
  id: string
  label: string
  priceExclTax: number
  priceIncludingTax: number
  imageUrl: string | null
  categoryId: string
}
export type IngredientWithCategory = Ingredient & { category: IngredientCategory }


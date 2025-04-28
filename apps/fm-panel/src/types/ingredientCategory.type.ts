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

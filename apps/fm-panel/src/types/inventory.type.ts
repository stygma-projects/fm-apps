import type {
  GetByIdProductCategoryOutput,
  GetByIdProductOutput,
  GetByIdIngredientCategoryOutput,
  GetByIdIngredientOutput,
  GetByIdOrderOutput,
  GetByIdUserOutput,
} from '@fm-apps/trpc'

export type Product = NonNullable<GetByIdProductOutput>
export type Ingredient = NonNullable<GetByIdIngredientOutput>
export type IngredientCategory = NonNullable<GetByIdIngredientCategoryOutput>
export type ProductCategory = NonNullable<GetByIdProductCategoryOutput>
export type User = NonNullable<GetByIdUserOutput>

export interface ExtraIngredientInProductOrder {
  id: string
  productInOrderId: string
  ingredientId: string
  quantity: number
  ingredient: {
    id: string
    label: string
  }
}

export interface ProductInOrder {
  id: string
  productId: string
  orderId: string
  quantity?: number
  product: {
    id: string
    label: string
    nonUpdatable: {
      id: string
      label: string
    }[]
  }
  mandatory: {
    id: string
    label: string
  }[]
  optionalBase: {
    id: string
    label: string
  }[]
  extraIngredients: ExtraIngredientInProductOrder[]
}

export interface Order extends Omit<NonNullable<GetByIdOrderOutput>, 'orderHasProduct'> {
  orderHasProduct: ProductInOrder[]
}
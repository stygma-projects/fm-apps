import type {
  GetByIdProductCategoryOutput,
  GetByIdProductOutput,
  GetByIdIngredientCategoryOutput,
  GetByIdIngredientOutput,
  GetByIdOrderOutput,
  GetByIdUserOutput,
  GetByIdScheduleOutput,
  GetByIdOpeningHourOutput,
} from '@fm-apps/trpc'

export type Product = NonNullable<GetByIdProductOutput>
export type Ingredient = NonNullable<GetByIdIngredientOutput>
export type IngredientCategory = NonNullable<GetByIdIngredientCategoryOutput>
export type ProductCategory = NonNullable<GetByIdProductCategoryOutput>
export type User = NonNullable<GetByIdUserOutput>
export type Schedule = NonNullable<GetByIdScheduleOutput>
export type OpeningHour = NonNullable<GetByIdOpeningHourOutput>

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

export enum Days {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
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
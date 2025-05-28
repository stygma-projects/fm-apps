import type {
  GetByIdProductCategoryOutput,
  GetByIdProductOutput,
  GetByIdIngredientCategoryOutput,
  GetByIdIngredientOutput,
  GetByIdOrderOutput,
} from '@fm-apps/trpc'

export type Product = NonNullable<GetByIdProductOutput>
export type Ingredient = NonNullable<GetByIdIngredientOutput>
export type IngredientCategory = NonNullable<GetByIdIngredientCategoryOutput>
export type ProductCategory = NonNullable<GetByIdProductCategoryOutput>
export type Order = NonNullable<GetByIdOrderOutput>

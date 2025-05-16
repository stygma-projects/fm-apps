import type { GetByIdProductCategoryOutput, GetByIdProductOutput, GetByIdIngredientOutput, GetByIdOrderOutput } from "@fm-apps/trpc"

export type Order = NonNullable<GetByIdOrderOutput>
export type ProductCategory = NonNullable<GetByIdProductCategoryOutput>
export type Product = NonNullable<GetByIdProductOutput>
export type Ingredient = NonNullable<GetByIdIngredientOutput>
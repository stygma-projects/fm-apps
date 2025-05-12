import { RouterInput, RouterOutput } from '../..'

export type ListIngredientCategoryInput =
  RouterInput['inventory']['ingredientCategory']['list']
export type GetByIdIngredientCategoryInput =
  RouterInput['inventory']['ingredientCategory']['getById']
export type CreateIngredientCategoryInput =
  RouterInput['inventory']['ingredientCategory']['create']
export type UpdateIngredientCategoryInput =
  RouterInput['inventory']['ingredientCategory']['update']
export type DeleteIngredientCategoryInput =
  RouterInput['inventory']['ingredientCategory']['delete']
export type DeleteManyIngredientCategoryInput =
  RouterInput['inventory']['ingredientCategory']['deleteMany']

export type ListIngredientCategoryOutput =
  RouterOutput['inventory']['ingredientCategory']['list']
export type GetByIdIngredientCategoryOutput =
  RouterOutput['inventory']['ingredientCategory']['getById']
export type CreateIngredientCategoryOutput =
  RouterOutput['inventory']['ingredientCategory']['create']
export type UpdateIngredientCategoryOutput =
  RouterOutput['inventory']['ingredientCategory']['update']
export type DeleteIngredientCategoryOutput =
  RouterOutput['inventory']['ingredientCategory']['delete']
export type DeleteManyIngredientCategoryOutput =
  RouterOutput['inventory']['ingredientCategory']['deleteMany']

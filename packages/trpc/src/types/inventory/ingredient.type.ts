import { RouterInput, RouterOutput } from '../..'

export type ListIngredientInput = RouterInput['inventory']['ingredient']['list']
export type GetByIdIngredientInput =
  RouterInput['inventory']['ingredient']['getById']
export type CreateIngredientInput =
  RouterInput['inventory']['ingredient']['create']
export type UpdateIngredientInput =
  RouterInput['inventory']['ingredient']['update']
export type DeleteIngredientInput =
  RouterInput['inventory']['ingredient']['delete']
export type DeleteManyIngredientInput =
  RouterInput['inventory']['ingredient']['deleteMany']

export type ListIngredientOutput =
  RouterOutput['inventory']['ingredient']['list']
export type GetByIdIngredientOutput =
  RouterOutput['inventory']['ingredient']['getById']
export type CreateIngredientOutput =
  RouterOutput['inventory']['ingredient']['create']
export type UpdateIngredientOutput =
  RouterOutput['inventory']['ingredient']['update']
export type DeleteIngredientOutput =
  RouterOutput['inventory']['ingredient']['delete']
export type DeleteManyIngredientOutput =
  RouterOutput['inventory']['ingredient']['deleteMany']

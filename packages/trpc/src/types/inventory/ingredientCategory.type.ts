import { RouterInput, RouterOutput } from '../..'

export type ingredientCategoryListInput =
  RouterInput['inventory']['ingredientCategory']['list']
export type ingredientCategoryGetByIdInput =
  RouterInput['inventory']['ingredientCategory']['getById']
export type ingredientCategoryCreateInput =
  RouterInput['inventory']['ingredientCategory']['create']
export type ingredientCategoryUpdateInput =
  RouterInput['inventory']['ingredientCategory']['update']
export type ingredientCategoryDeleteInput =
  RouterInput['inventory']['ingredientCategory']['delete']

export type ingredientCategoryListOutput =
  RouterOutput['inventory']['ingredientCategory']['list']
export type ingredientCategoryGetByIdOutput =
  RouterOutput['inventory']['ingredientCategory']['getById']
export type ingredientCategoryCreateOutput =
  RouterOutput['inventory']['ingredientCategory']['create']
export type ingredientCategoryUpdateOutput =
  RouterOutput['inventory']['ingredientCategory']['update']
export type ingredientCategoryDeleteOutput =
  RouterOutput['inventory']['ingredientCategory']['delete']

import { RouterInput, RouterOutput } from '../..'

export type productCategoryListInput =
  RouterInput['inventory']['productCategory']['list']
export type productCategoryGetByIdInput =
  RouterInput['inventory']['productCategory']['getById']
export type productCategoryCreateInput =
  RouterInput['inventory']['productCategory']['create']
export type productCategoryUpdateInput =
  RouterInput['inventory']['productCategory']['update']
export type productCategoryDeleteInput =
  RouterInput['inventory']['productCategory']['delete']

export type productCategoryListOutput =
  RouterOutput['inventory']['productCategory']['list']
export type productCategoryGetByIdOutput =
  RouterOutput['inventory']['productCategory']['getById']
export type productCategoryCreateOutput =
  RouterOutput['inventory']['productCategory']['create']
export type productCategoryUpdateOutput =
  RouterOutput['inventory']['productCategory']['update']
export type productCategoryDeleteOutput =
  RouterOutput['inventory']['productCategory']['delete']

import { RouterInput, RouterOutput } from '../..'

export type ListProductCategoryInput =
  RouterInput['inventory']['productCategory']['list']
export type GetByIdProductCategoryInput =
  RouterInput['inventory']['productCategory']['getById']
export type CreateProductCategoryInput =
  RouterInput['inventory']['productCategory']['create']
export type UpdateProductCategoryInput =
  RouterInput['inventory']['productCategory']['update']
export type DeleteProductCategoryInput =
  RouterInput['inventory']['productCategory']['delete']
export type DeleteManyProductCategoryInput =
  RouterInput['inventory']['productCategory']['deleteMany']

export type ListProductCategoryOutput =
  RouterOutput['inventory']['productCategory']['list']
export type GetByIdProductCategoryOutput =
  RouterOutput['inventory']['productCategory']['getById']
export type CreateProductCategoryOutput =
  RouterOutput['inventory']['productCategory']['create']
export type UpdateProductCategoryOutput =
  RouterOutput['inventory']['productCategory']['update']
export type DeleteProductCategoryOutput =
  RouterOutput['inventory']['productCategory']['delete']
export type DeleteManyProductCategoryOutput =
  RouterOutput['inventory']['productCategory']['deleteMany']

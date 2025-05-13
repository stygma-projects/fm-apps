import { RouterInput, RouterOutput } from '../..'

export type ListProductInput =
  RouterInput['inventory']['product']['list']
export type GetByIdProductInput =
  RouterInput['inventory']['product']['getById']
export type CreateProductInput =
  RouterInput['inventory']['product']['create']
export type UpdateProductInput =
  RouterInput['inventory']['product']['update']
export type DeleteProductInput =
  RouterInput['inventory']['product']['delete']
export type DeleteManyProductInput =
  RouterInput['inventory']['product']['deleteMany']

export type ListProductOutput =
  RouterOutput['inventory']['product']['list']
export type GetByIdProductOutput =
  RouterOutput['inventory']['product']['getById']
export type CreateProductOutput =
  RouterOutput['inventory']['product']['create']
export type UpdateProductOutput =
  RouterOutput['inventory']['product']['update']
export type DeleteProductOutput =
  RouterOutput['inventory']['product']['delete']
export type DeleteManyProductOutput =
  RouterOutput['inventory']['product']['deleteMany']

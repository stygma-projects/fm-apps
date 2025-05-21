import { RouterInput, RouterOutput } from '../..'

export type ListProductInOrderInput =
  RouterInput['order']['orders']['list']
export type GetByIdProductInOrderInput =
  RouterInput['order']['orders']['getById']
export type CreateProductInOrderInput =
  RouterInput['order']['orders']['create']
export type UpdateProductInOrderInput =
  RouterInput['order']['orders']['update']
export type DeleteProductInOrderInput =
  RouterInput['order']['orders']['delete']
export type DeleteManyProductInOrderInput =
  RouterInput['order']['orders']['deleteMany']

export type ListProductInOrderOutput =
  RouterOutput['order']['orders']['list']
export type GetByIdProductInOrderOutput =
  RouterOutput['order']['orders']['getById']
export type CreateProductInOrderOutput =
  RouterOutput['order']['orders']['create']
export type UpdateProductInOrderOutput =
  RouterOutput['order']['orders']['update']
export type DeleteProductInOrderOutput =
  RouterOutput['order']['orders']['delete']
export type DeleteManyProductInOrderOutput =
  RouterOutput['order']['orders']['deleteMany']
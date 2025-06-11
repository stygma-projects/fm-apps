import { RouterInput, RouterOutput } from '../..'

export type ListProductInOrderInput =
  RouterInput['order']['productInOrder']['list']
export type GetByIdProductInOrderInput =
  RouterInput['order']['productInOrder']['getById']
export type CreateProductInOrderInput =
  RouterInput['order']['productInOrder']['create']
export type CreateManyProductInOrderInput =
  RouterInput['order']['productInOrder']['createMany']
export type UpdateProductInOrderInput =
  RouterInput['order']['productInOrder']['update']
export type DeleteProductInOrderInput =
  RouterInput['order']['productInOrder']['delete']
export type DeleteManyProductInOrderInput =
  RouterInput['order']['productInOrder']['deleteMany']

export type ListProductInOrderOutput =
  RouterOutput['order']['productInOrder']['list']
export type GetByIdProductInOrderOutput =
  RouterOutput['order']['productInOrder']['getById']
export type CreateProductInOrderOutput =
  RouterOutput['order']['productInOrder']['create']
export type CreateManyProductInOrderOutput =
  RouterOutput['order']['productInOrder']['createMany']
export type UpdateProductInOrderOutput =
  RouterOutput['order']['productInOrder']['update']
export type DeleteProductInOrderOutput =
  RouterOutput['order']['productInOrder']['delete']
export type DeleteManyProductInOrderOutput =
  RouterOutput['order']['productInOrder']['deleteMany']

import { RouterInput, RouterOutput } from '../..'

export type ListOrderInput =
  RouterInput['order']['orders']['list']
export type GetByIdOrderInput =
  RouterInput['order']['orders']['getById']
export type CreateOrderInput =
  RouterInput['order']['orders']['create']
export type UpdateOrderInput =
  RouterInput['order']['orders']['update']
export type DeleteOrderInput =
  RouterInput['order']['orders']['delete']
export type DeleteManyOrderInput =
  RouterInput['order']['orders']['deleteMany']

export type ListOrderOutput =
  RouterOutput['order']['orders']['list']
export type GetByIdOrderOutput =
  RouterOutput['order']['orders']['getById']
export type CreateOrderOutput =
  RouterOutput['order']['orders']['create']
export type UpdateOrderOutput =
  RouterOutput['order']['orders']['update']
export type DeleteOrderOutput =
  RouterOutput['order']['orders']['delete']
export type DeleteManyOrderOutput =
  RouterOutput['order']['orders']['deleteMany']
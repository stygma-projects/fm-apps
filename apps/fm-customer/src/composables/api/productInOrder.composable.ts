import { useTrpcQuery } from '../utils/useTrpcQuery'
import { useTrpcMutation } from '../utils/useTrpcMutation'
import type {
  ListProductInOrderOutput,
  CreateProductInOrderInput,
  CreateProductInOrderOutput,
  CreateManyProductInOrderInput,
  CreateManyProductInOrderOutput,
  UpdateProductInOrderInput,
  UpdateProductInOrderOutput,
  DeleteProductInOrderInput,
  DeleteProductInOrderOutput,
} from '@fm-apps/trpc'

export const useFetchAllProductInOrder = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcQuery<ListProductInOrderOutput>('productInOrder', () =>
    $trpc.order.productInOrder.list.query(),
  )
}

export const useCreateProductInOrder = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcMutation<CreateProductInOrderInput, CreateProductInOrderOutput>(
    (input: CreateProductInOrderInput) =>
      $trpc.order.productInOrder.create.mutate(input),
  )
}

export const useCreateManyProductInOrder = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcMutation<
    CreateManyProductInOrderInput,
    CreateManyProductInOrderOutput
  >((input: CreateManyProductInOrderInput) =>
    $trpc.order.productInOrder.createMany.mutate(input),
  )
}

export const useUpdateProductInOrder = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcMutation<UpdateProductInOrderInput, UpdateProductInOrderOutput>(
    (input: UpdateProductInOrderInput) =>
      $trpc.order.productInOrder.update.mutate(input),
  )
}

export const useDeleteProductInOrder = () => {
  const { $trpc } = useNuxtApp()

  return useTrpcMutation<DeleteProductInOrderInput, DeleteProductInOrderOutput>(
    (input: DeleteProductInOrderInput) =>
      $trpc.order.productInOrder.delete.mutate(input),
  )
}

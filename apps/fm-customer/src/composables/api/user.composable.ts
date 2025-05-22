import type { CreateUserOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'

export const useUser = () => {
  const { $trpc } = useNuxtApp()
  
  return useTrpcQuery<CreateUserOutput>(
    'productCategory',
    () => $trpc.inventory.productCategory.list.query()
  )
}
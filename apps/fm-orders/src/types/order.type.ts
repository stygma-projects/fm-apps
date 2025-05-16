import type { OrderStatus, OrderType, WithdrawalMethod } from '@fm-apps/db'
import type { GetByIdProductOutput } from '@fm-apps/trpc/'

export type Product = NonNullable<GetByIdProductOutput>
export interface Order {
  orderId: number
  id: string
  products?: Product[]
  type: OrderType
  status: OrderStatus
  withdrawalMethod: WithdrawalMethod
  terminalId?: number | null
  price: number
  createdAt: Date | string
}

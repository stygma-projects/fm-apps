// src/types/enums.type.ts
export const OrderStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  DELIVERED: 'DELIVERED',
  CANCELED: 'CANCELED',
} as const

export const WithdrawalMethod = {
  CASH: 'CASH',
  CARD: 'CARD',
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]
export type WithdrawalMethod =
  (typeof WithdrawalMethod)[keyof typeof WithdrawalMethod]

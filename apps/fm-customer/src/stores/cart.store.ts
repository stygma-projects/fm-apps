import type { Ingredient, Product } from '@fm-apps/db'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { StepperItem } from '~/types/stepper.type'

type CartItem = {
  id: string
  productId: string
  product: StepperItem
  mandatory: Ingredient[]
  optionalBase: Ingredient[]
  extra: Ingredient[]
  addedAt: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const addItem = (
    product: StepperItem,
    selections: Record<string, any[]> = {},
  ) => {
    const mandatoryIngredients: Ingredient[] = []

    for (const key in selections) {
      if (selections[key] && Array.isArray(selections[key])) {
        mandatoryIngredients.push(...selections[key])
      }
    }

    const cartItem: CartItem = {
      id: generateCartItemId(),
      productId: product.id,
      product: product,
      mandatory: mandatoryIngredients,
      optionalBase: [],
      extra: [],
      addedAt: new Date().toISOString(),
    }

    items.value.push(cartItem)
  }

  const getStoreContent = () => {
    return items.value
  }

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      let itemTotal = 0

      if ('priceIncludingTax' in item.product) {
        itemTotal += (item.product as Product).priceIncludingTax || 0
      }

      item.mandatory.forEach((ingredient) => {
        itemTotal += ingredient.priceIncludingTax || 0
      })

      item.optionalBase.forEach((ingredient) => {
        itemTotal += ingredient.priceIncludingTax || 0
      })

      item.extra.forEach((ingredient) => {
        itemTotal += ingredient.priceIncludingTax || 0
      })

      return total + itemTotal
    }, 0)
  })

  const totalItems = computed(() => items.value.length)

  const removeItem = (itemId: string) => {
    const index = items.value.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const generateCartItemId = () => {
    return Date.now().toString() + Math.random().toString(12).substr(2, 6)
  }

  const getOrderData = () => {
    return {
      orderId: Math.floor(Math.random() * 1000000),
      type: 'DELIVERY' as const,
      withdrawalMethod: 'CARD' as const,
      price: totalPrice.value,
      status: 'PENDING' as const,
    }
  }

  const getProductInOrderData = (orderId: string) => {
    return items.value.map((item) => ({
      id: item.id,
      productId: item.productId,
      orderId: orderId,
      mandatory: item.mandatory.map((ing) => ing.id),
      optionalBase: item.optionalBase.map((ing) => ing.id),
      extra: item.extra.map((ing) => ing.id),
    }))
  }

  return {
    items,
    addItem,
    getStoreContent,
    removeItem,
    clearCart,
    totalPrice,
    totalItems,
    getOrderData,
    getProductInOrderData,
  }
})

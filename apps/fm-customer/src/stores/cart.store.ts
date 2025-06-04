import type { Ingredient } from '@fm-apps/db'
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
  selectionsKey: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const stepperSelections = ref<Record<string, Record<string, any[]>>>({})

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

    const selectionsKey = generateCartItemId()
    const cartItem: CartItem = {
      id: generateCartItemId(),
      productId: product.id,
      product: product,
      mandatory: mandatoryIngredients,
      optionalBase: [],
      extra: [],
      addedAt: new Date().toISOString(),
      selectionsKey: selectionsKey,
    }
    stepperSelections.value[selectionsKey] = selections

    items.value.push(cartItem)
  }

  const addItemDirectly = (product: StepperItem) => {
    if (!product || !product.id) return

    const selectionsKey = generateCartItemId()
    const cartItem: CartItem = {
      id: generateCartItemId(),
      productId: product.id,
      product: product,
      mandatory: [],
      optionalBase: [],
      extra: [],
      addedAt: new Date().toISOString(),
      selectionsKey: selectionsKey,
    }

    stepperSelections.value[selectionsKey] = {}
    items.value.push(cartItem)
  }

  const updateItem = (
    selectionKey: string,
    newSelections: Record<string, any[]>,
  ) => {
    const item = items.value.find((item) => item.selectionsKey === selectionKey)

    if (!item) return

    stepperSelections.value[item.selectionsKey] = newSelections

    const mandatoryIngredients: Ingredient[] = []
    for (const key in newSelections) {
      if (newSelections[key] && Array.isArray(newSelections[key])) {
        mandatoryIngredients.push(...newSelections[key])
      }
    }

    item.mandatory = mandatoryIngredients
  }

  const getItemSelections = (selectionsKey: string) => {
    return stepperSelections.value[selectionsKey] || {}
  }

  const getStoreContent = () => {
    return items.value
  }

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      let itemTotal = 0

      itemTotal += item.product.price ?? 0

      item.optionalBase.forEach((ingredient) => {
        itemTotal += ingredient.price ?? 0
      })

      item.extra.forEach((ingredient) => {
        itemTotal += ingredient.price ?? 0
      })

      return total + itemTotal
    }, 0)
  })

  const totalItems = computed(() => items.value.length)

  const removeItem = (itemId: string) => {
    const item = items.value.find((item) => item.id === itemId)
    if (item) {
      delete stepperSelections.value[item.selectionsKey]
    }

    const index = items.value.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    items.value = []
    stepperSelections.value = {}
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
    addItemDirectly,
    updateItem,
    getItemSelections,
    getStoreContent,
    removeItem,
    clearCart,
    totalPrice,
    totalItems,
    getOrderData,
    getProductInOrderData,
  }
})

import type { Ingredient } from '@fm-apps/db'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { StepperItem, StepperType } from '~/types/stepper.type'

type IngredientQuantity = number | boolean

interface IngredientWithQuantity {
  ingredient: Ingredient
  quantity: IngredientQuantity
}

type CartItem = {
  id: string
  productId: string
  product: StepperItem
  mandatory: IngredientWithQuantity[]
  optionalBase: IngredientWithQuantity[]
  extra: IngredientWithQuantity[]
  addedAt: string
  selectionsKey: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const stepperSelections = ref<Record<string, Record<string, any[]>>>({})

  const groupIngredientsByQuantity = (
    ingredients: Ingredient[],
  ): IngredientWithQuantity[] => {
    const grouped = new Map<string, IngredientWithQuantity>()

    ingredients.forEach((ingredient) => {
      const key = ingredient.id

      if (grouped.has(key)) {
        const existing = grouped.get(key)!
        if (typeof existing.quantity === 'number') {
          existing.quantity += 1
        }
      } else {
        grouped.set(key, {
          ingredient,
          quantity: 1,
        })
      }
    })

    return Array.from(grouped.values())
  }

  const addItem = (
    product: StepperItem,
    selections: Record<string, any[]> = {},
    stepperType?: StepperType,
  ) => {
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

    organizeIngredientsByType(cartItem, selections, stepperType)

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
    stepperType?: StepperType,
  ) => {
    const item = items.value.find((item) => item.selectionsKey === selectionKey)
    if (!item) return

    if (stepperType === 'extra') {
      item.extra = []
      stepperSelections.value[item.selectionsKey] = {
        ...stepperSelections.value[item.selectionsKey],
        extra: newSelections.extra || [],
      }
    } else if (stepperType === 'optionalBase') {
      item.optionalBase = []
      stepperSelections.value[item.selectionsKey] = {
        ...stepperSelections.value[item.selectionsKey],
        optionalBase: newSelections.optionalBase || [],
      }
    } else {
      item.mandatory = []
      item.optionalBase = []
      item.extra = []
      stepperSelections.value[item.selectionsKey] = newSelections
    }

    organizeIngredientsByType(item, newSelections, stepperType)
  }

  const organizeIngredientsByType = (
    cartItem: CartItem,
    selections: Record<string, any[]>,
    stepperType?: StepperType,
  ) => {
    for (const key in selections) {
      if (!selections[key] || !Array.isArray(selections[key])) continue

      const ingredients = selections[key] as Ingredient[]
      const groupedIngredients = groupIngredientsByQuantity(ingredients)

      if (stepperType === 'extra') {
        if (key === 'extra') {
          cartItem.extra.push(...groupedIngredients)
        }
      } else if (stepperType === 'optionalBase') {
        if (key === 'optionalBase') {
          cartItem.optionalBase.push(...groupedIngredients)
        }
      } else if (stepperType === 'mandatory') {
        if (!isNaN(Number(key))) {
          cartItem.mandatory.push(...groupedIngredients)
        }
      } else {
        if (key === 'extra') {
          cartItem.extra.push(...groupedIngredients)
        } else if (key === 'optionalBase') {
          cartItem.optionalBase.push(...groupedIngredients)
        } else if (!isNaN(Number(key))) {
          cartItem.mandatory.push(...groupedIngredients)
        }
      }
    }
  }

  const getItemSelections = (selectionsKey: string) => {
    return stepperSelections.value[selectionsKey] || {}
  }

  const getStoreContent = () => {
    return items.value
  }

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      let itemTotal = item.product.price ?? 0

      const calculateIngredientPrice = (
        ingredient: Ingredient,
        quantity: number | boolean,
      ) => {
        const quantityValue =
          typeof quantity === 'boolean' ? (quantity ? 1 : 0) : quantity
        return (ingredient.price ?? 0) * quantityValue
      }

      item.extra.forEach(({ ingredient, quantity }) => {
        itemTotal += calculateIngredientPrice(ingredient, quantity)
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
    const expandIngredients = (
      ingredientsWithQty: IngredientWithQuantity[],
    ): string[] => {
      const expanded: string[] = []
      ingredientsWithQty.forEach(({ ingredient, quantity }) => {
        const ingredientId = toRaw(ingredient)?.id || ingredient.id
        const count =
          typeof quantity === 'boolean' ? (quantity ? 1 : 0) : quantity
        for (let i = 0; i < count; i++) {
          expanded.push(ingredientId)
        }
      })
      return expanded
    }

    const convertExtraToQuantityFormat = (
      ingredientsWithQty: IngredientWithQuantity[],
    ) => {
      return ingredientsWithQty.map(({ ingredient, quantity }) => {
        const quantityValue =
          typeof quantity === 'boolean' ? (quantity ? 1 : 0) : quantity
        return {
          ingredientId: toRaw(ingredient)?.id || ingredient.id,
          quantity: quantityValue,
        }
      })
    }

    const convertOptionalBase = (
      ingredientsWithQty: IngredientWithQuantity[],
    ) => {
      return ingredientsWithQty.map(({ ingredient, quantity }) => {
        const quantityValue =
          typeof quantity === 'boolean' ? (quantity ? 1 : 0) : quantity
        return {
          ingredientId: toRaw(ingredient)?.id || ingredient.id,
          quantity: quantityValue,
        }
      })
    }

    return items.value.map((item) => ({
      id: item.id,
      productId: item.productId,
      orderId: orderId,
      mandatory: expandIngredients(item.mandatory),
      optionalBase: convertOptionalBase(item.optionalBase),
      extra: convertExtraToQuantityFormat(item.extra),
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

import {
  OrderStatus,
  OrderType,
  WithdrawalMethod,
} from '../../generated/client'
import { prisma } from '../client'

export const seedOrders = async () => {
  const products = await prisma.product.findMany({
    include: {
      mandatory: true,
      optionalBase: true,
      extra: true,
    },
  })

  const ingredients = await prisma.ingredient.findMany({
    include: {
      category: true,
    },
  })

  const getProductByLabel = (label: string) => {
    const product = products.find((p) => p.label === label)
    if (!product) throw new Error(`Product "${label}" not found`)
    return product
  }

  const getIngredientByLabel = (label: string) => {
    const ingredient = ingredients.find((i) => i.label === label)
    if (!ingredient) throw new Error(`Ingredient "${label}" not found`)
    return ingredient
  }

  const order1 = await prisma.order.create({
    data: {
      orderId: 100001,
      type: OrderType.DELIVERY,
      status: OrderStatus.PENDING,
      withdrawalMethod: WithdrawalMethod.CARD,
      price: 12.5,
    },
  })

  const baconSandwich = getProductByLabel('Bacon Sandwich')
  await prisma.productInOrder.create({
    data: {
      productId: baconSandwich.id,
      orderId: order1.id,
      mandatory: {
        connect: [
          { id: getIngredientByLabel('Bacon').id },
          { id: getIngredientByLabel('Pain blanc').id },
          { id: getIngredientByLabel('Mayonnaise').id },
        ],
      },
      optionalBaseIngredient: {
        create: [
          {
            ingredientId: getIngredientByLabel('Salade').id,
            isSelected: true,
          },
          {
            ingredientId: getIngredientByLabel('Mayonnaise').id,
            isSelected: false,
          },
        ],
      },
      extraIngredients: {
        create: [
          {
            ingredientId: getIngredientByLabel('Cheddar').id,
            quantity: 2,
          },
          {
            ingredientId: getIngredientByLabel('Bacon').id,
            quantity: 3,
          },
        ],
      },
    },
  })

  const saladBowl = getProductByLabel('Salad Bowl')
  await prisma.productInOrder.create({
    data: {
      productId: saladBowl.id,
      orderId: order1.id,
      mandatory: {
        connect: [{ id: getIngredientByLabel('Salade').id }],
      },
      optionalBaseIngredient: {
        create: [
          {
            ingredientId: getIngredientByLabel('Pain blanc').id,
            isSelected: false,
          },
          {
            ingredientId: getIngredientByLabel('Pain doré').id,
            isSelected: true,
          },
        ],
      },
      extraIngredients: {
        create: [
          {
            ingredientId: getIngredientByLabel('Cheddar').id,
            quantity: 1,
          },
          {
            ingredientId: getIngredientByLabel('Bacon').id,
            quantity: 2,
          },
          {
            ingredientId: getIngredientByLabel('Pain doré').id,
            quantity: 4,
          },
        ],
      },
    },
  })

  const order2 = await prisma.order.create({
    data: {
      orderId: 100002,
      type: OrderType.PICKUP,
      status: OrderStatus.IN_PROGRESS,
      withdrawalMethod: WithdrawalMethod.CASH,
      price: 5.2,
    },
  })

  const cheddarPanini = getProductByLabel('Cheddar Panini')
  await prisma.productInOrder.create({
    data: {
      productId: cheddarPanini.id,
      orderId: order2.id,
      mandatory: {
        connect: [
          { id: getIngredientByLabel('Cheddar').id },
          { id: getIngredientByLabel('Pain doré').id },
        ],
      },
      optionalBaseIngredient: {
        create: [
          {
            ingredientId: getIngredientByLabel('Mayonnaise').id,
            isSelected: true,
          },
          {
            ingredientId: getIngredientByLabel('Salade').id,
            isSelected: true,
          },
        ],
      },
      extraIngredients: {
        create: [
          {
            ingredientId: getIngredientByLabel('Salade').id,
            quantity: 1,
          },
        ],
      },
    },
  })

  const order3 = await prisma.order.create({
    data: {
      orderId: 100003,
      type: OrderType.TERMINALS,
      status: OrderStatus.DELIVERED,
      withdrawalMethod: WithdrawalMethod.CARD,
      terminalId: 1,
      price: 8.7,
    },
  })

  await prisma.productInOrder.create({
    data: {
      productId: baconSandwich.id,
      orderId: order3.id,
      mandatory: {
        connect: [
          { id: getIngredientByLabel('Bacon').id },
          { id: getIngredientByLabel('Pain blanc').id },
          { id: getIngredientByLabel('Mayonnaise').id },
        ],
      },
      optionalBaseIngredient: {
        create: [
          {
            ingredientId: getIngredientByLabel('Salade').id,
            isSelected: false,
          },
          {
            ingredientId: getIngredientByLabel('Mayonnaise').id,
            isSelected: false,
          },
        ],
      },
      extraIngredients: {
        create: [
          {
            ingredientId: getIngredientByLabel('Cheddar').id,
            quantity: 1,
          },
          {
            ingredientId: getIngredientByLabel('Salade').id,
            quantity: 2,
          },
          {
            ingredientId: getIngredientByLabel('Pain doré').id,
            quantity: 1,
          },
        ],
      },
    },
  })
}

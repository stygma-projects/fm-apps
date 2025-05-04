import {
  OrderStatus,
  OrderType,
  PrismaClient,
  WithdrawalMethod,
} from '../index'
import { createIngredients } from './ingredient.seed'
import { createIngredientCategories } from './ingredientCategory.seed'
import { createProductCategories } from './productCategory.seed'

const prisma = new PrismaClient()

async function main() {
  // Insert ingredient types
  await createIngredientCategories()
  // Insert product categories
  await createProductCategories()
  // Insert ingredients
  await createIngredients()

  // Insert Order
  await prisma.order.createMany({
    data: [
      {
        type: OrderType.PICKUP,
        status: OrderStatus.DELIVERED,
        withdrawalMethod: WithdrawalMethod.CASH,
        price: 13.22,
      },
      {
        type: OrderType.DELIVERY,
        withdrawalMethod: WithdrawalMethod.CASH,
        price: 7.27,
      },
      {
        type: OrderType.TERMINALS,
        status: OrderStatus.IN_PROGRESS,
        withdrawalMethod: WithdrawalMethod.CARD,
        terminalId: 1,
        price: 10.0,
      },
    ],
  })
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

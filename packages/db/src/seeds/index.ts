import {seedInventory} from "./inventory.seed";
import {prisma} from "../client";
import { seedOrders } from "./order.seed";

async function main() {
    await seedInventory()
    await seedOrders()
}


main()
    .catch(() => {
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

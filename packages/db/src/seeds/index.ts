import {seedInventory} from "./inventory.seed";
import {prisma} from "../client";

async function main() {
    await seedInventory()
}


main()
    .catch((err) => {
        console.error("Error during seeding:", err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

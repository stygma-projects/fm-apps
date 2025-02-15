import {PrismaClient} from '@prisma/client'
import {hash} from 'bcrypt'
import {UserRole} from "./generated/client";

const prisma = new PrismaClient()

async function main() {
    // Insert admin user
    const passwordHash = await hash('admin', 10)

    await prisma.user.create({
        data: {
            email: 'vfourny@gmail.com',
            firstName: 'Valentin',
            lastName: 'Fourny',
            password: passwordHash,
            role: UserRole.ADMIN,
        },
    })

    // Insert ingredient types
    await prisma.ingredientType.createMany({
        data: [
            {label: 'Légumes'},
            {label: 'Produits laitier'},
            {label: 'Viande'},
            {label: 'Pain'},
            {label: 'Sauce'},
            {label: 'Cuisson'},
            {label: 'Condiment'},
            {label: 'Plat'},
            {label: 'Fromage'},
            {label: 'Gratiné'},
            {label: 'Féculents'},
        ],
        skipDuplicates: true,
    })

    // Insert product categories
    await prisma.productCategory.createMany({
        data: [
            {label: 'Sandwiches'},
            {label: 'Americains'},
            {label: 'Desserts'},
            {label: 'Boissons'},
            {label: 'Specialites'},
            {label: 'Hamburgers'},
            {label: 'Paninis'},
            {label: 'Frites'},
            {label: 'Viandes'},
            {label: 'Tacos'},
            {label: 'Assiettes'},
            {label: 'Demi-Americains'},
            {label: 'Wraps'},
            {label: 'Demi-Sandwichs'},
            {label: 'Flammeskueches'},
            {label: 'Nos Salades'},
        ],
        skipDuplicates: true,
    })
}

main()
    .catch(() => {
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

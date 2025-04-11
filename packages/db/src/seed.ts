import {PrismaClient} from "../generated/client";

const prisma = new PrismaClient()

async function main() {
    // Insert ingredient types
    await prisma.ingredientCategory.createMany({
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

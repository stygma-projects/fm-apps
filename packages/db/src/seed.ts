import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient()

async function main() {
  // Insert ingredient types
  await prisma.ingredientCategory.createMany({
    data: [
      { label: 'Légumes' },
      { label: 'Produits laitier' },
      { label: 'Viande' },
      { label: 'Pain' },
      { label: 'Sauce' },
      { label: 'Cuisson' },
      { label: 'Condiment' },
      { label: 'Plat' },
      { label: 'Fromage' },
      { label: 'Gratiné' },
      { label: 'Féculents' },
    ],
    skipDuplicates: true,
  })

  // Insert product categories
  await prisma.productCategory.createMany({
    data: [
      { label: 'Sandwiches' },
      { label: 'Americains' },
      { label: 'Desserts' },
      { label: 'Boissons' },
      { label: 'Specialites' },
      { label: 'Hamburgers' },
      { label: 'Paninis' },
      { label: 'Frites' },
      { label: 'Viandes' },
      { label: 'Tacos' },
      { label: 'Assiettes' },
      { label: 'Demi-Americains' },
      { label: 'Wraps' },
      { label: 'Demi-Sandwichs' },
      { label: 'Flammeskueches' },
      { label: 'Nos Salades' },
    ],
    skipDuplicates: true,
  })
  
  // Fetch the inserted ingredient categories
  const categories = await prisma.ingredientCategory.findMany()

  const getCategoryId = (label: string) => {
    const cat = categories.find((c) => c.label === label)
    if (!cat) throw new Error(`Category "${label}" not found`)
    return cat.id
  }

  // Insert ingredients
  await prisma.ingredient.createMany({
    data: [
      {
        label: 'Bacon',
        priceExclTax: 1.0,
        priceIncludingTax: 1.2,
        categoryId: getCategoryId('Viande'),
      },
      {
        label: 'Cheddar',
        priceExclTax: 0.8,
        priceIncludingTax: 0.96,
        categoryId: getCategoryId('Fromage'),
      },
      {
        label: 'Salade',
        priceExclTax: 0.3,
        priceIncludingTax: 0.36,
        categoryId: getCategoryId('Légumes'),
      },
      {
        label: 'Pain doré',
        priceExclTax: 0.5,
        priceIncludingTax: 0.6,
        categoryId: getCategoryId('Pain'),
      },
      {
        label: 'Mayonnaise',
        priceExclTax: 0.2,
        priceIncludingTax: 0.24,
        categoryId: getCategoryId('Sauce'),
      },
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

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
    const cat = categories.find(c => c.label === label)
    if (!cat) throw new Error(`Category "${label}" not found`)
    return cat.id
  }

  // Insert ingredients
  await prisma.ingredient.createMany({
    data: [
      {
        label: 'Bacon',
        priceExclTax: 1.00,
        priceIncludingTax: 1.20,
        categoryId: getCategoryId('Viande'),
      },
      {
        label: 'Cheddar',
        priceExclTax: 0.80,
        priceIncludingTax: 0.96,
        categoryId: getCategoryId('Fromage'),
      },
      {
        label: 'Salade',
        priceExclTax: 0.30,
        priceIncludingTax: 0.36,
        categoryId: getCategoryId('Légumes'),
      },
      {
        label: 'Pain doré',
        priceExclTax: 0.50,
        priceIncludingTax: 0.60,
        categoryId: getCategoryId('Pain'),
      },
      {
        label: 'Mayonnaise',
        priceExclTax: 0.20,
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

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

  const productCategories = await prisma.productCategory.findMany()

  const getProductCategoryId = (label: string) => {
    const cat = productCategories.find((c) => c.label === label)
    if (!cat) throw new Error(`Product Category "${label}" not found`)
    return cat.id
  }

  await prisma.product.deleteMany()
  // console.log('Creating products...');

  const getIngredientId = (label: string) => {
    const ing = ingredients.find((i) => i.label === label)
    if (!ing) throw new Error(`Ingredient "${label}" not found`)
    return ing.id
  }

  await prisma.product.create({
    data: {
      label: 'Jambon-beurre',
      priceExclTax: 1.0,
      priceIncludingTax: 1.2,
      categoryId: getProductCategoryId('Sandwiches'),
      ingredients: {
        create: [
          {
            composition: 'BASE',
            mandatory: true,
            ingredient: {
              connectOrCreate: {
                where: {
                  id: getIngredientId('Pain'),
                },
                create: {
                  label: 'Debug Bread',
                  priceExclTax: 0.5,
                  priceIncludingTax: 0.6,
                  categoryId: getCategoryId('Pain'),
                },
              },
            },
          },
        ],
      },
    },
    // {
    //   label: 'Poulet crudités',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Sandwiches')
    // },
    // {
    //   label: 'Américain savoyard',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Américains')
    // },
    // {
    //   label: 'Américain steak',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Américains')
    // },
    // {
    //   label: 'Petite frite',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Frites')
    // },
    // {
    //   label: 'Grande frite',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Frites')
    // },
    // {
    //   label: 'Cheeseburger',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Burgers')
    // },
    // {
    //   label: 'Commando',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Burgers')
    // },
    // {
    //   label: 'Tarte aux pommes',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Desserts')
    // },
    // {
    //   label: 'Fondant au chocolat',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Desserts')
    // },
    // {
    //   label: 'Coca-Cola',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Boissons')
    // },
    // {
    //   label: 'Oasis Tropical',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Boissons')
    // },
    // {
    //   label: 'Brochettes de boeuf',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Spécialités')
    // },
    // {
    //   label: 'Brochettes de poulet',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Spécialités')
    // },
    // {
    //   label: 'Panini 4 fromages',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Paninis')
    // },
    // {
    //   label: 'Panini poulet curry',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Paninis')
    // },
    // {
    //   label: 'Côtelette d\'agneau',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Viandes')
    // },
    // {
    //   label: 'Poulet rôti',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Viandes')
    // },
    // {
    //   label: 'Tacos 2 viandes',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Paninis')
    // },
    // {
    //   label: 'Tacos 3 viandes',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Légumes')
    // },
    // {
    //   label: 'Demi-américain steak',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Demi-américains')
    // },
    // {
    //   label: 'Demi-américain savoyard',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Demi-américains')
    // },
    // {
    //   label: 'Wrap au thon',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Wraps')
    // },
    // {
    //   label: 'Wrap poulet-avocat',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Wraps')
    // },
    // {
    //   label: 'Demi-sandwich jambon-beurre',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Demi-sandwich')
    // },
    // {
    //   label: 'Demi-sandwich poulet crudités',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Demi-sandwich')
    // },
    // {
    //   label: 'Flammekueche traditionnelle',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Flammekueche')
    // },
    // {
    //   label: 'Flammekueche fromage de chèvre et miel',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Flammekueche')
    // },
    // {
    //   label: 'Salade César',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Salade')
    // },
    // {
    //   label: 'Salade Niçoise',
    //   priceExclTax: 1.0,
    //   priceIncludingTax: 1.2,
    //   categoryId: getProductCategoryId('Salade')
    // }
    // skipDuplicates: true,
  })

  // console.log('Products created');

  const products = await prisma.product.findMany()
  const ingredients = await prisma.ingredient.findMany()
  const getProductId = (label: string) => {
    const prod = products.find((p) => p.label === label)
    if (!prod) throw new Error(`Product "${label}" not found`)
    return prod.id
  }

  // console.log('Creating ingredientInProducts...');

  await prisma.ingredientInProduct.createMany({
    data: [
      {
        productId: getProductId('Jambon-beurre'),
        ingredientId: getIngredientId('Pain doré'),
        composition: 'BASE',
        mandatory: true,
      },
      {
        productId: getProductId('Jambon-beurre'),
        ingredientId: getIngredientId('Mayonnaise'),
        composition: 'BASE',
        mandatory: true,
      },
      {
        productId: getProductId('Poulet crudités'),
        ingredientId: getIngredientId('Salade'),
        composition: 'BASE',
        mandatory: true,
      },
      {
        productId: getProductId('Poulet crudités'),
        ingredientId: getIngredientId('Mayonnaise'),
        composition: 'BASE',
        mandatory: true,
      },
      {
        productId: getProductId('Américain savoyard'),
        ingredientId: getIngredientId('Cheddar'),
        composition: 'BASE',
        mandatory: true,
      },
      {
        productId: getProductId('Américain savoyard'),
        ingredientId: getIngredientId('Bacon'),
        composition: 'BASE',
        mandatory: true,
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

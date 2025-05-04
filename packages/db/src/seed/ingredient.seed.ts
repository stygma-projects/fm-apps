import { IngredientCategory, prisma } from '../index'
import { IngredientCategoryLabel } from './ingredientCategory.seed'

const getCategoryIdByLabel = (
  label: IngredientCategoryLabel,
  ingredientCategories: IngredientCategory[],
) => {
  const category = ingredientCategories.find(
    (category) => category.label === label,
  )
  if (!category) throw new Error(`Category "${label}" not found`)
  return category.id
}

export const createIngredients = async () => {
  const ingredientCategories = await prisma.ingredientCategory.findMany()
  return await prisma.ingredient.createMany({
    data: [
      {
        label: 'Bacon',
        priceExclTax: 1.0,
        priceIncludingTax: 1.2,
        available: true,
        categoryId: getCategoryIdByLabel(
          IngredientCategoryLabel.MEAT,
          ingredientCategories,
        ),
      },
      {
        label: 'Cheddar',
        priceExclTax: 0.8,
        priceIncludingTax: 0.96,
        categoryId: getCategoryIdByLabel(
          IngredientCategoryLabel.CHEESE,
          ingredientCategories,
        ),
      },
      {
        label: 'Salade',
        priceExclTax: 0.3,
        priceIncludingTax: 0.36,
        categoryId: getCategoryIdByLabel(
          IngredientCategoryLabel.VEGETABLES,
          ingredientCategories,
        ),
      },
      {
        label: 'Pain doré',
        priceExclTax: 0.5,
        priceIncludingTax: 0.6,
        categoryId: getCategoryIdByLabel(
          IngredientCategoryLabel.BREAD,
          ingredientCategories,
        ),
      },
      {
        label: 'Mayonnaise',
        priceExclTax: 0.2,
        priceIncludingTax: 0.24,
        categoryId: getCategoryIdByLabel(
          IngredientCategoryLabel.SAUCES,
          ingredientCategories,
        ),
      },
    ],
  })
}

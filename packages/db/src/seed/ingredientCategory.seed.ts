import { prisma } from '../index'

export enum IngredientCategoryLabel {
  VEGETABLES = 'Légumes',
  DAIRY_PRODUCTS = 'Produits laitier',
  MEAT = 'Viandes',
  BREAD = 'Pains',
  SAUCES = 'Sauces',
  BAKING = 'Cuisson',
  CONDIMENTS = 'Condiments',
  DISH = 'Plats',
  CHEESE = 'Fromages',
  GRATINATED = 'Gratinés',
  STARCHY = 'Féculents',
}

export const createIngredientCategories = async () =>
  await prisma.ingredientCategory.createMany({
    data: [
      { label: IngredientCategoryLabel.VEGETABLES },
      { label: IngredientCategoryLabel.DAIRY_PRODUCTS },
      { label: IngredientCategoryLabel.MEAT },
      { label: IngredientCategoryLabel.BREAD },
      { label: IngredientCategoryLabel.SAUCES },
      { label: IngredientCategoryLabel.BAKING },
      { label: IngredientCategoryLabel.CONDIMENTS },
      { label: IngredientCategoryLabel.DISH },
      { label: IngredientCategoryLabel.CHEESE },
      { label: IngredientCategoryLabel.GRATINATED },
      { label: IngredientCategoryLabel.STARCHY },
    ],
  })

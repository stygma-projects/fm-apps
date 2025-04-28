import { productCategoryRouter } from './productCategory.route'
import { ingredientCategoryRouter } from './ingredientCategory.route'
import { router } from '../../trpc'
import { ingredientRouter } from './ingredient.route'

export const inventoryRouter = router({
  productCategory: productCategoryRouter,
  ingredientCategory: ingredientCategoryRouter,
  ingredient: ingredientRouter,
})

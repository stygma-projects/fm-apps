import { productCategoryRouter } from './productCategory.route'
import { ingredientCategoryRouter } from './ingredientCategory.route'
import { router } from '../../trpc'

export const inventoryRouter = router({
  productCategory: productCategoryRouter,
  ingredientCategory: ingredientCategoryRouter,
})

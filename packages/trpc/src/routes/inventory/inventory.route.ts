import { router } from '../../index'
import { productCategoryRouter } from './productCategory.route'
import { ingredientCategoryRouter } from './ingredientCategory.route'

export const inventoryRouter = router({
  productCategory: productCategoryRouter,
  ingredientCategory: ingredientCategoryRouter,
})

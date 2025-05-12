import { productCategoryRouter } from './productCategory.route'
import { ingredientCategoryRouter } from './ingredientCategory.route'
import { productRouter } from './product.route'
import { router } from '../../trpc'
import { ingredientRouter } from './ingredient.route'
import { ingredientInProductRouter } from './ingredientInProduct.route'

export const inventoryRouter = router({
  productCategory: productCategoryRouter,
  ingredientCategory: ingredientCategoryRouter,
  product: productRouter,
  ingredient: ingredientRouter,
  ingredientInProduct: ingredientInProductRouter,
})

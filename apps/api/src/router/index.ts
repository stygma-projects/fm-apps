import {router} from "../trpc";
import {productCategoryRouter} from "./productCategory.router";
import {productRouter} from "./product.router";
import {ingredientRouter} from "./ingredient.router";
import {ingredientCategoryRouter} from "./ingredientCategory.router";
import {orderRouter} from "./order.router";
import {userRouter} from "./user.router";

export const appRouter = router({
    productCategory: productCategoryRouter,
    product: productRouter,
    ingredient: ingredientRouter,
    ingredientCategory: ingredientCategoryRouter,
    order: orderRouter,
    user: userRouter,
});

export type AppRouter = typeof appRouter;


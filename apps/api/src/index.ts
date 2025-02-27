import {router} from './trpc';
import {
    ingredientCategoryRouter,
    orderRouter,
    productRouter,
    ingredientRouter, userRouter,
    productCategoryRouter
} from './router';

const appRouter = router({
    productCategory: productCategoryRouter,
    product: productRouter,
    ingredient: ingredientRouter,
    ingredientCategory: ingredientCategoryRouter,
    order: orderRouter,
    user: userRouter,
});

export type AppRouter = typeof appRouter;
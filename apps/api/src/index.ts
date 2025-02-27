import {publicProcedure, router} from './trpc';
import prisma from "./prisma";

const appRouter = router({
    productCategoryList:publicProcedure.query(async ()=>{
        const users = await prisma.productCategory.findMany();
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
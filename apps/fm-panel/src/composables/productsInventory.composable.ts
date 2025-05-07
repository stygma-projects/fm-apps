import { useMutation, useQuery } from 'vue-query'
import { trpc } from '../api/trpc'
import type { Product } from '@fm-apps/db' //IngredientInProduct
// import { useDeleteIngredientInProductForProduct, useUpdateIngredientInProduct, useDeleteIngredientInProductForManyProduct } from './ingredientInProduct.composable';

export const useFetchProducts = () => {
  return useQuery('fetchProducts', () => trpc.inventory.product.list.query())
}

export const useUpdateProduct = () => {
  // const updateIngredientInProduct = useUpdateIngredientInProduct()
  // const deleteIngredientInProductForProduct = useDeleteIngredientInProductForProduct()

  return useMutation('updateProduct', (a: { product: Product }) => {
    //, ingredients: IngredientInProduct[]
    // deleteIngredientInProductForProduct.mutate() //a.product
    // for (const ingredient of a.ingredients) {
    //   updateIngredientInProduct.create(ingredient)
    // }
    return trpc.inventory.product.update.mutate(a.product)
  })
}

export const useDeleteProduct = () => {
  // const deleteIngredientInProductForProduct = useDeleteIngredientInProductForProduct()

  return useMutation('deleteProduct', (product: Product) => {
    // deleteIngredientInProductForProduct.mutate() //product.ingredientInProduct ? [] ?
    return trpc.inventory.product.delete.mutate(product)
  })
}

export const useCreateProduct = () => {
  return useMutation(
    'createProduct',
    (a: {
      label: string
      priceExclTax: number
      priceIncludingTax: number
      categoryId: string
      imageUrl: string | null
      available: boolean
    }) => trpc.inventory.product.create.mutate(a),
  )
}

export const useDeleteManyProducts = () => {
  // const deleteIngredientInProductForManyProduct = useDeleteIngredientInProductForManyProduct()

  return useMutation('deleteManyProducts', (ids: string[]) => {
    // console.log('ids', ids)
    // deleteIngredientInProductForManyProduct.mutate(ids)
    return trpc.inventory.product.deleteMany.mutate(ids)
  })
}

// export const useUpdateProduct = () => {
//   const updateIngredientInProduct = useUpdateIngredientInProduct()

//   return useMutation('updateProduct', (a :{product: Product, ingredients: IngredientInProduct[]}) => {
//     const actualIngredients = useFetchIngredientInProductByProductId(a.product.id)
//     for (const ingredient of actualIngredients) {
//       updateIngredientInProduct.mutate(ingredient)
//     }
//     return trpc.inventory.product.update.mutate(a.product)
//   })
// }

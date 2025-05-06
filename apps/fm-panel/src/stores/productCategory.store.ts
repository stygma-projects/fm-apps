import { defineStore } from 'pinia'
import { useFetchProductCategories } from '../composables/productCategory.composable'

export default defineStore('productCategory', () => {
  const { data: productCategories } = useFetchProductCategories()


  return { productCategories }
})

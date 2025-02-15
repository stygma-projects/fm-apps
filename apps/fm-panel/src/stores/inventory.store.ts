import { defineStore } from "pinia";
import { ref } from "vue";
import { getProducts } from "../api/product.api.ts";
import { getProductCategories } from "../api/productCategory.api.ts";
import { getIngredientTypes } from "../api/ingredientType.api.ts";
import { getIngredients } from "../api/ingredient.api.ts";
import type {IngredientType, Product, Ingredient, ProductCategory} from "@prisma/client";

export default defineStore("inventory", () => {
  const products = ref<Product[]>([]);
  const productTypes = ref<ProductCategory[]>([]);
  const ingredients = ref<Ingredient[]>([]);
  const ingredientTypes = ref<IngredientType[]>([]);

  const fetchProducts = async () => {
    products.value = await getProducts();
  };

  const fetchProductCategories = async () => {
    productTypes.value = await getProductCategories();
  };

  const fetchIngredients = async () => {
    ingredients.value = await getIngredients();
  };

  const fetchIngredientTypes = async () => {
    ingredientTypes.value = await getIngredientTypes();
  };

  return {
    products,
    fetchProducts,
    fetchProductCategories,
    fetchIngredients,
    fetchIngredientTypes,
  };
});

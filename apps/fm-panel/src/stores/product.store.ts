import { defineStore } from "pinia";
import { ref } from "vue";
import { getProducts } from "../api/product.api.ts";

export default defineStore("product", () => {
  const products = ref(0);

  const fetchProducts = async () => {
    products.value = await getProducts();
  };

  return { products, fetchProducts };
});

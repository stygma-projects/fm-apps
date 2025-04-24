<template>
  <h1 class="">Catégories de Produits</h1>
  <br />
  <div>
    <div v-for="category in data" :key="category.id" class="">
      <h2 class="">{{ category.label }}</h2>
      <p v-if="category.imageUrl" class="">Image disponible</p>
      <p v-else class="">Pas d'image</p>
      <br />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetchProductCategories } from '../composables/productCategory.composable'

const { data } = useFetchProductCategories()
</script>

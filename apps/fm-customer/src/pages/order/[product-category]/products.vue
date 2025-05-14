<template>
  <div>
    <button 
      @click="$router.back()" 
      class="mb-4 flex items-center"
    >
     Retour
    </button>
    <Card :items="products"/>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import Card from '~/components/ui/card.component.vue'
import { useProduct } from '~/composables/api/product.composable'

const route = useRoute()

const categoryId = ref<string>('')

onMounted(() => {
  categoryId.value = route.params.productcategory as string
})

const { fetchAllProducts } = useProduct()

const products = computed(() => {
  return fetchAllProducts.data.value?.filter(
    product => product.categoryId === categoryId.value
  ) || []
})
</script>
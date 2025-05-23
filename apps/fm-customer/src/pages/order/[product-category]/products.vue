<!-- Dans products.vue -->
<template>
  <Splitter>
    <template #main-panel>
      <div>
        <Card 
          :items="products" 
          @item-click="openProductStepper"
          cy="product-card"
        />
        <Stepper 
          v-model:visible="showStepper"
          :item="selectedProduct" 
        />
      </div>
    </template>
  </Splitter>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import Card from '~/components/ui/card.component.vue';
import Stepper from '~/components/ui/stepper.component.vue';
import { useProduct } from '~/composables/api/product.composable';
import Splitter from '~/components/ui/splitter.component.vue';

const route = useRoute();

const categoryId = ref('');
const selectedProduct = ref(null);
const showStepper = ref(false);

onMounted(() => {
  categoryId.value = route.params.productcategory;
});

const { fetchAllProducts } = useProduct();

const products = computed(() => {
  return fetchAllProducts.data.value?.filter(
    product => product.categoryId === categoryId.value
  ) || [];
});

const openProductStepper = (product) => {
  selectedProduct.value = product;
  showStepper.value = true;
};
</script>
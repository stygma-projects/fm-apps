<template>
  <div>
    <PrimeButton 
      @click="$router.back()" 
      class="mb-8 flex items-center"
      data-cy="fmc-return-product-category-page"
    >
      {{ t('stepper.back') }}
    </PrimeButton>
    
    <Card 
      :items="products" 
      @item-click="openProductStepper"
      cy="product-card"
    />
    
    <Stepper 
      v-model:visible="showStepper"
      :item="selectedProduct" 
    />
    
    <!-- TODO: cart system -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import Card from '~/components/ui/card.component.vue';
import Stepper from '~/components/ui/stepper.component.vue';
import { useProduct } from '~/composables/api/product.composable';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
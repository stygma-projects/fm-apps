<template>
  <Splitter>
    <template #main-panel>
      <div>
        <Card
          :items="products"
          @item-click="openProductStepper"
          cy="product-card"
        />
      </div>
    </template>
    <template #cart-panel>
      <CartPanel />
    </template>
  </Splitter>
  <Stepper v-model:visible="showStepper" :item="selectedProduct" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import Card from '~/components/ui/card.component.vue'
import CartPanel from '~/components/ui/cart/cart-panel.vue'
import Stepper from '~/components/ui/stepper/stepper.component.vue'
import { useFetchAllProduct } from '~/composables/api/product.composable'
import Splitter from '~/components/ui/splitter.component.vue'

const route = useRoute()

const categoryId = ref('')
const selectedProduct = ref(null)
const showStepper = ref(false)

onMounted(() => {
  categoryId.value = route.params.productcategory
})

const { data } = useFetchAllProduct()

const products = computed(() => {
  return (
    data.value?.filter((product) => product.categoryId === categoryId.value) ||
    []
  )
})

const openProductStepper = (product) => {
  selectedProduct.value = product
  showStepper.value = true
}
</script>

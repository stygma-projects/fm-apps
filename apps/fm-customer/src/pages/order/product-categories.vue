<template>
  <Splitter>
    <template #main-panel>
      <Card
        :items="categories"
        :clickable="true"
        @item-click="navigateToCategory"
        cy="product-categories-card"
      />
    </template>

    <template #cart-panel>
      <CartPanel />
    </template>
  </Splitter>
</template>

<script setup lang="ts">
import Splitter from '~/components/ui/splitter.component.vue'
import { useRouter } from 'vue-router'
import Card from '~/components/ui/card.component.vue'
import CartPanel from '~/components/ui/cart/cart-panel.vue'
import { useFetchAllProductCategories } from '~/composables/api/productCategoy.composable'
import type { ProductCategory } from '../../../../../packages/db/generated/client'

const router = useRouter()
const { data } = useFetchAllProductCategories()

const categories = computed(() => {
  return data.value || []
})

const navigateToCategory = (category: ProductCategory) => {
  router.push({
    path: `/order/${category.id}/products`,
  })
}
</script>

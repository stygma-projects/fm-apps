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
        </template>
    </Splitter>
</template>

<script setup lang="ts">
import Splitter from '~/components/ui/splitter.component.vue';
import { useRouter } from 'vue-router'
import Card from '~/components/ui/card.component.vue'
import { useProductCategory } from '~/composables/api/productCategoy.composable'
import type { ProductCategory } from '../../../../../packages/db/generated/client'

const router = useRouter()
const { fetchAllProductCategories } = useProductCategory()

const categories = computed(() => {
  return fetchAllProductCategories.data.value || []
})

const navigateToCategory = (category: ProductCategory ) => {
  router.push({
    path: `/order/${category.id}/products`,
  })
}
</script>
<template>
  <div class="pb-12">
    <h1 class="text-2xl font-bold mb-6 text-center">{{ t('productCategory.title') }}</h1>
    <Card 
      :items="categories"
      :clickable="true"
      @item-click="navigateToCategory"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from '~/components/ui/card.component.vue'
import { useProductCategory } from '~/composables/api/productCategoy.composable'
import { useI18n } from 'vue-i18n'
import type { ProductCategory } from '../../../../../packages/db/generated/client'

const { t } = useI18n()

const router = useRouter()
const { data: productCategoryData } = useProductCategory()

const categories = computed(() => {
  return productCategoryData.value || []
})

const navigateToCategory = (category: ProductCategory ) => {
  router.push({
    path: `/order/${category.id}/products`,
  })
}
</script>
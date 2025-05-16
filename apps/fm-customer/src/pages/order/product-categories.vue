<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-center">{{ t('productCategory.title') }}</h1>
    <Card 
      :items="categories"
      :clickable="true"
      @item-click="navigateToCategory"
    >
      <template #card-label="{ item }">
        <div class="text-center h-16 flex items-center justify-center font-bold">
          <span>{{ item.label }}</span>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from '~/components/ui/card.component.vue'
import { useProductCategory } from '~/composables/api/productCategoy.composable'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const { data: productCategoryData } = useProductCategory()

const categories = computed(() => {
  return productCategoryData.value || []
})

const navigateToCategory = (category) => {
  router.push({
    path: `/order/${category.id}/products`,
  })
}
</script>
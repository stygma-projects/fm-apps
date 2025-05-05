<template>
  <div class="h-full flex flex-col">
    <!-- En-tête avec ID et heure -->
    <div class="p-3 flex justify-between items-center bg-blue-500 text-white">
      <div class="flex items-center">
        <i class="pi pi-file-o mr-2 text-lg"></i>
        <span class="font-semibold text-lg">{{ order.id.slice(-5) }}</span>
      </div>
      <div class="text-lg">{{ formatTime(order.createdAt) }}</div>
    </div>

    <!-- Informations de la commande -->
    <div class="bg-white p-4 flex-grow">
      <div v-if="order.terminalId" class="mb-3">
        <span class="text-base">{{ t('terminal') }}</span>
        <span class="font-medium text-lg">{{ order.terminalId }}</span>
      </div>

      <!-- Liste des produits avec ingrédients -->
      <div v-if="order.products && order.products.length > 0">
        <div
          v-for="(product, index) in order.products"
          :key="product.id"
          class="mb-4 pb-3 border-b border-gray-300 last:border-0"
        >
          <div class="flex justify-between font-medium">
            <div class="flex items-center">
              <span
                class="bg-blue-100 text-blue-800 rounded-full h-7 w-7 flex items-center justify-center mr-2 text-base"
              >
                {{ index + 1 }}
              </span>
              <span class="text-lg">{{ product.label }}</span>
            </div>
          </div>

          <!-- Ingrédients du produit -->
          <div
            v-if="product.ingredients && product.ingredients.length > 0"
            class="ml-9 mt-2"
          >
            <div class="text-base text-gray-500 mb-1 font-medium">
              {{ t('ingredients') }}
            </div>
            <ul class="text-base text-gray-600 list-disc pl-4">
              <li
                v-for="ingredientItem in product.ingredients"
                :key="ingredientItem.id"
                class="mb-1"
              >
                {{ ingredientItem.ingredient?.label }}
                <span
                  v-if="ingredientItem.composition === 'EXTRA'"
                  class="text-blue-600 font-medium"
                >
                  {{ t('composition.extra') }}</span
                >
                <span v-else class="text-gray-400">{{
                  t('composition.optional')
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '../types/order.type'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
const props = defineProps<{
  order: Order
}>()

const { order } = props

function formatTime(dateString: string | Date): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
</script>

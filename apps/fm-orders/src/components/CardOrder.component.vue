<template>
  <div class="h-full flex flex-col">
    <!-- En-tête avec ID et heure -->
    <div class="p-3 flex justify-between items-center bg-blue-500 text-white">
      <div class="flex items-center">
        <i class="pi pi-file-o mr-2 text-lg"></i>
        <span class="font-semibold text-lg">#{{ order.orderId }}</span>
      </div>
      <div class="text-lg">{{ utils.formatHour(order.createdAt) }}</div>
    </div>

    <!-- Informations de la commande -->
    <div class="bg-white p-4 flex-grow">
      <div v-if="order.terminalId" class="mb-3">
        <span class="text-base">{{ t('terminal') }}</span>
        <span class="font-medium text-lg ml-2">{{ order.terminalId }}</span>
      </div>

      <!-- Liste des produits avec ingrédients -->
      <div v-if="order.orderHasProduct && order.orderHasProduct.length > 0">
        <div
          v-for="(productInOrder, index) in order.orderHasProduct"
          :key="productInOrder.id"
          class="mb-4 pb-3 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0"
        >
          <div class="flex justify-between items-start">
            <div class="flex items-start">
              <span
                class="bg-blue-100 text-blue-800 rounded-full h-7 w-7 flex items-center justify-center mr-2 text-base flex-shrink-0 mt-0.5"
              >
                {{ index + 1 }}
              </span>
              <div>
                <div class="font-medium text-lg">
                  {{ productInOrder.product?.label || 'Produit inconnu' }}
                  <span v-if="productInOrder.quantity > 1" class="text-gray-500 text-base">
                    ×{{ productInOrder.quantity }}
                  </span>
                </div>
                
                <!-- Ingrédients non modifiables -->
                <div v-if="productInOrder.product?.nonUpdatable?.length" class="mt-1">
                  <ul class="text-sm text-gray-600">
                    <li 
                      v-for="ingredient in productInOrder.product.nonUpdatable" 
                      :key="ingredient.id"
                      class="flex items-center"
                    >
                      {{ ingredient.label }}
                      <span class="ml-2 text-xs text-gray-400">(non modifiable)</span>
                    </li>
                  </ul>
                </div>

                <!-- Ingrédients obligatoires -->
                <div v-if="productInOrder.mandatory?.length" class="mt-1">
                  <ul class="text-sm text-gray-600">
                    <li 
                      v-for="ingredient in productInOrder.mandatory" 
                      :key="ingredient.id"
                    >
                      {{ ingredient.label }}
                      <span class="ml-2 text-xs text-gray-400">(obligatoire)</span>
                    </li>
                  </ul>
                </div>

                <!-- Ingrédients optionnels de base -->
                <div v-if="productInOrder.optionalBase?.length" class="mt-1">
                  <ul class="text-sm text-gray-600">
                    <li 
                      v-for="ingredient in productInOrder.optionalBase" 
                      :key="ingredient.id"
                    >
                      {{ ingredient.label }}
                      <span class="ml-2 text-xs text-gray-400">(optionnel)</span>
                    </li>
                  </ul>
                </div>

                <!-- Ingrédients supplémentaires -->
                <div v-if="productInOrder.extraIngredients?.length" class="mt-1">
                  <ul class="text-sm text-gray-600">
                    <li 
                      v-for="extra in productInOrder.extraIngredients" 
                      :key="extra.id"
                    >
                      {{ extra.ingredient.label }}
                      <span class="ml-2 text-xs text-gray-400">
                        (supplément ×{{ extra.quantity || 1 }})
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '../types/order.type'
import utils from '@fm-apps/toolkit/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
const props = defineProps<{
  order: Order
}>()

const { order } = props
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- En-tête avec ID et heure -->
    <div class="p-3 flex justify-between items-center bg-blue-500 text-white">
      <div class="flex items-center">
        <i class="pi pi-file-o mr-2 text-lg"></i>
        <span class="font-semibold text-lg">{{ order.orderId }}</span>
      </div>
      <div class="text-lg">{{ formatHour(order.createdAt) }}</div>
    </div>

    <!-- Informations de la commande -->
    <div class="bg-white p-4 flex-grow">
      <div v-if="order.terminalId" class="mb-3">
        <span class="text-base">{{ t('terminal') }}</span>
        <span class="font-medium text-lg">{{ order.terminalId }}</span>
      </div>

      <!-- Liste des produits avec ingrédients -->
      <div v-if="order.orderHasProduct && order.orderHasProduct.length > 0">
        <div
          v-for="(relationOrderProduct, index) in order.orderHasProduct"
          :key="relationOrderProduct.productId"
          class="mb-4 pb-3 border-b border-gray-300 last:border-0"
        >
          <div class="flex justify-between font-medium">
            <div class="flex items-center">
              <span
                class="bg-blue-100 text-blue-800 rounded-full h-7 w-7 flex items-center justify-center mr-2 text-base"
              >
                {{ index + 1 }}
              </span>
              <span class="text-lg">{{ relationOrderProduct.product.label }}</span>
            </div>
          </div>

          <div
            v-if="relationOrderProduct.product.nonUpdatable && relationOrderProduct.product.nonUpdatable.length > 0"
            class="ml-9 mt-2"
          >
            <div class="text-base text-gray-500 mb-1 font-medium">
              {{ t('ingredients') }}
            </div>
            <ul class="text-base text-gray-600 list-disc pl-4">
              <li
                v-for="ingredientItem in relationOrderProduct.product.nonUpdatable"
                :key="ingredientItem.id"
                class="mb-1"
              >
                {{ ingredientItem.label }}
                <span class="text-gray-400">{{
                  t('ingredientTypes.nonUpdatable')
                }}</span>
              </li>
            </ul>
          </div>

          <div
            v-if="relationOrderProduct.mandatory && relationOrderProduct.mandatory.length > 0"
            class="ml-9 mt-2"
          >
            <ul class="text-base text-gray-600 list-disc pl-4">
              <li
                v-for="ingredientItem in relationOrderProduct.mandatory"
                :key="ingredientItem.id"
                class="mb-1"
              >
                {{ ingredientItem.label }}
                <span class="text-gray-400">{{
                  t('ingredientTypes.mandatory')
                }}</span>
              </li>
            </ul>
          </div>

          <div
            v-if="relationOrderProduct.optionalBase && relationOrderProduct.optionalBase.length > 0"
            class="ml-9 mt-2"
          >
            <ul class="text-base text-gray-600 list-disc pl-4">
              <li
                v-for="ingredientItem in relationOrderProduct.optionalBase"
                :key="ingredientItem.id"
                class="mb-1"
              >
                {{ ingredientItem.label }}
                <span class="text-gray-400">{{
                  t('ingredientTypes.optionalBase')
                }}</span>
              </li>
            </ul>
          </div>

          <div
            v-if="relationOrderProduct.extra && relationOrderProduct.extra.length > 0"
            class="ml-9 mt-2"
          >
            <ul class="text-base text-gray-600 list-disc pl-4">
              <li
                v-for="ingredientItem in relationOrderProduct.extra"
                :key="ingredientItem.id"
                class="mb-1"
              >
                {{ ingredientItem.label }}
                <span class="text-gray-400">{{
                  t('ingredientTypes.extra')
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
import formatHour from '@fm-apps/toolkit/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
const props = defineProps<{
  order: Order
}>()

const { order } = props
</script>

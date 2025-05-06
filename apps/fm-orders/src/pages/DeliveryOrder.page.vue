<template>
  <div class="grid grid-cols-6 w-full h-full">
    <!-- Colonnes avec commandes -->
    <div
      v-for="order in deliveryOrders"
      :key="order.id"
      class="border-r border-gray-300 last:border-r-0 h-full"
    >
      <CardOrder :order="order" @refresh="handleRefresh" />
    </div>
    <!-- Colonnes vides si moins de 6 commandes -->
    <div
      v-for="i in 6 - deliveryOrders.length"
      :key="'empty-' + i"
      class="border-r border-gray-300 last:border-r-0 h-full"
    >
      <div class="h-full flex items-center justify-center bg-gray-50">
        <span class="text-gray-500">{{ t('pending') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchOrders } from '../composables/order.composable'
import CardOrder from '../components/CardOrder.component.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { deliveryOrders, refetch } = useFetchOrders()

const handleRefresh = () => {
  refetch()
}
</script>

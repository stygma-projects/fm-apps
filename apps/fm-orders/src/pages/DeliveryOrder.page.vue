<template>
  <div class="grid grid-cols-6 w-full h-full">
    <div
      v-for="i in 6"
      :key="i"
      class="border-r border-gray-300 last:border-r-0 h-full"
    >
      <CardOrder
        v-if="deliveryOrders[i - 1]"
        :order="deliveryOrders[i - 1]"
        @refresh="handleRefresh"
      />
      <div v-else class="h-full flex items-center justify-center bg-gray-50">
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

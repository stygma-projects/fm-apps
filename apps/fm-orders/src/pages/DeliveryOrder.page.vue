<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <CardOrder
      v-for="order in deliveryOrders"
      :key="order.id"
      :order="order"
      @refresh="handleRefresh"
    />
  </div>
</template>

<script setup lang="ts">
import { useFetchOrders } from '../composables/order.composable'
import CardOrder from '../components/CardOrder.component.vue'

const { deliveryOrders, refetch } = useFetchOrders()

const handleRefresh = () => {
  refetch()
}
</script>

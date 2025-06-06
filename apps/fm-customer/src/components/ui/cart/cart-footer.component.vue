<template>
  <div class="lg:px-[26vh] pb-1">
    <!-- Total Summary -->
    <div class="flex justify-between items-center mb-4">
      <span class="text-lg font-semibold text-gray-800">
        {{ fr.cart.total }}
      </span>
      <div class="text-right">
        <div
          class="text-2xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
        >
          {{ cartStore.totalPrice.toFixed(2) }} €
        </div>
        <div class="text-xs text-gray-500">TTC</div>
      </div>
    </div>

    <!-- Order Button -->
    <button
      @click="$emit('confirmOrder')"
      class="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 text-center"
    >
      <span class="text-pink-700 lg:text-xl">
        {{ fr.validate.order }}
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { fr } from '../../../i18n/locales/fr'

const cartStore = useCartStore()

defineEmits<{
  confirmOrder: []
}>()
</script>

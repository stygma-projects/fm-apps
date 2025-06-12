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
    <Button
      @click="$emit('confirmOrder')"
      :text="fr.validate.order"
      :severity="Severity.WARNING"
      :full-width="Width.FULL"
    />
  </div>
</template>

<script lang="ts" setup>
import { fr } from '../../../i18n/locales/fr'
import Button from '~/components/ui/button.component.vue'
import { Severity, Width } from '~/types/primevue.type'

const cartStore = useCartStore()

defineEmits<{
  confirmOrder: []
}>()
</script>

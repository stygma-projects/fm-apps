<template>
  <!-- Fixed cart button -->
  <PrimeButton
    severity="success"
    @click="$emit('openCart')"
    class="w-full flex items-center justify-between"
  >
    <div class="flex items-center gap-2">
      <span>{{ fr.cart.title }}</span>
    </div>
    <span>{{ cartStore.totalPrice.toFixed(2) }} €</span>
  </PrimeButton>
</template>

<script lang="ts" setup>
import { fr } from '../../i18n/locales/fr'

const cartStore = useCartStore()

defineEmits<{
  openCart: []
}>()
</script>

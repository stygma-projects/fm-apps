<template>
    <span class="flex items-center gap-4 text-3xl font-bold text-rose-700">
        <div class="relative">
            <i class="pi pi-shopping-cart" style="font-size: 2rem;"></i>
            <PrimeOverlayBadge v-if="cartStore.totalItems > 0" :value="cartStore.totalItems" severity="success" class="-top-10" />
        </div>
        <p>
            {{ fr.cart.title }} : {{ cartStore.totalPrice.toFixed(2) }} €
        </p>
    </span>
</template>

<script setup lang="ts">
import { fr } from '../i18n/locales/fr';

const cartStore = useCartStore()
</script>
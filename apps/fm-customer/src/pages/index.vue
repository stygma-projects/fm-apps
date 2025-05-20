<template>
  <NuxtLink 
    to="/order/product-categories" 
    data-cy="fmc-order-button"
    class="inline-block px-6 py-3 bg-red-300 hover:bg-red-400 font-bold rounded-full shadow-md"
  >
    {{ t('order.title') }}
  </NuxtLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
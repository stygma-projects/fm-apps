<template>
  <div class="pt-8 flex justify-center">
    <Button
      :text="fr.order.title"
      :full-width="Width.AUTO"
      :severity="Severity.DANGER"
      to="/order/product-categories"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button.component.vue'
import { fr } from '~/i18n/locales/fr'
import { Severity, Width } from '~/types/primevue.type'
</script>

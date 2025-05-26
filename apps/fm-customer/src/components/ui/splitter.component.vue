<template>
  <div class="w-full h-full overflow-hidden">
    <!-- Desktop view -->
    <div class="hidden lg:flex h-full">
      <PrimeSplitter :pt="desktopPt">
        <!-- page panel - SCROLLABLE -->
        <PrimeSplitterPanel :size="70" :minSize="70">
          <div class="h-full flex flex-col overflow-hidden">
            <h1 class="flex-shrink-0 p-4 pb-8 text-2xl font-bold text-center">
              {{ fr.productCategory.title }}
            </h1>
            <div class="flex-1 overflow-y-auto px-10 pb-8">
              <slot name="main-panel"></slot>
            </div>
          </div>
        </PrimeSplitterPanel>

        <!-- cart panel - FIXED -->
        <PrimeSplitterPanel class="flex flex-col pb-8" :size="30" :minSize="30">
          <h1 class="p-4 text-2xl font-bold text-center">
            {{ fr.cart.title }}
          </h1>
          <div class="px-4">
            <slot name="cart-panel"></slot>
          </div>
        </PrimeSplitterPanel>
      </PrimeSplitter>
    </div>

    <!-- Mobile view -->
    <div class="block lg:hidden h-full overflow-y-auto">
      <!-- Main content -->
      <div class="pb-20">
        <div class="p-4">
          <div class="bg-white rounded-lg shadow-md p-4">
            <h1
              class="text-xl font-bold text-center mb-4 border-b border-amber-300 pb-2"
            >
              {{ fr.productCategory.title }}
            </h1>
            <slot name="main-panel"></slot>
          </div>
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <Button @openCart="openCart = true" />
      </div>

      <!-- Cart drawer -->
      <PrimeDrawer
        v-model:visible="openCart"
        position="bottom"
        :header="fr.cart.title"
        :pt="{
          root: {
            class: 'max-h-[80vh]',
            style: 'height: auto',
          },
          content: {
            class: 'h-full overflow-y-auto',
          },
          header: {
            class: 'relative',
          },
          title: {
            class: 'text-xl font-bold absolute left-1/2 -translate-x-1/2',
          },
          closeButton: {
            class: 'relative z-10',
          },
        }"
      >
        <slot name="cart-panel"></slot>
      </PrimeDrawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fr } from '../../i18n/locales/fr'
import Button from './button.component.vue'

const openCart = ref(false)

const desktopPt = {
  root: {
    class: 'h-full w-full',
  },
}
</script>

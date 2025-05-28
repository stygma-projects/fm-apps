<template>
  <div class="w-full h-full overflow-hidden">
    <!-- Desktop View -->
    <div v-if="!isMobile" class="flex h-full" data-cy="fmc-desktop-view">
      <PrimeSplitter :pt="desktopPt">
        <!-- page panel - SCROLLABLE -->
        <PrimeSplitterPanel
          :size="70"
          :minSize="70"
          data-cy="fmc-left-splitter-panel"
        >
          <div class="h-full flex flex-col overflow-hidden">
            <div class="flex-shrink-0 p-4 pb-8 relative">
              <BackLink :text="fr.stepper.back" />

              <h1 class="text-2xl font-bold text-center">
                {{ fr.productCategory.title }}
              </h1>
            </div>
            <div class="flex-1 overflow-y-auto px-10 pb-8">
              <slot name="main-panel" :is-mobile="false"></slot>
            </div>
          </div>
        </PrimeSplitterPanel>

        <!-- cart panel - FIXED -->
        <PrimeSplitterPanel
          class="flex flex-col pb-8"
          :size="30"
          :minSize="30"
          data-cy="fmc-right-splitter-panel"
        >
          <h1 class="p-4 text-2xl font-bold text-center">
            {{ fr.cart.title }}
          </h1>
          <div class="px-4">
            <slot name="cart-panel" :is-mobile="false"></slot>
          </div>
        </PrimeSplitterPanel>
      </PrimeSplitter>
    </div>

    <!-- Mobile view -->
    <div v-else class="h-full overflow-y-auto" data-cy="fmc-mobile-view">
      <!-- Main content -->
      <div class="pb-20">
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="relative mb-4">
            <BackLink :text="fr.stepper.back" />

            <h1
              class="text-xl font-bold text-center border-b border-amber-300 pb-2 pt-6"
            >
              {{ fr.productCategory.title }}
            </h1>
          </div>
          <slot name="main-panel" :is-mobile="true"></slot>
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <Button
          data-cy="fmc-drawer-button"
          :text="fr.cart.title"
          @click="openCart = true"
        />
      </div>

      <!-- Cart drawer -->
      <PrimeDrawer
        v-model:visible="openCart"
        position="bottom"
        :header="fr.cart.title"
        :pt="{
          root: { class: 'max-h-[80vh]', style: 'height: auto' },
          content: { class: 'h-full overflow-y-auto' },
          header: { class: 'relative' },
          title: {
            class: 'text-xl font-bold absolute left-1/2 -translate-x-1/2',
          },
          closeButton: { class: 'relative z-10' },
        }"
      >
        <slot name="cart-panel" :is-mobile="true"></slot>
      </PrimeDrawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { fr } from '../../i18n/locales/fr'
import Button from './button.component.vue'
import BackLink from './back-link.component.vue'

const openCart = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const desktopPt = {
  root: { class: 'h-full w-full' },
}
</script>

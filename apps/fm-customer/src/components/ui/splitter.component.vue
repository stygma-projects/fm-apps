<template>
    <div class="w-full h-full overflow-hidden">
        <!-- Desktop view -->
        <div class="hidden lg:flex h-full">
            <PrimeSplitter :pt="desktopPt">
                <!-- page panel - SCROLLABLE -->
                <PrimeSplitterPanel :size="70" :minSize="70">
                    <div class="h-full flex flex-col overflow-hidden">
                        <h1 class="flex-shrink-0 p-4 pb-8 text-2xl font-bold text-center">{{ fr.productCategory.title }}</h1>
                        <div class="flex-1 overflow-y-auto px-10 pb-8">
                            <slot name="main-panel"></slot>
                        </div>
                    </div>
                </PrimeSplitterPanel>

                <!-- cart panel - FIXED -->
                <PrimeSplitterPanel class="flex flex-col pb-8" :size="30" :minSize="30">
                    <h1 class="p-4 text-2xl font-bold text-center">{{ fr.cart.title }}</h1>
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
                        <h1 class="text-xl font-bold text-center mb-4 border-b border-amber-300 pb-2">{{ fr.productCategory.title }}</h1>
                        <slot name="main-panel"></slot>
                    </div>
                </div>
            </div>

            <!-- Fixed cart button -->
            <div class="fixed bottom-0 left-0 right-0 p-4 bg-white">
                <PrimeButton 
                    severity="success"
                    @click="openCart = true" 
                    class="w-full flex items-center justify-between"
                >
                    <div class="flex items-center gap-2">
                        <span>{{ fr.cart.title }}</span>
                    </div>
                    <span>{{ cartStore.totalPrice.toFixed(2) }} €</span>
                </PrimeButton>
            </div>

            <!-- Cart drawer -->
            <PrimeDrawer
                v-model:visible="openCart" 
                position="bottom" 
                class="h-auto"
            >
                <slot name="cart-panel"></slot>
            </PrimeDrawer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { fr } from '../../i18n/locales/fr';

const cartStore = useCartStore()

const openCart = ref(false)

const desktopPt = {
    root: {
        class: 'h-full w-full'
    },
    gutter: {
        class: 'bg-gray-200 hover:bg-gray-300 transition-colors'
    }
};
</script>
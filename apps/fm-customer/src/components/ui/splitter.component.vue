<template>
    <div class="w-full h-full overflow-hidden">
        <!-- Desktop view with PrimeSplitter (lg) -->
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

        <!-- Mobile view with cards (sm) -->
        <div class="block lg:hidden h-full overflow-y-auto">
            <div class="max-w-full mx-auto p-4 space-y-4">
                <!-- Main content card -->
                <div class="bg-white rounded-lg shadow-md p-4">
                    <h1 class="text-xl font-bold text-center mb-4 border-b border-amber-300 pb-2">{{ fr.productCategory.title }}</h1>
                    <slot name="main-panel"></slot>

                    <!-- Cart section -->
                    <div class="mt-6">
                        <h2 class="text-xl font-bold text-center mb-4 border-b border-amber-300 pb-2">{{ fr.cart.title }}</h2>
                        <slot name="cart-panel"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { fr } from '../../i18n/locales/fr';

const desktopPt = {
    root: {
        class: 'h-full w-full'
    },
    gutter: {
        class: 'bg-gray-200 hover:bg-gray-300 transition-colors'
    }
};
</script>
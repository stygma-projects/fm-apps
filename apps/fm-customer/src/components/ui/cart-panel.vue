<template>
    <div class="space-y-4">
        <!-- Empty -->
        <div v-if="cartStore.items.length === 0">
            {{ fr.cart.empty }}
        </div>
        
        <div v-else>
            <div v-for="item in data" :key="item.id">
                <div>
                    {{ item.product.label }}<br>
                    <div v-if="item.mandatory.length > 0">
                        Ingrédients obligatoires:
                        <ul>
                            <li v-for="ingredient in item.mandatory" :key="ingredient.id">
                                {{ ingredient.label }} {{ ingredient.priceIncludingTax }} €
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fr } from '../../i18n/locales/fr';
import { useCartStore } from '~/stores/cart.store';

const cartStore = useCartStore();
const data = cartStore.getStoreContent();
</script>
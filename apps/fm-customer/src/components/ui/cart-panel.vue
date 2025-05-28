<template>
  <div class="space-y-4">
    <PrimeDataView
      :value="cartStore.items"
      :pt="{
        footer: {
          class: 'mt-10',
        },
      }"
    >
      <template #list="{ items }">
        <div class="flex flex-col">
          <PrimeAccordion
            :multiple="false"
            class="bg-white rounded-lg shadow-md overflow-hidden"
            :pt="{
              root: { class: 'border-0' },
              tab: {
                root: { class: 'border-b border-gray-200 last:border-0' },
                header: {
                  class:
                    'bg-white hover:bg-gray-50 transition-colors duration-200',
                },
                headerAction: { class: 'px-6 py-4 w-full' },
                content: { class: 'bg-gray-50' },
                headerIcon: { class: 'hidden' },
              },
            }"
          >
            <PrimeAccordionTab
              v-for="(item, index) in items"
              :key="`item-${index}`"
            >
              <template #header>
                <div
                  :data-cy="`fmc-accordion-tab-${index}`"
                  class="flex items-center justify-between w-full"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
                    >
                      <span class="text-yellow-600">{{ index + 1 }}</span>
                    </div>
                    <p class="lg:text-xl font-semibold text-black">
                      {{ item.product?.label }}
                    </p>
                  </div>
                  <span class="lg:text-xl font-semibold text-black">
                    {{ item.product?.priceIncludingTax }} €
                  </span>
                </div>
              </template>

              <div
                :data-cy="`fmc-accordion-content-${index}`"
                class="p-6 bg-white"
              >
                <ul class="list-disc">
                  <IngredientSection
                    :title="fr.cart.info.mandatoryIngredients"
                    :items="item.mandatory"
                  />
                  <IngredientSection
                    :title="fr.cart.info.extraIngredients"
                    :items="item.extra"
                  />
                  <IngredientSection
                    :title="fr.cart.info.optionalBaseIngredients"
                    :items="item.optionalBaseIngredients"
                  />
                </ul>
              </div>
            </PrimeAccordionTab>
          </PrimeAccordion>
        </div>
      </template>

      <template #footer v-if="cartStore.items.length > 0">
        <div class="bg-white rounded-lg shadow-md overflow-hidden mt-6">
          <div class="px-6 py-4 bg-white border-b border-gray-200">
            <div class="flex justify-between w-full">
              <div class="flex space-x-3">
                <p class="lg:text-xl font-semibold text-black">
                  {{ fr.cart.total }}
                </p>
              </div>
              <span class="lg:text-xl font-semibold text-black">
                {{ cartStore.totalPrice.toFixed(2) }} €
              </span>
            </div>
          </div>

          <div data-cy="fmc-validate-cart" class="p-6 bg-gray-50">
            <NuxtLink
              to="/order/validate-basket"
              class="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 text-center"
            >
              <span class="text-pink-700 lg:text-xl">{{ fr.order.title }}</span>
            </NuxtLink>
          </div>
        </div>
      </template>
    </PrimeDataView>
  </div>
</template>

<script setup lang="ts">
import { fr } from '../../i18n/locales/fr'
import IngredientSection from './ingredient-section.component.vue'

const cartStore = useCartStore()
</script>

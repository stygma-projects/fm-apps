<template>
  <div class="h-full flex flex-col">
    <!-- Liste des items - SCROLLABLE -->
    <div class="flex-1 overflow-y-auto">
      <div class="space-y-4">
        <div v-if="cartStore.items.length <= 0"></div>
        <div v-else>
          <PrimeDataView :value="cartStore.items">
            <template #list="{ items }">
              <div class="flex flex-col">
                <template v-for="(item, index) in items" :key="`item-${index}`">
                  <!-- accordeon if ingredient in product -->
                  <div v-if="hasIngredient(item)">
                    <PrimeAccordion
                      :multiple="false"
                      class="rounded-lg shadow-md overflow-hidden"
                    >
                      <PrimeAccordionTab>
                        <template #header>
                          <div
                            :data-cy="`fmc-accordion-tab-${index}`"
                            class="flex items-center justify-between w-full"
                          >
                            <div class="flex items-center space-x-3">
                              <div
                                class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
                              >
                                <span class="text-yellow-600">{{
                                  index + 1
                                }}</span>
                              </div>
                              <p class="lg:text-xl font-semibold text-black">
                                {{ item.product?.label }}
                              </p>
                            </div>
                            <span class="lg:text-xl font-semibold text-red-700">
                              {{ item.product?.price }} €
                            </span>
                          </div>
                        </template>

                        <div
                          :data-cy="`fmc-accordion-content-${index}`"
                          class="lg:p-6 bg-white"
                        >
                          <IngredientSection
                            :title="fr.cart.info.mandatoryIngredients"
                            :items="item.mandatory"
                            :is-mandatory="true"
                            color="red"
                          />
                          <IngredientSection
                            :title="fr.cart.info.extraIngredients"
                            :items="item.extra"
                            color="amber"
                          />
                          <IngredientSection
                            :title="fr.cart.info.optionalBaseIngredients"
                            :items="item.optionalBase"
                            color="blue"
                          />
                        </div>
                      </PrimeAccordionTab>
                    </PrimeAccordion>
                  </div>

                  <!-- no accordeon -->
                  <div
                    v-else
                    class="rounded-lg shadow-md overflow-hidden bg-white"
                  >
                    <div
                      :data-cy="`fmc-simple-item-${index}`"
                      class="px-4 py-3 flex items-center justify-between w-full"
                    >
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
                        >
                          <span class="text-yellow-600">{{ index + 1 }}</span>
                        </div>
                        <p class="lg:text-xl font-semibold text-black">
                          {{ item.label }}
                        </p>
                      </div>
                      <span class="lg:text-xl font-semibold text-red-700">
                        {{ item.price }} €
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </PrimeDataView>
        </div>
      </div>
    </div>

    <div v-if="cartStore.items.length > 0" class="mt-4">
      <div class="overflow-hidden">
        <div class="px-6 py-4">
          <div class="flex justify-between w-full">
            <div class="flex space-x-3">
              <p class="lg:text-xl font-semibold text-black">
                {{ fr.cart.total }}
              </p>
            </div>
            <span class="lg:text-xl font-semibold text-red-700">
              {{ cartStore.totalPrice.toFixed(2) }} €
            </span>
          </div>
        </div>

        <div data-cy="fmc-validate-cart">
          <NuxtLink
            to="/order/validate-basket"
            class="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 text-center"
          >
            <span class="text-pink-700 lg:text-xl">{{ fr.validate.cart }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fr } from '../../../i18n/locales/fr'
import IngredientSection from '../ingredient-section.component.vue'

const cartStore = useCartStore()

const hasIngredient = (item: any) => {
  return (
    (item.mandatory && item.mandatory.length > 0) ||
    (item.optionalBase && item.optionalBase.length > 0) ||
    (item.extra && item.extra.length > 0)
  )
}
</script>

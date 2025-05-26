<template>
  <div class="space-y-4">
    <PrimeDataView
      :value="storeData"
      :pt="{
        footer: {
          class: 'mt-10',
        },
      }"
    >
      <template #list="{ items }">
        <div class="flex flex-col">
          <div
            v-for="(item, index) in items"
            :key="item.id || index"
            class="mb-4 border rounded-lg overflow-hidden"
          >
            <PrimeAccordion>
              <PrimeAccordionTab>
                <template #header>
                  <p>{{ item.product?.label }}</p>
                  <span class="text-xl font-semibold mr-4">
                    ${{ item.product?.priceIncludingTax }}
                  </span>
                </template>

                <div class="p-4">
                  <div>
                    <ul class="list-disc">
                      <li>
                        {{ fr.cart.mandatoryIngredients }} :
                        <ul class="list-disc ml-6 mt-2">
                          <li
                            v-for="mandatoryItem in item.mandatory"
                            :key="mandatoryItem.label"
                            class="mb-1"
                          >
                            {{ mandatoryItem.label }}
                            {{ mandatoryItem.priceIncludingTax }} €
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </PrimeAccordionTab>
            </PrimeAccordion>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="bg-white p-4">
          <Button @click="handleCreateProductInOrder" />
        </div>
      </template>
    </PrimeDataView>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart.store'
import Button from './button.component.vue'
import { useCreateProductInOrder } from '../../composables/api/productInOrder.composable'
import { fr } from '../../i18n/locales/fr'

const createProductInOrder = useCreateProductInOrder
const cartStore = useCartStore()
const storeData = cartStore.getStoreContent()

const handleCreateProductInOrder = async () => {
  // await createProductInOrder(storeData)
}
</script>

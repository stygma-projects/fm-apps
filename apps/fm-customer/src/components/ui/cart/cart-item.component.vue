<template>
  <div class="lg:pb-10 pb-12 border-b lg:border-none">
    <div
      class="flex flex-col sm:flex-row sm:items-center p-6 gap-4 lg:border-3 border-red-700 lg:rounded-4xl transition-all duration-200 hover:shadow-lg"
    >
      <!-- Image -->
      <div class="lg:w-40 flex-shrink-0">
        <img
          :src="item.product?.imageUrl"
          class="w-full h-40 object-cover rounded-lg shadow-md"
          :alt="item.product?.label"
        />
      </div>

      <div
        class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
      >
        <!-- Product info -->
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <div>
              <span class="lg:text-xl font-medium mt-2">
                {{ item.product?.label }}
              </span>
              <span class="font-semibold text-red-600 mt-2 ml-10">
                {{ item.product?.priceIncludingTax }} €
              </span>
            </div>
            <div>
              <PrimeBadge :value="index + 1" severity="danger" />
            </div>
          </div>

          <!-- Ingredients -->
          <div class="mt-4 space-y-3">
            <IngredientSection
              :title="fr.cart.info.mandatoryIngredients"
              :items="item.mandatory"
              :card-pt="{
                title: { class: 'text-red-700 font-bold text-sm' },
                root: { class: 'border-l-4 border-red-500 bg-red-50' },
                content: { class: 'pt-2' },
              }"
              :is-not-mandatory="false"
            />

            <IngredientSection
              :title="fr.cart.info.extraIngredients"
              :items="item.extra"
              :card-pt="{
                title: { class: 'text-amber-700 font-bold text-sm' },
                root: { class: 'border-l-4 border-amber-500 bg-amber-50' },
                content: { class: 'pt-2' },
              }"
            />

            <IngredientSection
              :title="fr.cart.info.optionalBaseIngredients"
              :items="item.optionalBaseIngredients"
              :card-pt="{
                title: { class: 'text-blue-700 font-bold text-sm' },
                root: { class: 'border-l-4 border-blue-500 bg-blue-50' },
                content: { class: 'pt-2' },
              }"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex lg:flex-col lg:justify-end lg:mt-auto gap-3">
          <PrimeButton
            :label="fr.cart.function.update"
            size="small"
            variant="outlined"
            raised
            :pt="{
              root: {
                class:
                  'hover:bg-amber-50 border-amber-400 text-amber-700 hover:border-amber-500 w-1/2 lg:w-full',
              },
            }"
            @click="openStepper"
          />
          <PrimeButton
            :label="fr.cart.function.delete"
            severity="danger"
            size="small"
            variant="outlined"
            raised
            :pt="{
              root: {
                class: 'hover:bg-red-50 w-1/2 lg:w-full',
              },
            }"
            @click="$emit('remove', item.id)"
          />
        </div>
      </div>
    </div>

    <Stepper
      :visible="stepperVisible"
      :item="item.product"
      :selections-key="item.selectionsKey"
      @update:visible="stepperVisible = $event"
      @complete="handleStepperComplete"
      @cancel="handleStepperCancel"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IngredientSection from '~/components/ui/ingredient-section.component.vue'
import Stepper from '~/components/ui/stepper/stepper.component.vue'
import { fr } from '../../../i18n/locales/fr'

interface Props {
  item: any
  index: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  remove: [id: string]
  update: [item: any]
}>()

const stepperVisible = ref(false)

const openStepper = () => {
  stepperVisible.value = true
}

const handleStepperComplete = (data: any) => {
  stepperVisible.value = false
}

const handleStepperCancel = () => {
  stepperVisible.value = false
}
</script>

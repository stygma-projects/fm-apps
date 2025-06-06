<template>
  <div class="border-b lg:border-none">
    <div
      class="flex flex-col lg:flex-row lg:items-start p-6 gap-4 lg:border-3 border-red-700 lg:rounded-4xl transition-all duration-200 hover:shadow-lg"
    >
      <!-- Image -->
      <div class="w-full lg:w-40 flex-shrink-0 rounded-2xl">
        <img
          v-if="item.product.imageUrl"
          :src="item.product?.imageUrl"
          class="w-full h-40 object-cover rounded-2xl shadow-md"
        />
        <PrimeSkeleton v-else size="10rem"></PrimeSkeleton>
      </div>

      <div
        class="flex flex-col lg:flex-row justify-between lg:items-center flex-1 gap-6"
      >
        <!-- Product info -->
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-lg lg:text-xl font-medium">
                {{ item.product?.label }}
              </span>
              <span
                class="text-lg lg:text-xl font-semibold text-red-700 mt-2 ml-2 lg:ml-10 inline"
              >
                {{ item.product?.price }} €
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
              color="red"
              :is-mandatory="true"
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
        </div>

        <!-- Actions -->
        <div
          class="flex flex-row lg:flex-col justify-center lg:justify-end lg:mt-auto gap-3 w-full lg:w-auto"
        >
          <PrimeButton
            :label="fr.cart.function.update"
            size="small"
            variant="outlined"
            raised
            :pt="{
              root: {
                class:
                  'hover:bg-amber-50 border-amber-400 text-amber-700 hover:border-amber-500 w-full lg:w-full',
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
                class: 'hover:bg-red-50 w-full lg:w-full',
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

const canUpdate = computed(() => {
  return (
    props.item.product?.mandatory && props.item.product.mandatory.length > 0
  )
})

const openStepper = () => {
  if (canUpdate.value) stepperVisible.value = true
}

const handleStepperComplete = (data: any) => {
  stepperVisible.value = false
}

const handleStepperCancel = () => {
  stepperVisible.value = false
}
</script>

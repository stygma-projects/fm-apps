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
              <PrimeButton
                icon="pi pi-trash"
                severity="danger"
                size="small"
                variant="outlined"
                raised
                :pt="{
                  root: {
                    class: 'hover:bg-red-500 w-full lg:w-full',
                  },
                }"
                @click="$emit('remove', item.id)"
              />
            </div>
          </div>

          <!-- Ingredients -->
          <div class="mt-4 space-y-3">
            <IngredientSection
              :title="fr.cart.info.mandatoryIngredients"
              :items="item.mandatory"
              :is-mandatory="true"
              :in-cart="true"
              @click="handleIngredientClick('mandatory')"
              color="red"
            />

            <IngredientSection
              :title="fr.cart.info.extraIngredients"
              :items="item.extra"
              :in-cart="true"
              @click="handleIngredientClick('extra')"
              color="amber"
            />

            <IngredientSection
              :title="fr.cart.info.optionalBaseIngredients"
              :items="item.optionalBase"
              :in-cart="true"
              @click="handleIngredientClick('optionalBase')"
              color="blue"
            />
          </div>
        </div>
      </div>
    </div>

    <StepperDialog
      :stepper-type="currentStepperType"
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
import StepperDialog from '~/components/ui/stepper/stepper-dialog.component.vue'
import type { StepperType } from '~/types/stepper.type'
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
const currentStepperType = ref<StepperType>('mandatory')

const canUpdateMandatory = computed(() => {
  return (
    props.item.product?.mandatory && props.item.product.mandatory.length > 0
  )
})

const canUpdateExtra = computed(() => {
  return props.item.product?.extra && props.item.product.extra.length > 0
})

const canUpdateOptionalBase = computed(() => {
  return (
    props.item.product?.optionalBase &&
    props.item.product.optionalBase.length > 0
  )
})

const handleStepperComplete = (data: any) => {
  stepperVisible.value = false

  const updatedItem = { ...props.item }

  switch (data.stepperType) {
    case 'mandatory':
      updatedItem.mandatory = data.selections
      break
    case 'extra':
      updatedItem.extra = data.selections
      break
    case 'optionalBase':
      updatedItem.optionalBase = data.selections
      break
  }

  emit('update', updatedItem)
}

const handleStepperCancel = () => {
  stepperVisible.value = false
}

const handleIngredientClick = (type: StepperType) => {
  const canUpdate = {
    mandatory: canUpdateMandatory.value,
    extra: canUpdateExtra.value,
    optionalBase: canUpdateOptionalBase.value,
  }[type]

  if (canUpdate) {
    currentStepperType.value = type
    stepperVisible.value = true
  }
}
</script>

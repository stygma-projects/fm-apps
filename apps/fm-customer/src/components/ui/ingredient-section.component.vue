<template>
  <PrimeCard :pt="computedCardPt">
    <template #title>
      <div
        v-if="!items || items.length === 0"
        class="flex items-center justify-between"
      >
        <span>{{ title }}</span>
        <PrimeButton
          v-if="inCart"
          icon="pi pi-pencil"
          size="large"
          variant="outlined"
          raised
          @click="handleClick"
        />
      </div>
      <!-- Sinon, titre normal -->
      <span v-else>{{ title }}</span>
    </template>
    <template #content>
      <!-- Contenu seulement si il y a des ingrédients -->
      <div
        v-if="items && items.length > 0"
        class="grid grid-cols-[1fr_auto] gap-4 min-h-[60px]"
      >
        <!-- Liste des ingrédients -->
        <div class="self-start">
          <ul class="space-y-0.5">
            <li
              v-for="ingredient in items"
              :key="ingredient.label"
              class="flex flex-row lg:items-center justify-between gap-1 lg:gap-0"
            >
              <span class="text-gray-700 text-sm lg:text-base">{{
                ingredient.label
              }}</span>
              <span
                v-if="!isMandatory"
                class="font-medium text-red-700 text-sm lg:text-base"
              >
                {{ ingredient.price }} €
              </span>
            </li>
          </ul>
        </div>

        <div class="self-end justify-self-end">
          <PrimeButton
            v-if="inCart"
            icon="pi pi-pencil"
            size="large"
            variant="outlined"
            raised
            @click="handleClick"
          />
        </div>
      </div>
    </template>
  </PrimeCard>
</template>

<script setup lang="ts">
interface Ingredient {
  label: string
  price: number
}

type ColorVariant = 'red' | 'amber' | 'blue'

interface Props {
  title: string
  items?: Ingredient[]
  color?: ColorVariant
  cardPt?: object
  isMandatory?: boolean
  inCart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'red',
})

const colorVariants: Record<
  ColorVariant,
  {
    title: string
    root: string
    content: string
  }
> = {
  red: {
    title: 'text-red-700 font-bold lg:text-sm',
    root: 'border-l-4 border-red-500 bg-red-50',
    content: 'pt-1',
  },
  amber: {
    title: 'text-amber-700 font-bold lg:text-sm',
    root: 'border-l-4 border-amber-500 bg-amber-50',
    content: 'pt-1',
  },
  blue: {
    title: 'text-blue-700 font-bold lg:text-sm',
    root: 'border-l-4 border-blue-500 bg-blue-50',
    content: 'pt-1',
  },
}

const computedCardPt = computed(() => {
  if (props.cardPt) {
    return props.cardPt
  }

  const variant = colorVariants[props.color as ColorVariant]
  return {
    title: { class: variant.title },
    root: { class: variant.root },
    content: { class: variant.content },
  }
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

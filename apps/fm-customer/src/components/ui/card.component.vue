<template>
  <div :class="containerClasses">
    <PrimeCard 
      v-for="(item, index) in items" 
      :key="item.id || index"
      @click="handleItemClick(item)"
      :pt="cardPt"
      :class="[
        'flex flex-col justify-center cursor-pointer transition-all duration-200 h-50 lg:h-70 border-1',
        isSelected(item) ? 'border-primary' : 'border-rose-200 hover:border-rose-400',
        isSelected(item) ? 'shadow-lg' : 'shadow-md hover:shadow-lg'
      ]"
      :data-cy="`fmc-${cy}`"
    >
      <!-- Image Container -->
      <template #header>
        <div class="w-full h-36 lg:h-54 overflow-hidden relative rounded-t-lg bg-gray-50">
          <PrimeImage 
            v-if="hasImage(item)" 
            :src="item.imageUrl" 
            :pt="imagePt"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
          </div>
        </div>
      </template> 
      
      <!-- Content Area -->
      <template #title>
        <slot
          name="card-label" 
          :item="item"
          :selected="isSelected(item)"
        >
          <div class="w-full p-5 flex items-center min-h-[20]">
            <!-- With price -->
            <div v-if="hasPrice(item)" class="flex justify-between items-center w-full text-xs sm:text-sm lg:text-base font-bold">
              <p class="truncate max-w-[64%]">{{ item.label }}</p>
              <p class="text-right">{{ formatPrice(item.priceIncludingTax) }}</p>
            </div>
            <!-- Without price -->
            <div v-else class="text-center w-full">
              <p class="text-xs sm:text-sm lg:text-base break-words font-bold line-clamp-2">{{ item.label }}</p>
            </div>
          </div>
        </slot>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  grid: {
    type: Boolean,
    default: true
  },
  gridCols: {
    type: Object,
    default: () => ({
      default: 2,
      sm: 2, 
      lg: 4
    })
  },
  selectedItems: {
    type: Array,
    default: () => []
  },
  cy: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['item-click']);

const containerClasses = computed(() => {
  return [
    'gap-x-4 gap-y-6 lg:gap-x-6 lg:gap-y-8',
    props.grid ? `grid grid-cols-${props.gridCols.default} sm:grid-cols-${props.gridCols.sm} lg:grid-cols-${props.gridCols.lg}` : 'flex flex-col'
  ]
});

const hasImage = (item) => Boolean(item?.imageUrl);
const hasPrice = (item) => item?.priceIncludingTax !== undefined;
const formatPrice = (price) => `${price} €`;

const isSelected = (item) => {
  return props.selectedItems.some(selected => selected.id === item.id);
};

const handleItemClick = (item) => {
  emit('item-click', item);
};

const cardPt = {
  root: { class: 'rounded-lg' },
  body: { class: 'p-0 flex-grow h-full' },
  title: { class: 'text-base font-medium' }
};

const imagePt = {
  image: { class: 'h-full w-full object-cover object-center rounded-t-lg' }
};
</script>

<style>
[data-pc-section="body"] {
  padding: 0 !important;
}
</style>
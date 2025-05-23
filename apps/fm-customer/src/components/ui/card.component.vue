<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 lg:gap-x-6 lg:gap-y-8">
    <PrimeCard 
      v-for="(item, index) in items" 
      :key="item.id || index"
      @click="handleItemClick(item)"
      :pt="getCardPt(item)"
      :class="[
        'flex flex-col justify-center cursor-pointer transition-all duration-200 h-50 lg:h-70',
        isSelected(item) ? 'shadow-lg' : 'shadow-md hover:shadow-lg'
      ]"
      :data-cy="`fmc-${cy}`"
    >
      <!-- Image Container -->
      <template #header>
        <div class="relative w-full overflow-hidden rounded-t-lg h-36 lg:h-54 bg-gray-50">
          <PrimeImage 
            v-if="hasImage(item)" 
            :src="item.imageUrl" 
            :pt="imagePt"
          />
          <div v-else class="flex items-center justify-center w-full h-full">
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
            <div v-if="hasPrice(item)" class="flex items-center justify-between w-full text-xs font-bold sm:text-sm lg:text-base">
              <p class="truncate max-w-[64%]">{{ item.label }}</p>
              <p class="text-right">{{ formatPrice(item.priceIncludingTax) }}</p>
            </div>
            <!-- Without price -->
            <div v-else class="w-full text-center">
              <p class="text-xs font-bold break-words sm:text-sm lg:text-base line-clamp-2">{{ item.label }}</p>
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

const hasImage = (item) => Boolean(item?.imageUrl);
const hasPrice = (item) => item?.priceIncludingTax !== undefined;
const formatPrice = (price) => `${price} €`;

const isSelected = (item) => {
  return props.selectedItems.some(selected => selected.id === item.id);
};

const handleItemClick = (item) => {
  emit('item-click', item);
};

const getCardPt = (item) => ({
  root: { 
    class: [
      'rounded-lg overflow-hidden border',
      isSelected(item) ? 'border-primary' : 'border-rose-200 hover:border-rose-400'
    ].join(' ')
  },
  body: { class: 'p-0 flex-grow h-full' },
  title: { class: 'text-base font-medium' }
});

const imagePt = {
  image: { class: 'h-full w-full object-cover object-center' } // Retiré rounded-t-lg car overflow-hidden sur root le gère
};
</script>
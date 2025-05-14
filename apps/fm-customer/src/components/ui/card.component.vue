<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <PrimeCard 
      v-for="(item, index) in items" 
      :key="item.id || index"
      @click="handleItemClick(item)"
      class="cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md"
    >
    <template #header v-if="item.imageUrl">
        <div class="w-full h-28 md:h-40 lg:h-60 overflow-hidden relative rounded-t-lg">
          <PrimeImage 
            :src="item.imageUrl" 
            class="w-full h-full object-cover rounded-t-lg"
            alt=""
          />
        </div>
      </template> 
      
      <template #title  >
        <slot 
          name="card-label" 
          :item="item"
        >
          <div v-if="item.priceIncludingTax !== undefined" class="flex justify-between items-center">
            <div class="text-start text-sm">
              {{ item.label }}
            </div>
            <div class="text-end text-sm">
              {{ item.priceIncludingTax }} €
            </div>
          </div>
          
          <!-- Pour les catégories (sans prix) -->
          <div v-else class="p-4 flex items-center justify-center h-16">
            <span class="font-medium text-center">
              {{ item.label }}
            </span>
          </div>
        </slot>
      </template>
    </PrimeCard>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleItemClick(item) {
      if (this.clickable) {
        this.$emit('item-click', item)
      }
    }
  },
  render() {
    return this.$slots.default ? this.$slots.default()[0] : this.$options.template
  }
}
</script>
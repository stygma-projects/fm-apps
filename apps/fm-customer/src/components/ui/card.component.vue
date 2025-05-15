<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <PrimeCard 
      v-for="(item, index) in items" 
      :key="item.id || index"
      @click="handleItemClick(item)"
      class="flex flex-auto justify-center cursor-pointer rounded-lg shadow-sm hover:shadow-md h-52 lg:h-80"
    >
      <template #header v-if="item.imageUrl">
        <div class="w-full h-34 lg:h-52 overflow-hidden relative rounded-t-lg object-content lg:-top-5">
          <PrimeImage 
            :src="item.imageUrl" 
            imageClass="h-full w-full object-cover rounded-t-lg"
          />
        </div>
      </template> 
      
      <template #title v-if="item.imageUrl">
        <slot
          name="card-label" 
          :item="item"
        >
          <div v-if="item.priceIncludingTax !== undefined" class="flex justify-between items-center p-5 lg:p-5 flex-grow">
            <div class="text-base font-bold">
              {{ item.label }}
            </div>
            <div v-if="item.priceIncludingTax !== undefined" class="text-base font-bold">
              {{ item.priceIncludingTax }} €
            </div>
          </div>
        </slot>
      </template>

      <template #content v-else>
        <slot>
          <div class="h-full flex items-center justify-center">
            <span class="text-xl font-bold text-center">
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
<style>
div.p-card-body {
  padding: 0 !important;
}
</style>

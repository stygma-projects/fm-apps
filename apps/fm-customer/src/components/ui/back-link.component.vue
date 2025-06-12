<template>
  <NuxtLink
    data-cy="fmc-return-product-category-page"
    :to="to"
    :class="linkClasses"
    @click.native.prevent="goBack"
  >
    <svg
      class="w-4 h-4 lg:w-5 lg:h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
    <span class="text-sm font-medium">{{ text }}</span>
  </NuxtLink>
</template>

<script>
const cartStore = useCartStore()

export default {
  props: {
    text: {
      type: String,
      default: 'Back',
    },
    applySpecialStyles: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    linkClasses() {
      return {
        'lg:top-18 top-[16px] left-[80%]': this.applySpecialStyles,
        'absolute left-0 lg:left-5 top-0 lg:top-5 flex items-center space-x-1 lg:space-x-2 text-gray-600 lg:hover:text-gray-800 transition-all duration-200 lg:hover:bg-amber-200 lg:hover:rounded-3xl lg:hover:p-3': true,
      }
    },
  },
  methods: {
    goBack(event) {
      event.preventDefault()

      const routeHistoryStore = useRouteHistoryStore()
      const currentRoute = routeHistoryStore.history
      const currentIndex = currentRoute.length - 1
      const previousRoute = routeHistoryStore.history[currentIndex - 1]

      if (previousRoute === '/order/validate-basket' && cartStore.items !== 0) {
        this.$router.go(-2)
      } else if (currentRoute === '/order/product-categories') {
        this.$router.go('/')
      } else {
        this.$router.go(-1)
      }
    },
  },
}
</script>

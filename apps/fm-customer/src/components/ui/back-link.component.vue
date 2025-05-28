<template>
  <NuxtLink
    data-cy="fmc-return-product-category-page"
    :to="to"
    class="absolute left-0 lg:left-5 top-0 lg:top-5 flex items-center space-x-1 lg:space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
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
export default {
  props: {
    text: {
      type: String,
      default: 'Back',
    },
  },
  methods: {
    goBack(event) {
      event.preventDefault()
      this.$router.go(-1)
    },
  },
}
</script>

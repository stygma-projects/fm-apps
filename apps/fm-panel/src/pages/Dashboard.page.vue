<template>
  <div>{data}</div>
</template>

<script lang="ts" setup>
import { useFetchProductCategories } from '../composables/productCategory.composable'

const { data } = useFetchProductCategories()
</script>

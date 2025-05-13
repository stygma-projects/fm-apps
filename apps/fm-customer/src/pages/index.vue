<template>
    <div class="p-4">
        {{ data }}
    </div>
</template>

<script setup>
import { useIngredients } from '../composables/api/ingredient.composable'

const { data } = useIngredients()
</script>
<!-- apps/fm-customer/src/app.vue -->
<template>
    <div>
        <header class="bg-gray-200 p-4 font-bold">
            <h1 class="text-2xl">{{ $t('common.title') }}</h1>
        </header>
        
        <NuxtPage />

        <Button label="Danger" severity="danger" />
    </div>
</template>

<script setup>
</script>
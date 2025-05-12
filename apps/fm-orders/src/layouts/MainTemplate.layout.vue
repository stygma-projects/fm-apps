<template>
  <div class="flex flex-col h-screen">
    <div class="flex items-center p-4 bg-gray-50 shadow-md z-10">
      <div class="flex-grow ml-4">
        <h1 class="text-xl font-bold">{{ appName }}</h1>
      </div>
    </div>
    <div class="flex flex-grow overflow-hidden">
      <div class="flex-grow overflow-y-auto">
        <router-view />
        <Toast />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Toast from 'primevue/toast'

const { t } = useI18n()

const appName = ref<string>(t('appName'))
</script>

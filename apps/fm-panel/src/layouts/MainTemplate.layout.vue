<template>
  <div class="flex flex-col h-screen">
    <div class="flex items-center p-4 bg-gray-50 shadow-md z-10">
      <button aria-label="Menu" class="flex-none p-2 rounded-md hover:bg-gray-200" @click="toggleSidebar">
        <i class="pi pi-bars"></i>
      </button>
      <div class="flex-grow ml-4">
        <h1 class="text-xl font-bold">{{ appName }}</h1>
      </div>
      <div class="flex items-center mr-4">
        <span class="font-medium">{{ userName }}</span>
      </div>
    </div>

    <div class="flex flex-grow overflow-hidden">
      <div
          :class="{ 'w-64': sidebarVisible, 'w-0': !sidebarVisible }"
          class="bg-gray-100 shadow-md transition-all duration-300 z-0 overflow-y-auto"
      >
        <div :class="{ 'hidden': !sidebarVisible }" class="p-4">
          <ul class="mt-4">
            <li v-for="(item, index) in menuItems[0].items" :key="index" class="flex items-center p-2 hover:bg-gray-200 rounded-md">
              <router-link :to="item.to">
              <span class="ml-2">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-grow p-8 overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const {t} = useI18n();

const sidebarVisible = ref<boolean>(true);

const userName = ref<string>('Valentin FOURNY');
const appName = ref<string>(t('appName'));

const menuItems = ref([
  {
    items: [
      {
        label:t('sidebarMenu.inventory'),
        to: 'inventory',
      },
    ]
  }
]);

const toggleSidebar = (): void => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

<template>
    <div>
      <h1 class="text-2xl font-bold mb-4 dark:text-white">{{ t('ingredientCategories.title') }}</h1>
      <PrimeDataTable 
        v-model:editing-rows="editingRows" 
        :value="data" 
        edit-mode="row" 
        data-key="id" 
        :pt="{
          table: { style: 'min-width: 50rem', class: 'dark:text-white' },
          column: {
            bodycell: ({ state }) => ({
              style: state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem',
              class: 'dark:text-white'
            }),
            headercell: { class: 'dark:text-white dark:bg-gray-700' }
          }
        }"
        @row-edit-save="onRowEditSave"
      >
        <PrimeColumn field="label" :header="t('ingredientCategories.table.name')" style="width: 30%">
          <template #editor="{ data, field }">
            <PrimeInputText v-model="data[field]" fluid class="w-full" />
          </template>
        </PrimeColumn>
        <PrimeColumn field="imageUrl" :header="t('ingredientCategories.table.imageUrl')" style="width: 40%">
          <template #body="{ data }">
            <span v-if="data.imageUrl">{{ data.imageUrl }}</span>
            <span v-else class="text-gray-500 dark:text-gray-400">{{ t('ingredientCategories.table.noImage') }}</span>
          </template>
          <template #editor="{ data, field }">
            <PrimeInputText v-model="data[field]" fluid class="w-full" />
          </template>
        </PrimeColumn>
        <PrimeColumn :row-editor="true" style="width: 10%; min-width: 8rem" body-style="text-align:center">
        </PrimeColumn>

      </PrimeDataTable>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'
  import { useFetchIngredientCategories, useUpdateIngredientCategory } from '../composables/ingredientCategory.composable';
  
  const { t } = useI18n()

  const { data } = useFetchIngredientCategories();
  const updateCategory = useUpdateIngredientCategory();
  const editingRows = ref([]);
  
  const onRowEditSave = async (event) => {
  const { newData } = event;

  const updateData = {
    id: newData.id,
    label: newData.label,
    imageUrl: newData.imageUrl === null ? undefined : newData.imageUrl
  };

await updateCategory.mutateAsync(updateData);
window.location.reload(); 

};
</script>
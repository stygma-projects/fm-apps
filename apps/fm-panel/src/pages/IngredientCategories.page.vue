<template>
  <div>
    <PrimeToolbar class="mb-6">
      <template #start>
        <PrimeButton class="mr-3" label="New" outlined rounded @click="openNew">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="p-button-icon w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </template>
        </PrimeButton>
        <PrimeButton label="Delete" outlined rounded severity="danger" @click="confirmDeleteSelected" :disabled="!selectedCategories || !selectedCategories.length">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </template>
        </PrimeButton>
      </template>
    </PrimeToolbar>

    <div>
      <PrimeDataTable
        ref="dt"
        v-model:selection="selectedCategories"
        :value="data"
        dataKey="id"
        :filters="filters"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h1 class="text-2xl font-bold mb-0 dark:text-white">{{ t('ingredientCategories.title') }}</h1>
            <div class="flex items-center">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <PrimeInputText v-model="filters['global'].value" placeholder="Search..." class="dark:bg-gray-700 dark:text-white" />
              </span>
            </div>
          </div>
        </template>

        <PrimeColumn selectionMode="multiple" style="width: 3rem" :exportable="false"></PrimeColumn>
        <PrimeColumn field="label" :header="t('ingredientCategories.table.name')" sortable style="min-width: 12rem">
          <template #body="slotProps">
            <span class="font-medium">{{ slotProps.data.label }}</span>
          </template>
        </PrimeColumn>
        <PrimeColumn header="Image" style="min-width: 12rem">
          <template #body="slotProps">
            <img v-if="slotProps.data.imageUrl" :src="slotProps.data.imageUrl" :alt="slotProps.data.label" class="rounded shadow-sm" style="width: 96px; height: 96px; object-fit: cover;" />
            <span v-else class="text-gray-500 dark:text-gray-400">{{ t('ingredientCategories.table.noImage') }}</span>
          </template>
        </PrimeColumn>
        <PrimeColumn :exportable="false" style="min-width: 12rem; text-align: center;">
          <template #body="slotProps">
            <PrimeButton outlined rounded class="mr-2" @click="editCategory(slotProps.data)">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </template>
            </PrimeButton>
            <PrimeButton outlined rounded severity="danger" @click="confirmDeleteCategory(slotProps.data)">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </template>
            </PrimeButton>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>

    <PrimeDialog v-model:visible="categoryDialog" :style="{ width: '450px' }" header="Détails de l'ingrédient" :modal="true" class="p-fluid">
      <div class="flex flex-col gap-4">
        <div class="flex justify-center mb-2">
          <img v-if="category.imageUrl" :src="category.imageUrl" :alt="category.label" class="rounded shadow-md" style="width: 250px; height: 200px; object-fit: cover;" />
          <span v-else>{{ t('ingredientCategories.table.noImage') }}</span>
        </div>  

        <div class="field">
          <label for="name" class="font-medium dark:text-white mb-2 block">{{ t('ingredientCategories.table.name') }}</label>
          <PrimeInputText id="name" v-model.trim="category.label" required autofocus :class="{'p-invalid': submitted && !category.label}" class="w-full"/>
          <small v-if="submitted && !category.label" class="p-error" >Le nom est requis.</small>
        </div>

        <div class="field">
          <label for="imageUrl" class="font-medium dark:text-white mb-2 block">{{ t('ingredientCategories.table.imageUrl') }}</label>
          <PrimeInputText id="imageUrl" v-model="category.imageUrl" class="w-full" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton label="Cancel" icon="pi pi-times" outlined @click="hideDialog" />
          <PrimeButton label="Save" icon="pi pi-check" @click="saveCategory" />
        </div>
      </template>
    </PrimeDialog>

    <PrimeDialog v-model:visible="deleteCategoryDialog" :style="{ width: '450px' }" header="Confirmation de la suppression" :modal="true">
      <div class="flex items-center justify-center gap-4">
        <div>
          <p class="mt-2 dark:text-gray-300">Êtes-vous sûr de vouloir supprimer : <span class="font-bold">{{ category.label }}</span> ?</p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton label="Non" outlined @click="deleteCategoryDialog = false" />
          <PrimeButton label="Oui" severity="danger" @click="deleteCurrentCategory" />
        </div>
      </template>
    </PrimeDialog>

    <PrimeDialog v-model:visible="deleteCategoriesDialog" :style="{ width: '450px' }" header="Confirmation de la suppression" :modal="true">
      <div class="flex items-center justify-center gap-4">
        <div>
          <p class="mt-2 dark:text-gray-300">Êtes-vous sûr de vouloir supprimer cette catégorie d'ingrédient ?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton label="Non" outlined @click="deleteCategoriesDialog = false" />
          <PrimeButton label="Oui" severity="danger" @click="deleteSelectedCategories" />
        </div>
      </template>
    </PrimeDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFetchIngredientCategories, useUpdateIngredientCategory, useDeleteIngredientCategory, useCreateIngredientCategory } from '../composables/ingredientCategory.composable';

const { t } = useI18n();
const { data } = useFetchIngredientCategories();
const updateCategory = useUpdateIngredientCategory();
const deleteCategory = useDeleteIngredientCategory();
const createCategory = useCreateIngredientCategory();

const isEditing = ref(false);

const filters = ref({
  global: { value: null, matchMode: 'contains' }
});

const selectedCategories = ref([]);
const dt = ref(null);

const categoryDialog = ref(false);
const deleteCategoryDialog = ref(false);
const deleteCategoriesDialog = ref(false);

const submitted = ref(false);

const category = ref({
  id: '',
  label: '',
  imageUrl: undefined
});

const openNew = () => {
  category.value = {};
  isEditing.value = false;
  submitted.value = false;
  categoryDialog.value = true;
};

const hideDialog = () => {
  categoryDialog.value = false;
  submitted.value = false;
};

const editCategory = (editCategory) => {
  category.value = { ...editCategory };
  isEditing.value = true
  categoryDialog.value = true;
};

const saveCategory = async () => {
  submitted.value = true;
  if (!category.value.label) return;
  const payload = {
    label: category.value.label,
    imageUrl: category.value.imageUrl === '' ? undefined : category.value.imageUrl
  };

  if (isEditing.value && category.value.id) {
    await updateCategory.mutateAsync({ id: category.value.id, ...payload });
  } else {
    await createCategory.mutateAsync(payload);
  }
  categoryDialog.value = false;
  window.location.reload();
};

const confirmDeleteCategory = (categoryToDelete) => {
  category.value = categoryToDelete;
  deleteCategoryDialog.value = true;
};

const deleteCurrentCategory = async () => {
  await deleteCategory.mutateAsync({ id: category.value.id });
  deleteCategoryDialog.value = false;
  window.location.reload()
};

const confirmDeleteSelected = () => {
  deleteCategoriesDialog.value = true;
};

const deleteSelectedCategories = async () => {
  for (const item of selectedCategories.value) {
    await deleteCategory.mutateAsync({ id: item.id });
  }
  deleteCategoriesDialog.value = false;
  selectedCategories.value = [];

  window.location.reload()
};
</script>
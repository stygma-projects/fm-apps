<template>
  <div>
    <div>
      <PrimeDataTable
        ref="dt"
        v-model:selection="selectedCategories"
        :filters="filters"
        :value="data"
        data-key="id"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h1 class="text-2xl font-bold mb-0">
              {{ t('ingredientCategories.title') }}
            </h1>
            <div class="flex items-center">
              <div>
                <PrimeIconField>
                  <PrimeInputIcon>
                    <i class="pi pi-search" />
                  </PrimeInputIcon>
                  <PrimeInputText
                    v-model="filters['global'].value"
                    :placeholder="t('ingredientCategories.searchPlaceholder')"
                  />
                </PrimeIconField>
              </div>
              <PrimeButton
                :label="t('ingredientCategories.actions.new')"
                class="mr-3 ml-3"
                outlined
                rounded
                @click="openNew"
              >
                <template #icon>
                  <i class="pi pi-plus" style="font-size: 1.2rem" />
                </template>
              </PrimeButton>
              <PrimeButton
                :disabled="!selectedCategories || !selectedCategories.length"
                :label="t('ingredientCategories.actions.delete')"
                outlined
                rounded
                severity="danger"
                @click="confirmDeleteSelected"
              >
                <template #icon>
                  <i class="pi pi-times" style="font-size: 1.2rem" />
                </template>
              </PrimeButton>
            </div>
          </div>
        </template>

        <PrimeColumn
          :exportable="false"
          selection-mode="multiple"
          style="width: 3rem"
        ></PrimeColumn>
        <PrimeColumn
          :header="t('ingredientCategories.table.name')"
          field="label"
          sortable
          style="min-width: 12rem"
        >
          <template #body="slotProps">
            <span class="font-medium">{{ slotProps.data.label }}</span>
          </template>
        </PrimeColumn>
        <PrimeColumn
          :header="t('ingredientCategories.table.imageUrl')"
          style="min-width: 12rem"
        >
          <template #body="slotProps">
            <img
              v-if="slotProps.data.imageUrl"
              :alt="slotProps.data.label"
              :src="slotProps.data.imageUrl"
              class="rounded shadow-sm"
              style="width: 96px; height: 96px; object-fit: cover"
            />
            <span v-else>{{ t('ingredientCategories.table.noImage') }}</span>
          </template>
        </PrimeColumn>
        <PrimeColumn
          :exportable="false"
          :header="t('ingredientCategories.table.action')"
        >
          <template #body="slotProps">
            <PrimeButton
              class="mr-2"
              outlined
              rounded
              @click="editCategory(slotProps.data)"
            >
              <template #icon>
                <i class="pi pi-pencil" style="font-size: 1.2rem" />
              </template>
            </PrimeButton>
            <PrimeButton
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteCategory(slotProps.data)"
            >
              <template #icon>
                <i class="pi pi-times-circle" style="font-size: 1.2rem" />
              </template>
            </PrimeButton>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>

    <PrimeDialog
      v-model:visible="categoryDialog"
      :header="t('ingredientCategories.dialogs.detailsTitle')"
      :modal="true"
      :style="{ width: '450px' }"
      class="p-fluid"
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-center mb-2">
          <img
            v-if="category.imageUrl"
            :alt="category.label"
            :src="category.imageUrl"
            class="rounded shadow-md"
            style="width: 250px; height: 200px; object-fit: cover"
          />
          <span v-else>{{ t('ingredientCategories.table.noImage') }}</span>
        </div>

        <div class="field">
          <label class="font-medium mb-2 block" for="name">{{
            t('ingredientCategories.table.name')
          }}</label>
          <PrimeInputText
            id="name"
            v-model.trim="category.label"
            autofocus
            class="w-full"
            required
          />
        </div>

        <div class="field">
          <label class="mb-2 block" for="imageUrl">{{
            t('ingredientCategories.table.imageUrl')
          }}</label>
          <PrimeInputText
            id="imageUrl"
            v-model="category.imageUrl"
            class="w-full"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton
            :label="t('ingredientCategories.actions.cancel')"
            outlined
            @click="hideDialog"
          />
          <PrimeButton
            :label="t('ingredientCategories.actions.save')"
            @click="saveCategory"
          />
        </div>
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="deleteCategoryDialog"
      :modal="true"
      :style="{ width: '450px' }"
      header="Confirmation de la suppression"
    >
      <div class="flex items-center justify-center gap-4">
        <div>
          <p class="mt-2">
            {{ t('ingredientCategories.dialogs.confirmDeleteSingle')
            }}<span class="font-bold">{{ category.label }}</span> ?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton
            :label="t('ingredientCategories.buttons.no')"
            outlined
            @click="deleteCategoryDialog = false"
          />
          <PrimeButton
            :label="t('ingredientCategories.buttons.yes')"
            severity="danger"
            @click="deleteCurrentCategory"
          />
        </div>
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="deleteCategoriesDialog"
      :header="t('ingredientCategories.dialogs.confirmDeleteTitle')"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="flex items-center justify-center gap-4">
        <div>
          <p class="mt-2">
            {{ t('ingredientCategories.dialogs.confirmDeleteMultiple') }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton
            :label="t('ingredientCategories.buttons.no')"
            outlined
            @click="deleteCategoriesDialog = false"
          />
          <PrimeButton
            :label="t('ingredientCategories.buttons.yes')"
            severity="danger"
            @click="deleteSelectedCategories"
          />
        </div>
      </template>
    </PrimeDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  useCreateIngredientCategory,
  useDeleteIngredientCategory,
  useDeleteManyIngredientCategory,
  useFetchIngredientCategories,
  useUpdateIngredientCategory,
} from '../composables/ingredientCategory.composable'
import { useToast } from 'primevue'

const toast = useToast()
const { t } = useI18n()
const { data, refetch: refetchCategories } = useFetchIngredientCategories()
const updateCategory = useUpdateIngredientCategory()
const deleteCategory = useDeleteIngredientCategory()
const deleteManyCategory = useDeleteManyIngredientCategory()
const createCategory = useCreateIngredientCategory()

const isEditing = ref(false)

const filters = ref({
  global: { value: null, matchMode: 'contains' },
})

const selectedCategories = ref([])
const dt = ref(null)

const categoryDialog = ref(false)
const deleteCategoryDialog = ref(false)
const deleteCategoriesDialog = ref(false)

const submitted = ref(false)

const category = ref({
  id: '',
  label: '',
  imageUrl: '',
})

const openNew = () => {
  category.value = {}
  isEditing.value = false
  submitted.value = false
  categoryDialog.value = true
}

const hideDialog = () => {
  categoryDialog.value = false
  submitted.value = false
}

const editCategory = (editCategory) => {
  category.value = { ...editCategory }
  isEditing.value = true
  categoryDialog.value = true
}

const saveCategory = async () => {
  submitted.value = true

  const label = category.value.label?.trim()
  const imageUrl = category.value.imageUrl?.trim()

  if (!label) {
    return toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: t('ingredientCategories.error.nameRequired'),
      life: 3000,
    })
  }

  const payload: IngredientCategoryInput = {
    id: category.value.id,
    label,
    imageUrl: imageUrl,
  }

  try {
    if (isEditing.value && category.value.id) {
      await updateCategory.mutateAsync({ ...payload })
    } else {
      await createCategory.mutateAsync(payload)
    }
    categoryDialog.value = false

    await refetchCategories()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (
      error &&
      error.message &&
      error.message.includes(
        "The provided value for the column is too long for the column's type",
      )
    ) {
      return toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail:
          "L'URL de l'image est trop longue et ne peut pas être enregistrée. Veuillez fournir une URL plus courte.",
        life: 3000,
      })
    } else if (error) {
      return toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: error.message || error,
        life: 3000,
      })
    }
  }
}

const confirmDeleteCategory = (categoryToDelete) => {
  category.value = categoryToDelete
  deleteCategoryDialog.value = true
}

const deleteCurrentCategory = async () => {
  await deleteCategory.mutate(category.value.id)
  deleteCategoryDialog.value = false
  await refetchCategories()
}

const confirmDeleteSelected = () => {
  deleteCategoriesDialog.value = true
}

const deleteSelectedCategories = async () => {
  // Map usage to extract only the id
  const categoryIds = selectedCategories.value.map((category) => category.id)

  await deleteManyCategory.mutateAsync(categoryIds)

  deleteCategoriesDialog.value = false
  selectedCategories.value = []

  await refetchCategories()
}
</script>

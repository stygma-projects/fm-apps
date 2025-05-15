<template>
  <DataTable
    :items="ingredientCategories"
    :columns="columns"
    :filter-fields="filterFields"
  >
    <template #header="{ selectedItems }">
      <PrimeButton
        v-if="selectedItems.length > 0"
        :label="t('ingredientCategories.toolBar.deleteManyButton')"
        icon="pi pi-trash"
        severity="danger"
        :badge="selectedItems.length.toString()"
        :disabled="ingredientInCategory(selectedItems)" 
        @click="handleDeleteManyIngredientCategories(selectedItems)"
      ></PrimeButton>
      <PrimeButton
        v-else
        :label="t('ingredientCategories.toolBar.addButton')"
        icon="pi pi-plus"
        class="mr-2"
        @click="showCreateIngredientCategoryModal"
      ></PrimeButton>
    </template>
    <template #column-image-url="{ rowData }">
      <img
        v-if="rowData.imageUrl"
        :src="rowData.imageUrl"
        :alt="rowData.label"
        class="rounded shadow-sm"
      />
      <span v-else>{{ t('ingredientCategories.noImage') }}</span>
    </template>
    <template #actions="{ rowData }">
      <PrimeButton
        icon="pi pi-pencil"
        outlined
        rounded
        class="mr-2"
        severity="info"
        size="large"
        @click="showEditIngredientCategoryModal(rowData)"
      />
      <PrimeButton
        icon="pi pi-trash"
        outlined
        rounded
        severity="danger"
        size="large"
        :disabled="ingredientInCategory(rowData)" 
        @click="handleDeleteIngredientCategory(rowData)"
      />
    </template>
  </DataTable>
  <ModalWrapper
    v-model:is-visible="isUpdateIngredientCategoryModalVisible"
    :title="t('ingredientCategories.dialogs.editDialog.title')"
    :on-confirm="handleConfirmUpdateIngredientCategory"
    :on-cancel="handleCancelUpdateIngredientCategory"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableIngredientCategory.label"
          :label="t('ingredientCategories.table.headers.label')"
          autofocus
        />
        <InputText
          v-model="editableIngredientCategory.imageUrl"
          :label="t('ingredientCategories.table.headers.imageUrl')"
        />
      </div>
    </template>
  </ModalWrapper>
  <ModalWrapper
    v-model:is-visible="isCreateIngredientCategoryModalVisible"
    :title="t('ingredientCategories.dialogs.createDialog.title')"
    :on-confirm="handleConfirmCreateIngredientCategory"
    :on-cancel="handleCancelCreateIngredientCategory"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableIngredientCategory.label"
          :label="t('ingredientCategories.table.headers.label')"
          autofocus
        />
        <InputText
          v-model="editableIngredientCategory.imageUrl"
          :label="t('ingredientCategories.table.headers.imageUrl')"
        />
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import InputText from '../components/ui/form/input-text.component.vue'
import DataTable from '../components/ui/data-table.component.vue'
import ModalWrapper from '../components/ui/modal-wrapper.component.vue'
import {
  useFetchIngredientCategories,
  useDeleteIngredientCategory,
  useDeleteManyIngredientCategory,
  useCreateIngredientCategory,
  useUpdateIngredientCategory,
} from '../composables/api/ingredientCategory.composable'
import { ref } from 'vue'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
import type { GetByIdIngredientCategoryOutput } from '@fm-apps/trpc'

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: ingredientCategories, refetch: refetchIngredientCategories } =
  useFetchIngredientCategories()
const { mutateAsync: deleteIngredientCategory } = useDeleteIngredientCategory()
const { mutateAsync: updateIngredientCategory } = useUpdateIngredientCategory()
const { mutateAsync: createIngredientCategory } = useCreateIngredientCategory()
const { mutateAsync: deleteManyIngredientCategories } =
  useDeleteManyIngredientCategory()

const isUpdateIngredientCategoryModalVisible = ref(false)
const isCreateIngredientCategoryModalVisible = ref(false)
const currentIngredientCategory = ref<GetByIdIngredientCategoryOutput>(null)
const editableIngredientCategory = ref({
  label: '',
  imageUrl: '',
})
const columns = [
  { field: 'label', header: t(`ingredientCategories.table.headers.label`) },
  { field: 'imageUrl', header: t(`ingredientCategories.table.headers.imageUrl`) },
]
const filterFields = ['label']

const ingredientInCategory = (input: any | any[]) => {
  const categories = Array.isArray(input) ? input : [input]
  
  // Check if any of the categories have ingredients
  return categories.some(category => 
    category.ingredients.some(
      (ingredient: { category: { id: any } }) => ingredient.category?.id === category.id
    )
  )
}

const showEditIngredientCategoryModal = (rowData: any) => {
  currentIngredientCategory.value = rowData
  editableIngredientCategory.value = {
    label: rowData.label,
    imageUrl: rowData.imageUrl,
  }
  isUpdateIngredientCategoryModalVisible.value = true
}

const handleDeleteIngredientCategory = (rowData: any) => {
  deleteConfirmation({
    accept: async () => {
      await deleteIngredientCategory({ id: rowData.id })
      refetchIngredientCategories()
      successToast('Confirmed', 'Record deleted')
    },
  })
}

const handleConfirmUpdateIngredientCategory = async () => {
  if (!currentIngredientCategory.value) return
  await updateIngredientCategory({
    id: currentIngredientCategory.value.id,
    label: editableIngredientCategory.value.label,
    imageUrl: editableIngredientCategory.value.imageUrl,
  })
  successToast('Confirmed', 'Record updated')
  refetchIngredientCategories()
}

const resetEditableIngredientCategory = () => {
  editableIngredientCategory.value = {
    label: '',
    imageUrl: '',
  }
}

const handleCancelUpdateIngredientCategory = () => {
  resetEditableIngredientCategory()
}

const handleDeleteManyIngredientCategories = (selectedItems: any) => {
  const ids = selectedItems.map((item: any) => item.id)
  deleteConfirmation({
    accept: async () => {
      await deleteManyIngredientCategories({ ids })
      refetchIngredientCategories()
      // reset deleteMany button
      selectedItems.splice(0, selectedItems.length)
      successToast('Confirmed', 'Records deleted')
    },
  })
}

const showCreateIngredientCategoryModal = () => {
  isCreateIngredientCategoryModalVisible.value = true
  resetEditableIngredientCategory()
}

const handleConfirmCreateIngredientCategory = async () => {
  await createIngredientCategory({
    label: editableIngredientCategory.value.label,
    imageUrl: editableIngredientCategory.value.imageUrl,
  })
  successToast('Confirmed', 'Record created')
  refetchIngredientCategories()
}

const handleCancelCreateIngredientCategory = () => {
  editableIngredientCategory.value = {
    label: '',
    imageUrl: '',
  }
}
</script>

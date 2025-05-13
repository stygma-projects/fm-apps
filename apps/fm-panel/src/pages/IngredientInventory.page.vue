<template>
  <DataTable
    :items="ingredients"
    :columns="columns"
    :filter-fields="filterFields"
  >
    <template #header="{ selectedItems }">
      <PrimeButton
        v-if="selectedItems.length > 0"
        :label="t('ingredient.toolBar.deleteManyButton')"
        icon="pi pi-trash"
        severity="danger"
        :badge="selectedItems.length"
        @click="handleDeleteManyIngredients(selectedItems)"
      ></PrimeButton>
      <PrimeButton
        v-else
        :label="t('ingredient.toolBar.addButton')"
        icon="pi pi-plus"
        class="mr-2"
        @click="showCreateIngredientModal"
      ></PrimeButton>
    </template>
    <template #column-image-url="{ rowData }">
      <img
        v-if="rowData.imageUrl"
        :src="rowData.imageUrl"
        :alt="rowData.label"
        class="rounded shadow-sm"
      />
      <span v-else>{{ t('ingredient.noImage') }}</span>
    </template>
    <template #column-category="{ rowData }">
      {{ rowData.category.label }}
    </template>
    <template #actions="{ rowData }">
      <PrimeButton
        icon="pi pi-pencil"
        outlined
        rounded
        class="mr-2"
        severity="info"
        size="large"
        @click="showEditIngredientModal(rowData)"
      />
      <PrimeButton
        icon="pi pi-trash"
        outlined
        rounded
        severity="danger"
        size="large"
        @click="handleDeleteIngredient(rowData)"
      />
    </template>
  </DataTable>
  <ModalWrapper
    v-model:is-visible="isUpdateIngredientModalVisible"
    :title="t('ingredient.dialogs.editDialog.title')"
    :on-confirm="handleConfirmUpdateIngredient"
    :on-cancel="handleCancelUpdateIngredient"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableIngredient.label"
          :label="t('ingredient.table.headers.label')"
          autofocus
        />
        <InputText
          v-model="editableIngredient.imageUrl"
          :label="t('ingredient.table.headers.imageUrl')"
        />
        <InputText
          v-model="editableIngredient.priceExclTax"
          :label="t('ingredient.table.headers.priceExclTax')"
          :type="InputType.NUMBER"
        />
        <InputText
          v-model="editableIngredient.priceIncludingTax"
          :label="t('ingredient.table.headers.priceIncludingTax')"
          :type="InputType.NUMBER"
        />
        <PrimeDropdown
          v-model="editableIngredient.categoryId"
          :options="ingredientCategoryOptions"
          optionLabel="name"
          optionValue="value"
          :label="t('ingredient.table.headers.category')"
          placeholder="t('ingredient.dialogs.createDialog.categoryPlaceholder')"
        />
      </div>
    </template>
  </ModalWrapper>
  <ModalWrapper
    v-model:is-visible="isCreateIngredientModalVisible"
    :title="t('ingredient.dialogs.createDialog.title')"
    :on-confirm="handleConfirmCreateIngredient"
    :on-cancel="handleCancelCreateIngredient"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableIngredient.label"
          :label="t('ingredient.table.headers.label')"
          autofocus
        />
        <InputText
          v-model="editableIngredient.imageUrl"
          :label="t('ingredient.table.headers.imageUrl')"
        />
        <InputText
          v-model="editableIngredient.priceExclTax"
          :label="t('ingredient.table.headers.priceExclTax')"
          :type="InputType.NUMBER"
        />
        <InputText
          v-model="editableIngredient.priceIncludingTax"
          :label="t('ingredient.table.headers.priceIncludingTax')"
          :type="InputType.NUMBER"
        />
        <PrimeDropdown
          v-model="editableIngredient.categoryId"
          :options="ingredientCategoryOptions"
          optionLabel="name"
          optionValue="value"
          :label="t('ingredient.table.headers.category')"
          placeholder="Sélectionner une catégorie"
        />
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import InputText from '../components/ui/form/input-text.component.vue'
import { InputType } from '../types/primevue.type'
import DataTable from '../components/ui/data-table.component.vue'
import ModalWrapper from '../components/ui/modal-wrapper.component.vue'
import {
  useFetchIngredient,
  useDeleteIngredient,
  useDeleteManyIngredient,
  useCreateIngredient,
  useUpdateIngredient,
} from '../composables/api/ingredient.composable'
import { computed, ref } from 'vue'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
import type { GetByIdIngredientOutput } from '@fm-apps/trpc'

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: ingredients, refetch: refetchIngredients } =
  useFetchIngredient()
const { mutateAsync: deleteIngredient } = useDeleteIngredient()
const { mutateAsync: updateIngredient } = useUpdateIngredient()
const { mutateAsync: createIngredient } = useCreateIngredient()
const { mutateAsync: deleteManyIngredients } =
  useDeleteManyIngredient()

import { useFetchIngredientCategories } from '../composables/api/ingredientCategory.composable'
const { data: ingredientCategories } = useFetchIngredientCategories()

const isUpdateIngredientModalVisible = ref(false)
const isCreateIngredientModalVisible = ref(false)
const currentIngredient = ref<GetByIdIngredientOutput>(null)
const editableIngredient = ref({
  label: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  categoryId: '',
  imageUrl: '',
})
const columns = [
  { field: 'label', header: t(`ingredient.table.headers.label`) },
  { field: 'priceExclTax', header: t(`ingredient.table.headers.priceExclTax`) },
  { field: 'priceIncludingTax', header: t(`ingredient.table.headers.priceIncludingTax`) },
  { field: 'category', header: t(`ingredient.table.headers.category`) },
  { field: 'imageUrl', header: t(`ingredient.table.headers.imageUrl`) },
]
const filterFields = ['label', 'priceExclTax', 'priceIncludingTax', 'category.label']

const ingredientCategoryOptions = computed(() => {
  return (ingredientCategories.value ?? []).map(
    (category) => ({
      name: category.label,
      value: category.id,
    })
  )
})

const showEditIngredientModal = (rowData: any) => {
  currentIngredient.value = rowData
  editableIngredient.value = {
    label: rowData.label,
    priceExclTax: rowData.priceExclTax,
    priceIncludingTax: rowData.priceIncludingTax,
    categoryId: rowData.categoryId,
    imageUrl: rowData.imageUrl,
  }
  isUpdateIngredientModalVisible.value = true
}

const handleDeleteIngredient = (rowData: any) => {
  deleteConfirmation({
    accept: async () => {
      await deleteIngredient({ id: rowData.id })
      refetchIngredients()
      successToast('Confirmed', 'Record deleted')
    },
  })
}

const handleConfirmUpdateIngredient = async () => {
  if (!currentIngredient.value) return
  await updateIngredient({
    id: currentIngredient.value.id,
    label: editableIngredient.value.label,
    priceExclTax: editableIngredient.value.priceExclTax,
    priceIncludingTax: editableIngredient.value.priceIncludingTax,
    categoryId: editableIngredient.value.categoryId,
    imageUrl: editableIngredient.value.imageUrl,
  })
  successToast('Confirmed', 'Record updated')
  refetchIngredients()
}

const resetEditableIngredient = () => {
  editableIngredient.value = {
    label: '',
    priceExclTax: 0,
    priceIncludingTax: 0,
    categoryId: '',
    imageUrl: '',
  }
}

const handleCancelUpdateIngredient = () => {
  resetEditableIngredient()
}

const handleDeleteManyIngredients = (selectedItems: any) => {
  const ids = selectedItems.map((item: any) => item.id)
  deleteConfirmation({
    accept: async () => {
      await deleteManyIngredients({ ids })
      refetchIngredients()
      // reset deleteMany button
      selectedItems.splice(0, selectedItems.length)
      successToast('Confirmed', 'Records deleted')
    },
  })
}

const showCreateIngredientModal = () => {
  isCreateIngredientModalVisible.value = true
  resetEditableIngredient()
}

const handleConfirmCreateIngredient = async () => {
  await createIngredient({
    label: editableIngredient.value.label,
    priceExclTax: editableIngredient.value.priceExclTax,
    priceIncludingTax: editableIngredient.value.priceIncludingTax,
    categoryId: editableIngredient.value.categoryId,
    imageUrl: editableIngredient.value.imageUrl,
  })
  successToast('Confirmed', 'Record created')
  refetchIngredients()
}

const handleCancelCreateIngredient = () => {
  editableIngredient.value = {
    label: '',
    priceExclTax: 0,
    priceIncludingTax: 0,
    categoryId: '',
    imageUrl: '',
  }
}
</script>

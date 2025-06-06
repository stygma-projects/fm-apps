<template>
  <DataTable
    :columns="columns"
    :filter-fields="filterFields"
    :items="productCategories"
  >
    <template #header="{ selectedItems }">
      <PrimeButton
        v-if="selectedItems.length > 0"
        :badge="selectedItems.length.toString()"
        :label="t('productCategory.toolBar.deleteManyButton')"
        icon="pi pi-trash"
        severity="danger"
        @click="handleDeleteManyProductCategories(selectedItems)"
      ></PrimeButton>
      <PrimeButton
        v-else
        :label="t('productCategory.toolBar.addButton')"
        class="mr-2"
        icon="pi pi-plus"
        @click="showCreateProductCategoryModal"
      ></PrimeButton>
    </template>
    <template #column-image-url="{ rowData }">
      <img
        v-if="rowData.imageUrl"
        :alt="rowData.label"
        :src="rowData.imageUrl"
        class="rounded shadow-sm"
      />
      <span v-else>{{ t('productCategory.noImage') }}</span>
    </template>
    <template #actions="{ rowData }">
      <PrimeButton
        class="mr-2"
        icon="pi pi-pencil"
        outlined
        rounded
        severity="info"
        size="large"
        @click="showEditProductCategoryModal(rowData)"
      />
      <PrimeButton
        icon="pi pi-trash"
        outlined
        rounded
        severity="danger"
        size="large"
        @click="handleDeleteProductCategory(rowData)"
      />
    </template>
  </DataTable>
  <ModalWrapper
    v-model:is-visible="isUpdateProductCategoryModalVisible"
    :on-cancel="handleCancelUpdateProductCategory"
    :on-confirm="handleConfirmUpdateProductCategory"
    :title="t('productCategory.dialogs.editDialog.title')"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableProduct.label"
          :label="t('productCategory.table.headers.label')"
        />
        <InputText
          v-model="editableProduct.imageUrl"
          :label="t('productCategory.table.headers.imageUrl')"
        />
      </div>
    </template>
  </ModalWrapper>
  <ModalWrapper
    v-model:is-visible="isCreateProductCategoryModalVisible"
    :on-cancel="handleCancelCreateProductCategory"
    :on-confirm="handleConfirmCreateProductCategory"
    :title="t('productCategory.dialogs.createDialog.title')"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableProduct.label"
          :label="t('productCategory.table.headers.label')"
        />
        <InputText
          v-model="editableProduct.imageUrl"
          :label="t('productCategory.table.headers.imageUrl')"
        />
      </div>
    </template>
  </ModalWrapper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import InputText from '../components/ui/form/input-text.component.vue'
import DataTable from '../components/ui/data-table.component.vue'
import ModalWrapper from '../components/ui/modal-wrapper.component.vue'
import {
  useCreateProductCategory,
  useDeleteManyProductCategories,
  useDeleteProductCategory,
  useListProductCategories,
  useUpdateProductCategory,
} from '../composables/api/productCategory.composable'
import { ref } from 'vue'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
import type { GetByIdProductCategoryOutput } from '@fm-apps/trpc/'
import type {ProductCategory} from "../types/inventory.type.ts";

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: productCategories, refetch: refetchProductCategories } =
  useListProductCategories()
const { mutateAsync: deleteProductCategory } = useDeleteProductCategory()
const { mutateAsync: updateProductCategory } = useUpdateProductCategory()
const { mutateAsync: createProductCategory } = useCreateProductCategory()
const { mutateAsync: deleteManyProductCategories } =
  useDeleteManyProductCategories()

const isUpdateProductCategoryModalVisible = ref(false)
const isCreateProductCategoryModalVisible = ref(false)
const currentProductCategory = ref<GetByIdProductCategoryOutput>(null)
const editableProduct = ref({
  label: '',
  imageUrl: '',
})
const columns = [
  { field: 'label', header: t(`productCategory.table.headers.label`) },
  { field: 'imageUrl', header: t(`productCategory.table.headers.imageUrl`) },
]
const filterFields = ['label']

const showEditProductCategoryModal = (rowData: any) => {
  currentProductCategory.value = rowData
  editableProduct.value = {
    label: rowData.label,
    imageUrl: rowData.imageUrl,
  }
  isUpdateProductCategoryModalVisible.value = true
}

const handleDeleteProductCategory = (rowData:ProductCategory) => {
  deleteConfirmation({
    accept: async () => {
      await deleteProductCategory({ id: rowData.id })
      refetchProductCategories()
      successToast('Confirmed', 'Record deleted')
    },
  })
}

const handleConfirmUpdateProductCategory = async () => {
  if (!currentProductCategory.value) return
  await updateProductCategory({
    id: currentProductCategory.value.id,
    label: editableProduct.value.label,
    imageUrl: editableProduct.value.imageUrl,
  })
  successToast('Confirmed', 'Record updated')
  refetchProductCategories()
}

const handleCancelUpdateProductCategory = () => {
  editableProduct.value = {
    label: '',
    imageUrl: '',
  }
}

const handleDeleteManyProductCategories = (selectedItems: ProductCategory[]) => {
  const ids = selectedItems.map((item) => item.id)
  deleteConfirmation({
    accept: async () => {
      await deleteManyProductCategories({ ids })
      refetchProductCategories()
      successToast('Confirmed', 'Records deleted')
    },
  })
}

const showCreateProductCategoryModal = () => {
  isCreateProductCategoryModalVisible.value = true
}

const handleConfirmCreateProductCategory = async () => {
  await createProductCategory({
    label: editableProduct.value.label,
    imageUrl: editableProduct.value.imageUrl,
  })
  successToast('Confirmed', 'Record created')
  refetchProductCategories()
}

const handleCancelCreateProductCategory = () => {
  editableProduct.value = {
    label: '',
    imageUrl: '',
  }
}
</script>

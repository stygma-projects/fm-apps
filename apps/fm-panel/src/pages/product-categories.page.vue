  <template>
    <DataTable
      :items="productCategories"
      :columns="columns"
      :filter-fields="['label']"
    >
    <template #header="{ selectedItems }">
      <PrimeButton
            v-if="selectedItems.length > 0"
            :label="t('productCategory.toolBar.deleteManyButton')"
            icon="pi pi-trash"
            severity="danger"
            :badge="selectedItems.length"
            @click="handleDeleteMany(selectedItems)"
          ></PrimeButton>
      <PrimeButton
      v-else
            :label="t('productCategory.toolBar.addButton')"
            icon="pi pi-plus"
            class="mr-2"
            @click="handleCreation"
          ></PrimeButton>
          
    </template>
      <template #column-image-url="{ rowData }">
        <img
          v-if="rowData.imageUrl"
          :src="rowData.imageUrl"
          :alt="rowData.label"
          class="rounded shadow-sm"
        />
        <span v-else>{{ t('productCategory.table.noImage') }}</span>
      </template>
      <template #actions="{ rowData }">
        <PrimeButton
          icon="pi pi-pencil"
          outlined
          rounded
          class="mr-2"
          severity="info"
          size="large"
          @click="handleEdit(rowData)"
        />
        <PrimeButton
          icon="pi pi-trash"
          outlined
          rounded
          severity="danger"
          size="large"
          @click="handleDelete(rowData)"
        />
      </template>
    </DataTable>
    <ModalWrapper
      v-model:is-visible="isModalVisible"
      :title="t('productCategory.dialogs.editDialog.title')"
      :on-confirm="handleConfirm"
      :on-cancel="handleCancel"
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

  <script setup lang="ts">
  import { useI18n } from 'vue-i18n'
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

  const { t } = useI18n()
  const { defaultConfirmation } = useConfirmModal()
  const {infoToast} = useToast()
  const { data: productCategories, refetch: refetchProductCategories } = useListProductCategories()
  const { mutateAsync: deleteProductCategory } = useDeleteProductCategory()
  const { mutateAsync: updateProductCategory } = useUpdateProductCategory()
  const { mutateAsync: createProductCategory } = useCreateProductCategory()
  const { mutateAsync: deleteManyProductCategories } = useDeleteManyProductCategories()

  const isModalVisible = ref(false)
  const currentProductCategory = ref({
    id: '',
    label: '',
    imageUrl: '',
  })
  const editableProduct = ref({
    label: '',
    imageUrl: '',
  })
  const columns = [
    { field: 'label', header: t(`productCategory.table.headers.label`) },
    { field: 'imageUrl', header: t(`productCategory.table.headers.imageUrl`) },
  ]

  const handleEdit = (rowData: any) => {
    currentProductCategory.value = rowData
    editableProduct.value = {
      label: rowData.label,
      imageUrl: rowData.imageUrl
    }
    isModalVisible.value = true
  }

  const handleDelete = (rowData: any) => {
    confirm.require({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: async () => {
        await deleteProductCategory({ id: rowData.id })
        refetchProductCategories()
        infoToast('Confirmed', 'Record deleted', 3000)
      },
    })
  }

  const handleConfirm = async () => {
    await updateProductCategory({
      id: currentProductCategory.value.id,
      label: editableProduct.value.label,
      imageUrl: editableProduct.value.imageUrl,
    })
    infoToast('Confirmed', 'Record updated', 3000)
    refetchProductCategories()
  }

  const handleCancel = () => {
    console.log('cancel')
  }

  const handleDeleteMany = (selectedItems: any) => {
    const ids = selectedItems.map((item: any) => item.id)
    defaultConfirmation({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: async () => {
        await deleteManyProductCategories({ ids })
        refetchProductCategories()
        infoToast('Confirmed', 'Records deleted', 3000)
      },
    })
  }

  const handleCreation = () => {
    console.log('creation')
  }

  </script>

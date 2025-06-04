<template>
  <DataTable
    :columns="columns"
    :filter-fields="filterFields"
    :items="users"
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
  useFetchUsers,
  useSignUpWithMailAndPasswordUser,
  // useDeleteManyProductCategories,
  // useDeleteProductCategory,
  // useUpdateProductCategory,
} from '../composables/user.composable'
import { ref } from 'vue'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
import type { Session, Account } from '../../../../packages/db/generated/client'
import type { GetByIdUserOutput } from '@fm-apps/trpc'
// import type {User} from "../types/inventory.type.ts";

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: users, refetch: refetchUsers } =
  useFetchUsers()
// const { mutateAsync: deleteProductCategory } = useDeleteProductCategory()
// const { mutateAsync: updateProductCategory } = useUpdateProductCategory()
const { mutateAsync: createUser } = useSignUpWithMailAndPasswordUser()
// const { mutateAsync: deleteManyProductCategories } =
//   useDeleteManyProductCategories()

const isUpdateUserModalVisible = ref(false)
const isCreateUserModalVisible = ref(false)
const currentUser = ref<GetByIdUserOutput>(null)
const editableUser = ref({
    name : '',
    email : '',
    emailVerified : false,
    image : '',
    createdAt : new Date(),
    updatedAt : new Date(),
    sessions : [] as Session[],
    accounts : [] as Account[],
  })
const columns = [
  { field: 'name', header: t(`user.table.headers.name`) },
  { field: 'email', header: t(`user.table.headers.email`) },
  { field: 'emailVerified', header: t(`user.table.headers.emailVerified`) },
  { field: 'image', header: t(`user.table.headers.image`) },
  { field: 'createdAt', header: t(`user.table.headers.createdAt`) },
  { field: 'updatedAt', header: t(`user.table.headers.updatedAt`) },
  { field: 'sessions', header: t(`user.table.headers.sessions`) },
  { field: 'accounts', header: t(`user.table.headers.accounts`) },
]
const filterFields = ['name', 'email']

const showEditUserModal = (rowData: any) => {
  currentUser.value = rowData
  editableUser.value = {
    name : rowData.name,
    email : rowData.email,
    emailVerified : rowData.emailVerified,
    image : rowData.image,
    createdAt : rowData.createdAt,
    updatedAt : rowData.updatedAt,
    sessions : rowData.session,
    accounts : rowData.session,
  }
  isUpdateUserModalVisible.value = true
}

const handleDeleteProductCategory = (rowData:ProductCategory) => {
  deleteConfirmation({
    accept: async () => {
      await deleteProductCategory({ id: rowData.id })
      refetchUsers()
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
  refetchUsers()
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
      refetchUsers()
      successToast('Confirmed', 'Records deleted')
    },
  })
}

const showCreateProductCategoryModal = () => {
  isCreateProductCategoryModalVisible.value = true
}

const handleConfirmCreateProductCategory = async () => {
  await createUser({
    label: editableProduct.value.label,
    imageUrl: editableProduct.value.imageUrl,
  })
  successToast('Confirmed', 'Record created')
  refetchUsers()
}

const handleCancelCreateProductCategory = () => {
  editableProduct.value = {
    label: '',
    imageUrl: '',
  }
}
</script>

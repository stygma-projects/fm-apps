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
        :label="t('user.toolBar.deleteManyButton')"
        icon="pi pi-trash"
        severity="danger"
        @click="handleDeleteManyUsers(selectedItems)"
      ></PrimeButton>
      <PrimeButton
        v-else
        :label="t('user.toolBar.addButton')"
        class="mr-2"
        icon="pi pi-plus"
        @click="showCreateUserModal"
      ></PrimeButton>
    </template>
    <template #column-image-url="{ rowData }">
      <img
        v-if="rowData.imageUrl"
        :alt="rowData.label"
        :src="rowData.imageUrl"
        class="rounded shadow-sm"
      />
      <span v-else>{{ t('user.noImage') }}</span>
    </template>
    <template #column-email-verified="{ rowData }">
      <span v-if="rowData.emailVerified == 'true'">{{ t('user.emailVerified.true') }}</span>
      <span v-else>{{ t('user.emailVerified.false') }}</span>
    </template>
    <template #column-created-at="{ rowData }">
      <span>{{ handleDate(rowData.createdAt) }}</span>
    </template>
      <template #column-updated-at="{ rowData }">
      <span>{{ handleDate(rowData.updatedAt) }}</span>
    </template>
    <template #column-sessions="{ rowData }">
      <div
      v-if="rowData.sessions.length > 0">
      <span
      v-for="(session, index) in rowData.sessions"
      :key="index"
      > {{ t('user.dataExposition.id') }} {{ session.id }}, <br>{{ t('user.dataExposition.expiresAt') }} {{handleDate(session.expiresAt) }}<br></span>
      </div>
      <span v-else>{{ t('user.sessions.empty') }}</span>
    </template>
    <template #column-accounts="{ rowData }">
      <div
      v-if="rowData.accounts.length > 0">
      <span
      v-for="(account, index) in rowData.accounts"
      :key="index"
      > {{ t('user.dataExposition.id') }} {{ account.id }}, <br>{{ t('user.dataExposition.createdAt') }} {{handleDate(account.createdAt) }}<br>{{ t('user.dataExposition.updatedAt') }} {{handleDate(account.updatedAt) }}<br></span>
      </div>
      <span v-else>{{ t('user.accounts.empty') }}</span>
    </template>
    <template #actions="{ rowData }">
      <PrimeButton
        icon="pi pi-trash"
        outlined
        rounded
        severity="danger"
        size="large"
        @click="handleDeleteUser(rowData)"
      />
    </template>
  </DataTable>
  <ModalWrapper
    v-model:is-visible="isCreateUserModalVisible"
    :on-cancel="handleCancelCreateUser"
    :on-confirm="handleConfirmCreateUser"
    :title="t('user.dialogs.createDialog.title')"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableUser.name"
          :label="t('user.table.headers.name')"
        />
        <InputText
          v-model="editableUser.email"
          :label="t('user.table.headers.email')"
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
import utils from "@fm-apps/toolkit/utils"
import {
  useFetchUsers,
  useSignUpWithMailAndPasswordUser,
  useDeleteManyUsers,
  useDeleteUser,
} from '../composables/user.composable'
import { ref } from 'vue'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
import type { Session, Account } from '../../../../packages/db/generated/client'
import type { User } from '../types/inventory.type'

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: users, refetch: refetchUsers } = useFetchUsers()
const { mutateAsync: deleteUser } = useDeleteUser()
const { mutateAsync: deleteManyUsers } = useDeleteManyUsers()
const { mutateAsync: createUser } = useSignUpWithMailAndPasswordUser()

const isCreateUserModalVisible = ref(false)
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

const handleDate = (date : Date) => {
  return utils.formatDateTime(date)
}

const handleDeleteUser = (rowData:User) => {
  deleteConfirmation({
    accept: async () => {
      await deleteUser(rowData.id)
      refetchUsers()
      successToast('Confirmed', 'Record deleted')
    },
  })
}

const handleDeleteManyUsers = (selectedItems: User[]) => {
  const ids = selectedItems.map((item) => item.id)
  deleteConfirmation({
    accept: async () => {
      await deleteManyUsers(ids)
      refetchUsers()
      successToast('Confirmed', 'Records deleted')
    },
  })
}

const showCreateUserModal = () => {
  isCreateUserModalVisible.value = true
}

const handleConfirmCreateUser = async () => {
  await createUser({
    name: editableUser.value.name,
    email: editableUser.value.email,
    password: 'defaultPassword', // You might want to handle password input differently
  })
  successToast('Confirmed', 'Record created')
  refetchUsers()
  editableUser.value = {
    name : '',
    email : '',
    emailVerified : false,
    image : '',
    createdAt : new Date(),
    updatedAt : new Date(),
    sessions : [] as Session[],
    accounts : [] as Account[],
  }
}

const handleCancelCreateUser = () => {
  editableUser.value = {
    name : '',
    email : '',
    emailVerified : false,
    image : '',
    createdAt : new Date(),
    updatedAt : new Date(),
    sessions : [] as Session[],
    accounts : [] as Account[],
  }
}
</script>

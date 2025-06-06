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
    </template>
    <template #column-sessions="{ rowData }">
      <PrimeBadge
        v-if="rowData.sessions && rowData.sessions.length > 0"
        severity="success"
        class="mr-2"
        size="large"
      />
      <PrimeBadge
        v-else
        severity="danger"
        class="mr-2"
        size="large"
      />
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
    <template #column-created-at="{ rowData }">
      <span>{{ handleDate(rowData.createdAt) }}</span>
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
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import DataTable from '../components/ui/data-table.component.vue'
import utils from "@fm-apps/toolkit/utils"
import {
  useFetchUsers,
  useDeleteManyUsers,
  useDeleteUser,
} from '../composables/user.composable'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
import type { User } from '../types/inventory.type'
import PrimeBadge from 'primevue/badge'

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: users, refetch: refetchUsers } = useFetchUsers()
const { mutateAsync: deleteUser } = useDeleteUser()
const { mutateAsync: deleteManyUsers } = useDeleteManyUsers()

const columns = [
  { field: 'sessions', header: t(`user.table.headers.sessions`) },
  { field: 'name', header: t(`user.table.headers.name`) },
  { field: 'email', header: t(`user.table.headers.email`) },
  { field: 'createdAt', header: t(`user.table.headers.createdAt`) },
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
</script>

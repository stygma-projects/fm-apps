<template>
  <DataTable :items="schedules" :columns="columns">
    <template #header="{ selectedItems }">
      <PrimeButton
        v-if="selectedItems.length > 0"
        :label="t('schedule.toolBar.deleteManyButton')"
        icon="pi pi-trash"
        severity="danger"
        :badge="selectedItems.length.toString()"
        @click="handleDeleteManySchedules(selectedItems)"
      ></PrimeButton>
      <PrimeButton
        v-else
        :label="t('schedule.toolBar.addButton')"
        icon="pi pi-plus"
        class="mr-2"
        @click="showCreateScheduleModal"
      ></PrimeButton>
    </template>

    <template #column-opened="{ rowData }">
      <span v-if="rowData.opened === true">{{
        t('schedule.opened.open')
      }}</span>
      <span v-else>{{ t('schedule.opened.closed') }}</span>
    </template>

    <template #column-opening-hours="{ rowData }">
      <span v-if="rowData.openingHours.length === 0">
        {{ t('schedule.noOpeningHours') }}
      </span>
      <span
        v-for="(openingHour, index) in rowData.openingHours"
        v-else
        :key="index"
      >
        {{ formatHour(openingHour.startTime) + "-" + formatHour(openingHour.endTime) }}
        <span v-if="index < rowData.openingHours.length - 1">, </span>
      </span>
    </template>


    <template #column-day="{ rowData }">
        <span>
            {{ t('schedule.days.' + rowData.day) }}
        </span>
    </template>

    <template #actions="{ rowData }">
      <PrimeButton
        icon="pi pi-pencil"
        outlined
        rounded
        class="mr-2"
        severity="info"
        size="large"
        @click="showEditScheduleModal(rowData)"
      />
      <PrimeButton
        icon="pi pi-trash"
        outlined
        rounded
        severity="danger"
        size="large"
        @click="handleDeleteSchedule(rowData)"
      />
    </template>
  </DataTable>
  <ModalWrapper
    v-model:is-visible="isUpdateScheduleModalVisible"
    :title="t('schedule.dialogs.editDialog.title')"
    :on-confirm="handleConfirmUpdateSchedule"
    :on-cancel="handleCancelUpdateSchedule"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <!-- <InputText
          v-model="editableSchedule.openingHours"
          :label="t('schedule.table.headers.openingHours')"
        />
        <InputText
          v-model="editableSchedule.day"
          :label="t('schedule.table.headers.day')"
        />
        <InputText
          v-model="editableSchedule.opened"
          :label="t('schedule.table.headers.opened')"
          :type="InputType.NUMBER"
        /> -->
      </div>
    </template>
  </ModalWrapper>
  <ModalWrapper
    v-model:is-visible="isCreateScheduleModalVisible"
    :title="t('schedule.dialogs.createDialog.title')"
    :on-confirm="handleConfirmCreateSchedule"
    :on-cancel="handleCancelCreateSchedule"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <PrimeFloatLabel variant="on">
            <PrimeDropdown
            v-model="editableSchedule.day"
            :label="t('schedule.availability.available')"
            :options="DaysOptions"
            option-label="label"
            option-value="value"
            class="w-full"
            />
            <label>{{ t('schedule.table.headers.day') }}</label>
        </PrimeFloatLabel>
        <PrimeFloatLabel>
            <PrimeMultiSelect
            v-model="editableSchedule.openingHours"
            :options="openingHoursOptions"
            option-label="label"
            class="w-full"
            />
            <label>{{ t('schedule.table.headers.openingHours') }}</label>
        </PrimeFloatLabel>
        <PrimeFloatLabel variant="on">
            <PrimeDropdown
            v-model="editableSchedule.opened"
            :label="t('schedule.opened.open')"
            :options="booleanValues"
            option-label="label"
            option-value="value"
            class="w-full"
            />
            <label>{{ t('schedule.table.headers.opened') }}</label>
        </PrimeFloatLabel>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// import InputText from '../components/ui/form/input-text.component.vue'
import DataTable from '../components/ui/data-table.component.vue'
import ModalWrapper from '../components/ui/modal-wrapper.component.vue'
import {
  useCreateSchedule,
  useDeleteManySchedules,
  useDeleteSchedule,
  useListSchedule,
  useUpdateSchedule,
} from '../composables/schedule.composable'
import {
  useListOpeningHour,
} from '../composables/openingHour.composable'
import { ref, computed } from 'vue'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
// import { InputType } from '../types/primevue.type'
import type { Schedule } from '../types/inventory.type'
import { Days } from '../types/inventory.type';

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: schedules, refetch: refetchSchedule } = useListSchedule()
const { data: openingHoursData, refetch: refetchOpeningHour } = useListOpeningHour()
const { mutateAsync: deleteSchedule } = useDeleteSchedule()
const { mutateAsync: updateSchedule } = useUpdateSchedule()
const { mutateAsync: createSchedule } = useCreateSchedule()
const { mutateAsync: deleteManySchedules } = useDeleteManySchedules()

const DaysOptions = Object.values(Days).map(day => ({
    label: t('schedule.days.' + day),
    value: day,
}))

const formatHour = (date: string | Date) =>
  new Date(date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

const openingHoursOptions = computed(() =>
    (openingHoursData.value ?? []).map(
        (hour) => ({
            label: `${formatHour(hour.startTime)} - ${formatHour(hour.endTime)}`,
            value: hour
        })
    )
)

const isUpdateScheduleModalVisible = ref(false)
const isCreateScheduleModalVisible = ref(false)
const currentSchedule = ref<Schedule>()
const editableSchedule = ref<Schedule>({
    openingHours: [] as Date[],
    day: '' as Days,
    opened: true,
})
const columns = [
  { field: 'day', header: t(`schedule.table.headers.day`) },
  { field: 'openingHours', header: t(`schedule.table.headers.openingHours`) },
  { field: 'opened', header: t(`schedule.table.headers.opened`) },
]
const booleanValues = [
  { label: t('schedule.booleanValues.true'), value: true },
  { label: t('schedule.booleanValues.false'), value: false },
]

const resetEditableSchedule = () => {
  editableSchedule.value = {
    openingHours: [] as Date[],
    day: '',
    opened: true,
  }
}

const showEditScheduleModal = (rowData: any) => {
  currentSchedule.value = rowData
  editableSchedule.value = {
    openingHours: [] as Date[],
    day: '',
    opened: true,
  }
  isUpdateScheduleModalVisible.value = true
}

const handleDeleteSchedule = (rowData: any) => {
  deleteConfirmation({
    accept: async () => {
      await deleteSchedule({ id: rowData.id })
      refetchSchedule()
      refetchOpeningHour()
      successToast('Confirmed', 'Record deleted')
    },
  })
}

const handleConfirmUpdateSchedule = async () => {
  if (!currentSchedule.value) return
  // try{
  await updateSchedule({
    id: currentSchedule.value.id,
    openingHours: editableSchedule.value.openingHours,
    day: editableSchedule.value.day,
    opened: editableSchedule.value.opened,
  })
  successToast('Confirmed', 'Record updated')
  refetchSchedule()
  refetchOpeningHour()
  resetEditableSchedule()
  // } catch (error) {
  //   errorToast('Error', error as string)
  // }
}

const handleCancelUpdateSchedule = () => {
  resetEditableSchedule()
}

const handleDeleteManySchedules = (selectedItems: any) => {
  const ids = selectedItems.map((item: any) => item.id)
  deleteConfirmation({
    accept: async () => {
      await deleteManySchedules(ids)
      refetchSchedule()
      refetchOpeningHour()
      successToast('Confirmed', 'Records deleted')
    },
  })
}

const showCreateScheduleModal = () => {
  isCreateScheduleModalVisible.value = true
}

const handleConfirmCreateSchedule = async () => {
    const usedOpeningHours = [] as Date[]
    for (hour in editableSchedule.value.openingHours){
        usedOpeningHours.append()
    }
    const ids = editableSchedule.value.openingHours.map(hour => hour.id)
    await createSchedule({
        openingHours: ids,
        day: editableSchedule.value.day,
        opened: editableSchedule.value.opened,
    })
    successToast('Confirmed', 'Record created')
    refetchSchedule()
    refetchOpeningHour()
    resetEditableSchedule()
}

const handleCancelCreateSchedule = () => {
  resetEditableSchedule()
}
</script>

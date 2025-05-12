<template>
  <PrimeDataTable
    v-model:filters="searchFilter"
    v-model:selection="selectedItems"
    :value="items"
    :columns="columns"
    :data-key="dataKey"
    :global-filter-fields="filterFields"
    :loading="isLoading"
  >
    <template #empty> No data found. </template>
    <template #loading> Loading data. Please wait. </template>
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">
          {{ t('productCategory.title') }}
        </h1>
        <div class="flex gap-2">
          <PrimeIconField v-if="filterFields.length > 0">
            <PrimeInputIcon>
              <i class="pi pi-search" />
            </PrimeInputIcon>
            <PrimeInputText
              v-model="searchFilter.global.value"
              :placeholder="t('common.searchPlaceholder')"
            />
          </PrimeIconField>
          <slot name="header" :selected-items="selectedItems"></slot>
        </div>
      </div>
    </template>
    <PrimeColumn selection-mode="multiple"></PrimeColumn>
    <PrimeColumn
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    >
      <template #body="{ data }">
        <slot :name="`column-${kebabCase(col.field)}`" :row-data="data">
          {{ data[col.field] }}
        </slot>
      </template>
    </PrimeColumn>
    <PrimeColumn>
      <template #body="{ data }">
        <slot name="actions" :row-data="data"></slot>
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, toRefs, type PropType } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { kebabCase } from '../../utils/format.util'

const { t } = useI18n()
interface ColumnProps {
  field: string
  header: string
}

const props = defineProps({
  items: {
    type: Array as PropType<
      { id: string; label: string; imageUrl: string | null }[]
    >,
    required: false,
    default: () => [],
  },
  columns: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
  dataKey: {
    default: 'id',
    type: String,
    required: false,
  },
  filterFields: {
    default: () => [],
    type: Array as PropType<string[]>,
    required: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { items, columns } = toRefs(props)

const searchFilter = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const selectedItems = ref([])
</script>

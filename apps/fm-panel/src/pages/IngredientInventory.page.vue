<template>
  <PrimeDataTable
    v-model:filters="filters"
    ref="dt"
    v-model:selection="selectedCategories"
    :value="data"
    data-key="id"
    filterDisplay="row"
    :global-filter-fields="[
      'label',
      'priceExclTax',
      'priceIncludingTax',
      'category.label',
    ]"
    class="p-datatable-sm"
    resizableColumns
    columnResizeMode="fit"
    scrollable
    scrollHeight="flex"
  >
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <h1 class="text-2xl font-bold mb-0">
          {{ t('ingredients.title') }}
        </h1>
        <div class="flex items-center">
          <PrimeInputText
            v-model="filters['global'].value"
            :placeholder="t('ingredients.search.searchPlaceholder')"
          />
        </div>
      </div>
    </template>

    <PrimeColumn
      selection-mode="multiple"
      style="width: 3%"
      :exportable="false"
    ></PrimeColumn>

    <PrimeColumn
      field="label"
      :header="t('ingredients.table.label')"
      style="width: 22%"
    >
      <template #body="{ data }">
        <div class="truncate" :title="data.label">{{ data.label }}</div>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeInputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          :placeholder="t('ingredients.search.searchPlaceholder')"
          class="w-full"
        />
      </template>
    </PrimeColumn>

    <PrimeColumn
      field="priceExclTax"
      :header="t('ingredients.table.priceHt')"
      style="width: 14%"
    >
      <template #body="{ data }">
        {{ data.priceExclTax }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeInputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          :placeholder="t('ingredients.search.searchPlaceholder')"
          class="w-full"
        />
      </template>
    </PrimeColumn>

    <PrimeColumn
      field="priceIncludingTax"
      :header="t('ingredients.table.priceTtc')"
      style="width: 14%"
    >
      <template #body="{ data }">
        {{ data.priceIncludingTax }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeInputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          :placeholder="t('ingredients.search.searchPlaceholder')"
          class="w-full"
        />
      </template>
    </PrimeColumn>

    <PrimeColumn :header="t('ingredients.table.imageUrl')" style="width: 110px">
      <template #body="{ data }">
        <img
          v-if="data.imageUrl"
          :src="data.imageUrl"
          :alt="data.label"
          class="rounded shadow-sm"
          style="width: 92px; height: 92px; object-fit: cover"
        />
        <span v-else>{{ t('ingredients.table.noImage') }}</span>
      </template>
    </PrimeColumn>

    <PrimeColumn
      :header="t('ingredients.table.category')"
      field="category.label"
      filterField="category.label"
      style="width: 14%"
      :showFilterMenu="false"
    >
      <template #body="{ data }">
        <div class="truncate" :title="data.category?.label">
          {{ data.category?.label }}
        </div>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeMultiSelect
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="categoriesOptions"
          optionLabel="name"
          optionValue="value"
          class="w-full"
        >
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <span>{{ slotProps.option.name }}</span>
            </div>
          </template>
        </PrimeMultiSelect>
      </template>
    </PrimeColumn>

    <PrimeColumn
      :exportable="false"
      :header="t('ingredientCategories.table.action')"
      class="w-[14%]"
    >
      <template #body="{}">
        <div class="flex justify-center w-full">
          <PrimeButton outlined rounded class="mr-1">
            <template #icon>
              <i class="pi pi-pencil" style="font-size: 1.2rem" />
            </template>
          </PrimeButton>
          <PrimeButton outlined rounded severity="danger">
            <template #icon>
              <i class="pi pi-times-circle" style="font-size: 1.2rem" />
            </template>
          </PrimeButton>
        </div>
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { FilterMatchMode } from '@primevue/core/api'
import { useFetchIngredient } from '../composables/ingredient.composable'

const { t } = useI18n()
const { data } = useFetchIngredient()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  label: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  priceExclTax: { value: null, matchMode: FilterMatchMode.EQUALS },
  priceIncludingTax: { value: null, matchMode: FilterMatchMode.EQUALS },
  'category.label': { value: [], matchMode: FilterMatchMode.IN },
})

const selectedCategories = ref([])

const categoriesOptions = computed(() => {
  const unique = new Map()
  ;(data.value ?? []).forEach((ingredient) => {
    if (ingredient.category && ingredient.category.label) {
      unique.set(ingredient.category.id, {
        name: ingredient.category.label,
        value: ingredient.category.label,
      })
    }
  })
  return Array.from(unique.values())
})
</script>

<style>
.p-multiselect-header {
  display: none !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>

<template>
  <DataTable
    :items="products"
    :columns="columns"
    :filter-fields="filterFields"
  >
    <template #header="{ selectedItems }">
      <PrimeButton
        v-if="selectedItems.length > 0"
        :label="t('productsInventory.toolBar.deleteManyButton')"
        icon="pi pi-trash"
        severity="danger"
        :badge="selectedItems.length"
        @click="handleDeleteManyProducts(selectedItems)"
      ></PrimeButton>
      <PrimeButton
        v-else
        :label="t('productsInventory.toolBar.addButton')"
        icon="pi pi-plus"
        class="mr-2"
        @click="showCreateProductCategoryModal"
      ></PrimeButton>
    </template>
    <template #column-image-url="{ rowData }">
      <img
        v-if="rowData.imageUrl"
        :src="rowData.imageUrl"
        :alt="rowData.label"
        class="rounded shadow-sm"
      />
      <span v-else>{{ t('productsInventory.noImage') }}</span>
    </template>
    <template #column-available="{ rowData }">
      <span v-if="rowData.available === true">{{ t('productsInventory.availability.available') }}</span>
      <span v-else>{{ t('productsInventory.availability.notAvailable') }}</span>
    </template>
    <template #column-category="{ rowData }">
      <span>{{ rowData.category.label }}</span>
    </template>
    <template #column-ingredients="{ rowData }">
      <span
        v-for="(ingredient, index) in rowData.ingredients"
        :key="index"
      >
        {{ ingredient.ingredient.label}} <span v-if="index < rowData.length - 1">,</span>
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
        @click="showEditProductModal(rowData)"
      />
      <PrimeButton
        icon="pi pi-trash"
        outlined
        rounded
        severity="danger"
        size="large"
        @click="handleDeleteProduct(rowData)"
      />
    </template>
  </DataTable>
  <ModalWrapper
    v-model:is-visible="isUpdateProductModalVisible"
    :title="t('productsInventory.dialogs.editDialog.title')"
    :on-confirm="handleConfirmUpdateProduct"
    :on-cancel="handleCancelUpdateProduct"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableProduct.label"
          :label="t('productsInventory.table.headers.label')"
        />
        <InputText
          v-model="editableProduct.imageUrl"
          :label="t('productsInventory.table.headers.imageUrl')"
        />
        <InputText
          v-model="editableProduct.priceExclTax"
          :label="t('productsInventory.table.headers.priceExclTax')"
          :type=InputType.NUMBER
        />
        <InputText
          v-model="editableProduct.priceIncludingTax"
          :label="t('productsInventory.table.headers.priceIncludingTax')"
          :type=InputType.NUMBER
        />
        <PrimeFloatLabel variant="on">
          <PrimeDropdown
            v-model="editableProduct.available"
            :label="t('productsInventory.availability.available')"
            :options="booleanValues"
            option-label="label"
            option-value="value"
            class="w-full"
          />
          <label>{{ t('productsInventory.table.headers.available') }}</label>
        </PrimeFloatLabel>
        <PrimeFloatLabel variant="on">
          <PrimeDropdown
            v-model="editableProduct.category"
            :options="productCategories"
            option-label="label"
            class="w-full"
          />
          <label> {{ t('productsInventory.table.headers.category') }}</label>
        </PrimeFloatLabel>
        
      </div>
    </template>
  </ModalWrapper>
  <ModalWrapper
    v-model:is-visible="isCreateProductModalVisible"
    :title="t('productsInventory.dialogs.createDialog.title')"
    :on-confirm="handleConfirmCreateProduct"
    :on-cancel="handleCancelCreateProduct"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <InputText
          v-model="editableProduct.label"
          :label="t('productsInventory.table.headers.label')"
        />
        <InputText
          v-model="editableProduct.imageUrl"
          :label="t('productsInventory.table.headers.imageUrl')"
        />
        <InputText
          v-model="editableProduct.priceExclTax"
          :label="t('productsInventory.table.headers.priceExclTax')"
          :type=InputType.NUMBER
        />
        <InputText
          v-model="editableProduct.priceIncludingTax"
          :label="t('productsInventory.table.headers.priceIncludingTax')"
          :type=InputType.NUMBER
        />
        <PrimeFloatLabel variant="on">
          <PrimeDropdown
            v-model="editableProduct.available"
            :label="t('productsInventory.availability.available')"
            :options="booleanValues"
            option-label="label"
            option-value="value"
            class="w-full"
          />
          <label>{{ t('productsInventory.table.headers.available') }}</label>
        </PrimeFloatLabel>
        <PrimeFloatLabel variant="on">
          <PrimeDropdown
            v-model="editableProduct.category"
            :options="productCategories"
            option-label="label"
            class="w-full"
          />
          <label> {{ t('productsInventory.table.headers.category') }}</label>
        </PrimeFloatLabel>
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
  useCreateProduct,
  useDeleteManyProducts,
  useDeleteProduct,
  useListProducts,
  useUpdateProduct,
} from '../composables/api/productInventory.composable'
import { useListProductCategories } from '../composables/api/productCategory.composable'
import { ref } from 'vue'
import { useToast } from '../composables/toast.composable'
import { useConfirmModal } from '../composables/confirm-modal.composable'
import { InputType } from '../types/primevue.type'
import type { GetByIdProductCategoryOutput, GetByIdProductOutput } from '@fm-apps/trpc/'

const { t } = useI18n()
const { deleteConfirmation } = useConfirmModal()
const { successToast } = useToast()
const { data: products, refetch: refetchProduct } = useListProducts()
const { data: productCategories } = useListProductCategories()
const { mutateAsync: deleteProduct } = useDeleteProduct()
const { mutateAsync: updateProduct } = useUpdateProduct()
const { mutateAsync: createProduct } = useCreateProduct()
const { mutateAsync: deleteManyProducts } = useDeleteManyProducts()

const isUpdateProductModalVisible = ref(false)
const isCreateProductModalVisible = ref(false)
const currentProduct = ref<GetByIdProductOutput>(null)
const editableProduct = ref({
  label: '',
  imageUrl: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  available: true,
  category: {} as GetByIdProductCategoryOutput,
  categoryId: '',
  // ingredients: [] as IngredientInProduct[],
})
const columns = [
  { field: 'label', header: t(`productsInventory.table.headers.label`) },
  { field: 'imageUrl', header: t(`productsInventory.table.headers.imageUrl`) },
  { field: 'priceExclTax', header: t(`productsInventory.table.headers.priceExclTax`) },
  { field: 'priceIncludingTax', header: t(`productsInventory.table.headers.priceIncludingTax`) },
  { field: 'available', header: t(`productsInventory.table.headers.available`) },
  { field: 'category', header: t(`productsInventory.table.headers.category`) },
  { field: 'ingredients', header: t(`productsInventory.table.headers.ingredients`) },
]
const filterFields = [
    'label',
    'prixExclTax',
    'priceIncludingTax',
    'category.label',
  ]
const booleanValues = [
  { label: t('productsInventory.booleanValues.true'), value: true },
  { label: t('productsInventory.booleanValues.false'), value: false },
]

const showEditProductModal = (rowData: any) => {
  currentProduct.value = rowData
  editableProduct.value = {
    label: rowData.label,
    imageUrl: rowData.imageUrl,
    priceExclTax: rowData.priceExclTax,
    priceIncludingTax: rowData.priceIncludingTax,
    available: rowData.available,
    category: rowData.category,
    categoryId: rowData.categoryId,
    // ingredients: rowData.ingredients,
  }
  isUpdateProductModalVisible.value = true
}

const handleDeleteProduct = (rowData: any) => {
  deleteConfirmation({
    accept: async () => {
      await deleteProduct({ id: rowData.id })
      refetchProduct()
      successToast('Confirmed', 'Record deleted')
    },
  })
}

const handleConfirmUpdateProduct = async () => {
  if (!currentProduct.value) return
  await updateProduct({
    id: currentProduct.value.id,
    label: editableProduct.value.label,
    imageUrl: editableProduct.value.imageUrl,
    priceExclTax: editableProduct.value.priceExclTax,
    priceIncludingTax: editableProduct.value.priceIncludingTax,
    available: editableProduct.value.available,
    categoryId: editableProduct.value.category.id,
    // ingredients: editableProduct.value.ingredients,
  })
  successToast('Confirmed', 'Record updated')
  refetchProduct()
}

const handleCancelUpdateProduct = () => {
  editableProduct.value = {
  label: '',
  imageUrl: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  available: true,
  category: {} as GetByIdProductCategoryOutput,
  categoryId: '',
  // ingredients: [] as IngredientInProduct[],
  }
}

const handleDeleteManyProducts = (selectedItems: any) => {
  const ids = selectedItems.map((item: any) => item.id)
  deleteConfirmation({
    accept: async () => {
      await deleteManyProducts(ids)
      refetchProduct()
      successToast('Confirmed', 'Records deleted')
    },
  })
}

const showCreateProductCategoryModal = () => {
  isCreateProductModalVisible.value = true
}

const handleConfirmCreateProduct = async () => {
  await createProduct({
    label: editableProduct.value.label,
    imageUrl: editableProduct.value.imageUrl,
    priceExclTax: editableProduct.value.priceExclTax,
    priceIncludingTax: editableProduct.value.priceIncludingTax,
    available: editableProduct.value.available,
    categoryId: editableProduct.value.category.id,
    // ingredients : editableProduct.value.ingredients,
  })
  successToast('Confirmed', 'Record created')
  refetchProduct()
}

const handleCancelCreateProduct = () => {
  editableProduct.value = {
    label: '',
    imageUrl: '',
    priceExclTax: 0,
    priceIncludingTax: 0,
    available: true,
    category: {} as GetByIdProductCategoryOutput,
    categoryId: '',
    // ingredients: [] as IngredientInProduct[],
  }
}
</script>
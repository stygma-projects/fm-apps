<template>
  <div>
    <PrimeToolbar class="mb-6">
      <template #start>
        <h1 class="text-2xl font-bold">
          {{ t('productsInventory.title') }}
        </h1>
      </template>
      <template #end>
        <div class="flex gap-2 items-center">
          <PrimeIconField>
            <PrimeInputIcon>
              <i class="pi pi-search" />
            </PrimeInputIcon>
            <PrimeInputText
              v-model="filters['global'].value"
              :placeholder="t('productsInventory.toolBar.searchPlaceholder')"
            />
          </PrimeIconField>
          <PrimeButton
            :hidden="
              Array.isArray(selectedProducts) && selectedProducts.length > 0
            "
            :label="t('productsInventory.toolBar.addButton')"
            icon="pi pi-plus"
            class="mr-2"
            @click="startCreation"
          ></PrimeButton>
          <PrimeButton
            :hidden="!selectedProducts || !selectedProducts.length"
            :label="t('productsInventory.toolBar.deleteManyButton')"
            icon="pi pi-trash"
            severity="danger"
            @click="startDeletionMany"
          ></PrimeButton>
        </div>
      </template>
    </PrimeToolbar>

    <br />
    <div class="flex flex-wrap gap-2 items-center justify-between">
      <PrimeDataTable
        v-if="products"
        ref="dt"
        v-model:selection="selectedProducts"
        :filters="filters"
        :value="products"
        data-key="id"
        :pt="tableOptions"
        :global-filter-fields="[
          'label',
          'prixExclTax',
          'priceIncludingTax',
          'category.label',
        ]"
      >
        <!-- 'available' -->
        <PrimeColumn
          selection-mode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></PrimeColumn>
        <PrimeColumn
          v-for="(column, index) in Object.keys(products[0] || {}).filter(
            (key) =>
              key !== 'id' && key !== 'categoryId' && key !== 'ingredients',
          )"
          :key="index"
          :field="column"
          :header="t(`productsInventory.table.headers.${column}`)"
          style="width: 17%"
        >
          <template #body="rowData">
            <img
              v-if="column === 'imageUrl'"
              :src="rowData.data[column]"
              alt=""
              class="rounded"
              style="width: 128px"
            />
            <!-- <div v-else-if="column === 'ingredients'">
                <span
                  v-for="(ingredient, index) in rowData.data[column]"
                  :key="index"
                  >
                  {{ ingredient.ingredient.label}} <span v-if="index < rowData.data[column].length - 1">,</span>
                </span>
              </div> -->
            <div v-else-if="column === 'available'">
              <span v-if="rowData.data[column] === true">{{
                t('productsInventory.availability.available')
              }}</span>
              <span v-else>{{
                t('productsInventory.availability.notAvailable')
              }}</span>
            </div>
            <div v-else-if="column === 'category'">
              <span>{{ rowData.data[column].label }}</span>
            </div>
            <span v-else>
              {{ rowData.data[column] }}
            </span>
          </template>
        </PrimeColumn>
        <PrimeColumn>
          <template #body="rowData">
            <PrimeButton
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="startEdition(rowData.data)"
            />
            <PrimeButton
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="startDeletion(rowData.data)"
            />
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>

    <PrimeDialog
      v-model:visible="isUpdateDialogOpen"
      :header="t('productsInventory.dialogs.editDialog.title')"
      :modal="true"
      class="w-[30rem]"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.label')
          }}</label>
          <PrimeInputText v-model="editableProduct.label" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.imageUrl')
          }}</label>
          <PrimeInputText v-model="editableProduct.imageUrl" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.priceExclTax')
          }}</label>
          <PrimeInputText
            v-model.number="editableProduct.priceExclTax"
            type="number"
            class="w-full"
          />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.priceIncludingTax')
          }}</label>
          <PrimeInputText
            v-model.number="editableProduct.priceIncludingTax"
            type="number"
            class="w-full"
          />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.available')
          }}</label>
          <PrimeDropdown
            v-model="editableProduct.available"
            :options="booleanValues"
            option-label="label"
            option-value="value"
            class="w-full"
          />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.category')
          }}</label>
          <PrimeDropdown
            v-model="editableProduct.category"
            :options="productCategories"
            option-label="label"
            class="w-full"
          />
        </div>
        <!-- <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.ingredients')
          }}</label>
          <PrimeMultiSelect
            v-model="usedIngredients"
            :options="ingredients"
            optionLabel="label"
            class="w-full"
          />
        </div> -->
      </div>

      <template #footer>
        <PrimeButton
          label="Cancel"
          icon="pi pi-times"
          text
          @click="stopEdition"
        />
        <PrimeButton
          label="Save"
          icon="pi pi-check"
          @click="updateProductInInventory"
        />
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="isDeleteDialogOpen"
      :header="t('productsInventory.dialogs.deleteDialog.title')"
      :modal="true"
      class="w-[30rem]"
    >
      <div class="flex flex-col gap-4">
        <h1 class="block mb-1">
          {{ t('productsInventory.dialogs.deleteDialog.message') }}
        </h1>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.label')
          }}</label>
          <label class="w-full">{{ deletableProduct.label }}</label>
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.imageUrl')
          }}</label>
          <img
            :src="deletableProduct.imageUrl"
            :alt="t('productsInventory.noImage')"
            class="rounded"
          />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.priceExclTax')
          }}</label>
          <label class="w-full">{{ deletableProduct.priceExclTax }}</label>
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.priceIncludingTax')
          }}</label>
          <label class="w-full">{{ deletableProduct.priceIncludingTax }}</label>
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.available')
          }}</label>
          <label class="w-full">{{
            booleanValues.find(
              (i: any) => i.value === deletableProduct.available,
            )?.label
          }}</label>
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.category')
          }}</label>
          <label class="w-full">{{ deletableProduct.category.label }}</label>
        </div>
        <!-- <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.ingredients')
          }}</label>
          <span
            v-for="(ingredient, index) in deletableProduct.ingredients"
            :key="index"
            >
            {{ ingredients.find((i: Ingredient) => i.id === ingredient.ingredientId).label }} <span v-if="index < deletableProduct.ingredients.length - 1">,</span>
          </span>
        </div> -->
      </div>

      <template #footer>
        <PrimeButton
          label="Cancel"
          icon="pi pi-times"
          text
          @click="isDeleteDialogOpen = false"
        />
        <PrimeButton
          label="Delete"
          icon="pi pi-check"
          @click="deleteProductFromInventory"
        />
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="isCreationDialogOpen"
      :header="t('productsInventory.dialogs.createDialog.title')"
      :modal="true"
      class="w-[30rem]"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.label')
          }}</label>
          <PrimeInputText v-model="creatableProduct.label" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.imageUrl')
          }}</label>
          <PrimeInputText v-model="creatableProduct.imageUrl" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.priceExclTax')
          }}</label>
          <PrimeInputText class="w-full">{{
            creatableProduct.priceExclTax
          }}</PrimeInputText>
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.priceIncludingTax')
          }}</label>
          <PrimeInputText class="w-full">{{
            creatableProduct.priceIncludingTax
          }}</PrimeInputText>
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.available')
          }}</label>
          <PrimeDropdown
            v-model="creatableProduct.available"
            :options="booleanValues"
            option-label="label"
            option-value="value"
            class="w-full"
          />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.category')
          }}</label>
          <PrimeDropdown
            v-model="creatableProduct.category"
            :options="productCategories"
            option-label="label"
            class="w-full"
            :placeholder="
              t('productsInventory.dialogs.createDialog.categoryPlaceholder')
            "
          />
        </div>
        <!-- <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.ingredients')
          }}</label>
          <PrimeMultiSelect
            v-model="usedIngredients"
            :options="ingredients"
            optionLabel="label"
            class="w-full"
          />
        </div> -->
      </div>

      <template #footer>
        <PrimeButton
          label="Cancel"
          icon="pi pi-times"
          text
          @click="stopCreation"
        />
        <PrimeButton
          label="Create"
          icon="pi pi-check"
          @click="createProductInInventory"
        />
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="isDeleteManyDialogOpen"
      :header="t('productsInventory.dialogs.deleteManyDialog.title')"
      :modal="true"
      class="w-[30rem]"
    >
      <PrimeDataTable :value="selectedProducts">
        <PrimeColumn
          v-for="(column, index) in Object.keys(
            selectedProducts[0] || {},
          ).filter((key) => key === 'label')"
          :key="index"
          :field="column"
          :header="t(`productsInventory.table.headers.${column}`)"
          style="width: 35%"
        >
        </PrimeColumn>
      </PrimeDataTable>

      <template #footer>
        <PrimeButton
          label="Cancel"
          icon="pi pi-times"
          text
          @click="isDeleteManyDialogOpen = false"
        />
        <PrimeButton
          label="Delete"
          icon="pi pi-check"
          @click="deleteManyProductsFromInventory"
        />
      </template>
    </PrimeDialog>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue' //computed
import { FilterMatchMode } from '@primevue/core/api'
import { useFetchProductCategories } from '../composables/productCategory.composable'
// import { useFetchIngredient } from '../composables/ingredient.composable'
// import type { Ingredient } from '@fm-apps/db'
import type { ProductCategory } from '@fm-apps/db'
// import type { IngredientInProduct } from '@fm-apps/db'
import {
  useFetchProducts,
  useUpdateProduct,
  useDeleteProduct,
  useCreateProduct,
  useDeleteManyProducts,
} from '../composables/productsInventory.composable'

// Define the type for the state parameter
interface TableState {
  d_editing?: boolean
  [key: string]: unknown
}

interface Product {
  id: string
  label: string
  imageUrl: string
  priceExclTax: number
  priceIncludingTax: number
  available: boolean
  category: ProductCategory
  categoryId: string
  // ingredients: IngredientInProduct[]
}

const { t } = useI18n()

// Define the table options with proper typing
const tableOptions = {
  table: { style: 'min-width: 75rem' },
  column: {
    bodycell: ({ state }: { state: TableState }) => ({
      style:
        state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem',
    }),
  },
}

const { data: products } = useFetchProducts() //refetch
const { data: productCategories } = useFetchProductCategories()
// const { data:ingredients } = useFetchIngredient()
// const { data:ingredientsInProducts } = useFetchIngredientInProduct()
const { mutate: updateProduct } = useUpdateProduct()
const { mutate: deleteProduct } = useDeleteProduct()
const { mutate: createProduct } = useCreateProduct()
const { mutate: deleteManyProducts } = useDeleteManyProducts()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// Pour afficher/masquer la modale
const isUpdateDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isCreationDialogOpen = ref(false)
const isDeleteManyDialogOpen = ref(false)

const selectedProducts = ref()

// Pour stocker le produit à éditer
const editableProduct = ref({
  id: '',
  label: '',
  imageUrl: '',
  priceExclTax: 0 as number,
  priceIncludingTax: 0 as number,
  available: true,
  category: {} as ProductCategory,
  categoryId: '',
  // ingredients: [] as IngredientInProduct[],
})

// Pour stocker le produit à supprimer
const deletableProduct = ref({
  id: '',
  label: '',
  imageUrl: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  available: true,
  category: {} as ProductCategory,
  // ingredients: [] as IngredientInProduct[],
})

// Pour stocker le produit à créer
const creatableProduct = ref({
  label: '',
  imageUrl: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  available: true,
  category: {} as ProductCategory,
  categoryId: '',
  // ingredients: [] as IngredientInProduct[],
})

const booleanValues = [
  { label: t('productsInventory.booleanValues.true'), value: true },
  { label: t('productsInventory.booleanValues.false'), value: false },
]

// const usedIngredients = ref([] as Ingredient[])

function startEdition(product: Product) {
  editableProduct.value = { ...product }
  // usedIngredients.value = []
  // for (const ingredient of product.ingredients) {
  //   usedIngredients.value.push(ingredients.value.find((i: Ingredient) => i.id === ingredient.ingredientId))
  // }
  isUpdateDialogOpen.value = true
}

function stopEdition() {
  isUpdateDialogOpen.value = false
  // usedIngredients.value = []
}

async function updateProductInInventory() {
  editableProduct.value.categoryId = editableProduct.value.category.id // TODO: fix this when the backend/datatable are updated by modifying the productCategory Column's logic
  await updateProduct({
    product: editableProduct.value,
    // ingredients : editableProduct.value.ingredients
  })
  isUpdateDialogOpen.value = false
}

function startDeletion(product: Product) {
  deletableProduct.value = { ...product }
  isDeleteDialogOpen.value = true
}

function deleteProductFromInventory() {
  deleteProduct(deletableProduct.value)
  isDeleteDialogOpen.value = false
}

function startCreation() {
  isCreationDialogOpen.value = true
  creatableProduct.value = {
    label: '',
    imageUrl: '',
    priceExclTax: 0,
    priceIncludingTax: 0,
    available: true,
    category: {} as ProductCategory,
    categoryId: '',
    // ingredients: [] as IngredientInProduct[],
  }
}

function stopCreation() {
  isCreationDialogOpen.value = false
  // usedIngredients.value = []
}

function createProductInInventory() {
  creatableProduct.value.categoryId = creatableProduct.value.category.id // TODO: fix this when the backend/datatable are updated by modifying the productCategory Column's logic
  createProduct(creatableProduct.value)
  isCreationDialogOpen.value = false
}

const startDeletionMany = () => {
  isDeleteManyDialogOpen.value = true
}

const deleteManyProductsFromInventory = () => {
  deleteManyProducts(
    selectedProducts.value.map((product: Product) => product.id),
  )
  isDeleteManyDialogOpen.value = false
  selectedProducts.value = []
}
</script>

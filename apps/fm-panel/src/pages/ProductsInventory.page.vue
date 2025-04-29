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
              v-model="filters['label'].value"
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

    <table>
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <PrimeDataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :value="products"
          data-key="id"
          :filters="filters"
          :pt="tableOptions"
        >
          <PrimeColumn
            selection-mode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></PrimeColumn>
          <PrimeColumn
            v-for="(column, index) in Object.keys(products[0] || {}).filter(
              (key) => key !== 'id',
            )"
            :key="index"
            :field="column"
            :header="t(`productsInventory.table.headers.${column}`)"
            style="width: 15%"
          >
            <template #body="rowData">
              <img
                v-if="column === 'imageUrl'"
                :src="rowData.data[column]"
                alt=""
                class="rounded"
                style="width: 128px"
              />
              <!-- <div v-else>
                <div v-if="column === 'ingredients'">
                  <div v-for="(ingredient, index) in rowData[column]" :key="index">
                    {{ ingredient.label }}
                  </div>
                </div> -->
              <span v-else>
                {{ rowData.data[column] }}
              </span>
              <!-- </div> -->
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
    </table>

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
            v-model="editableProduct.priceExclTax"
            class="w-full"
          />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.priceIncludingTax')
          }}</label>
          <PrimeInputText
            v-model="editableProduct.priceIncludingTax"
            class="w-full"
          />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.available')
          }}</label>
          <PrimeInputText v-model="editableProduct.available" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.category')
          }}</label>
          <PrimeInputText v-model="editableProduct.category" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.ingredients')
          }}</label>
          <PrimeInputText
            v-model="editableProduct.ingredients"
            class="w-full"
          />
        </div>
      </div>

      <template #footer>
        <PrimeButton
          label="Cancel"
          icon="pi pi-times"
          text
          @click="isUpdateDialogOpen = false"
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
            :alt="'No Image ?'"
            class="rounded"
            style="width: 64px"
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
          <label class="w-full">{{ deletableProduct.available }}</label>
        </div>
        <div>
          <label class="block mb-1">{{
            t('productsInventory.table.headers.category')
          }}</label>
          <label class="w-full">{{ deletableProduct.category }}</label>
        </div>
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
      </div>

      <template #footer>
        <PrimeButton
          label="Cancel"
          icon="pi pi-times"
          text
          @click="isCreationDialogOpen = false"
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
import { ref } from 'vue'
// import { computed } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import {
  useFetchProducts,
  useUpdateProduct,
  useDeleteProduct,
  useCreateProduct,
  useDeleteManyProducts,
} from '../composables/productsInventory.composable'
// import { useFetchProductCategories } from '../composables/productCategory.composable'
// import type { ProductCategory } from '@fm-apps/db'

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
  category: string
  ingredients: string[]
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

// const products = ref([{
//                 label: 'Debug Sandwich',
//                 imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Salami_sandwich.jpg/500px-Salami_sandwich.jpg',
//                 priceExclTax: 1.0,
//                 priceIncludingTax: 1.2,
//                 available : true,
//                 category: 'aaaaaa',
//                 ingredients: {
//                   create: [
//                     {
//                       composition: 'BASE',
//                       mandatory: true,
//                       ingredient: {
//                         id: 'aaaaaa',
//                         label: 'Debug Bread',
//                       },
//                     },
//                   ],
//                 },
//               },])
// const { data:productCategories } = useFetchProductCategories()
const { data: products, refetch } = useFetchProducts()
const { mutate: updateProduct } = useUpdateProduct()
const { mutate: deleteProduct } = useDeleteProduct()
const { mutate: createProduct } = useCreateProduct()
const { mutate: deleteManyProducts } = useDeleteManyProducts()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  label: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// const mappedProducts = computed(() => {
//   if (!products.value) return []
//   return products.value.map((product: Product) => {
//     const { label, imageUrl, priceExclTax, priceIncludingTax, available, category, ingredients } = product
//     return {
//       label,
//       imageUrl,
//       priceExclTax,
//       priceIncludingTax,
//       available,
//       category,
//       // category: productCategories.value.find((cat) => cat.id === category)?.label,
//       ingredients,
//     }
//   })
// })

// Pour afficher/masquer la modale
const isUpdateDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isCreationDialogOpen = ref(false)
const isDeleteManyDialogOpen = ref(false)

const currentCategoryProductId = ref('')
const selectedProducts = ref()

// Pour stocker le produit à éditer
const editableProduct = ref({
  label: '',
  imageUrl: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  available: true,
  category: '',
  ingredients: [] as string[],
})

// Pour stocker le produit à supprimer
const deletableProduct = ref({
  label: '',
  imageUrl: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  available: true,
  category: '',
  ingredients: [] as string[],
})

// Pour stocker le produit à créer
const creatableProduct = ref({
  label: '',
  imageUrl: '',
})

function startEdition(product: Product) {
  currentCategoryProductId.value = product.id
  editableProduct.value = { ...product }
  isUpdateDialogOpen.value = true
}

async function updateProductInInventory() {
  await updateProduct({
    id: currentCategoryProductId.value,
    ...editableProduct.value,
  })
  isUpdateDialogOpen.value = false
  refetch.value()
}

function startDeletion(product: Product) {
  deletableProduct.value = { ...product }
  currentCategoryProductId.value = product.id
  isDeleteDialogOpen.value = true
}

function deleteProductFromInventory() {
  const a = {
    id: currentCategoryProductId.value,
  }
  deleteProduct(a)
  isDeleteDialogOpen.value = false
}

function startCreation() {
  isCreationDialogOpen.value = true
  creatableProduct.value = {
    label: '',
    imageUrl: '',
  }
}

function createProductInInventory() {
  const a = {
    label: creatableProduct.value.label,
    imageUrl: creatableProduct.value.imageUrl,
  }
  createProduct(a)
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

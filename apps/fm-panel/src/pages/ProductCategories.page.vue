<template>
  <div>
      <PrimeToolbar class="mb-6">
          <template #start>
              <h1 class="text-2xl font-bold">
                  {{ t('inventory.productCategory.title') }}
              </h1>
          </template>
          <template #end>
            <div class="flex gap-2 items-center">
                <PrimeIconField>
                    <PrimeInputIcon>
                        <i class="pi pi-search" />
                    </PrimeInputIcon>
                    <PrimeInputText v-model="filters['label'].value" :placeholder="t('inventory.productCategory.toolBar.searchPlaceholder')" />
                </PrimeIconField>
                <PrimeButton :label="t('inventory.productCategory.toolBar.addButton')" icon="pi pi-plus" class="mr-2" @click="startCreation"></PrimeButton>
                <!-- <PrimeButton :hidden="areManySelected" :label="t('inventory.productCategory.toolBar.deleteManyButton')" icon="pi pi-trash" severity="danger" @click="startCreation"></PrimeButton> -->
            </div>
          </template>
      </PrimeToolbar>

      <table>
        <PrimeDataTable 
          ref="dt"
          v-model:selection="selectedProducts"
          :value="productCategories"
          data-key="id"
          :filters="filters"
          :pt="{
            table: { style: 'min-width: 75rem' },
            column: {
              bodycell: ({ state }) => ({
                style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem'
              })
            }
          }"
        >
          <!-- <PrimeColumn selectionMode="multiple" style="width: 3rem" :exportable="false"></PrimeColumn> -->
          <PrimeColumn v-for="(column, index) in Object.keys(mappedProductCategory[0] || {})" :key="index" :field="column" :header="t(`inventory.productCategory.table.headers.${column}`)" style="width: 35%">
            <template #body="rowData">
              <img v-if="column === 'imageUrl'" :src="rowData.data[column]" alt="" class="rounded" style="width: 128px" />
              <span v-else>
                {{ rowData.data[column] }}
              </span>
            </template>
          </PrimeColumn>
          <PrimeColumn>
            <template #body="rowData">
              <PrimeButton icon="pi pi-pencil" outlined rounded class="mr-2" @click="startEdition(rowData.data)" />
              <PrimeButton icon="pi pi-trash" outlined rounded severity="danger" @click="startDeletion(rowData.data)"/>
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </table>

      <PrimeDialog v-model:visible="isUpdateDialogOpen" :header="t('inventory.productCategory.dialogs.editDialog.title')" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.label')}}</label>
            <PrimeInputText v-model="editableProduct.label" class="w-full" />
          </div>
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.imageUrl')}}</label>
            <PrimeInputText v-model="editableProduct.imageUrl" class="w-full" />
          </div>
        </div>

        <template #footer>
          <PrimeButton label="Cancel" icon="pi pi-times" text @click="isUpdateDialogOpen = false" />
          <PrimeButton label="Save" icon="pi pi-check" @click="editProduct" />
        </template>
      </PrimeDialog>

      <PrimeDialog v-model:visible="isDeleteDialogOpen" :header="t('inventory.productCategory.dialogs.deleteDialog.title')" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
          <h1 class="block mb-1">{{t('inventory.productCategory.dialogs.deleteDialog.message')}}</h1>
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.label')}}</label>
            <label class="w-full">{{ deletableProduct.label }}</label>
          </div>
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.imageUrl')}}</label>
            <img :src="deletableProduct.imageUrl" :alt="'No Image ?'" class="rounded" style="width: 64px" />
          </div>
        </div>

        <template #footer>
          <PrimeButton label="Cancel" icon="pi pi-times" text @click="isDeleteDialogOpen = false" />
          <PrimeButton label="Delete" icon="pi pi-check" @click="deleteProduct" />
        </template>
      </PrimeDialog>

      
      <PrimeDialog v-model:visible="isCreationDialogOpen" :header="t('inventory.productCategory.dialogs.editDialog.title')" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.label')}}</label>
            <PrimeInputText v-model="creatableProduct.label" class="w-full" />
          </div>
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.imageUrl')}}</label>
            <PrimeInputText v-model="creatableProduct.imageUrl" class="w-full" />
          </div>
        </div>

        <template #footer>
          <PrimeButton label="Cancel" icon="pi pi-times" text @click="isCreationDialogOpen = false" />
          <PrimeButton label="Create" icon="pi pi-check" @click="createProduct" />
        </template>
      </PrimeDialog>

      <!-- <PrimeDialog v-model:visible="isdeleteProductsDialogOpen" :header="t('inventory.productCategory.dialogs.editDialog.title')" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
          <h1 class="block mb-1">{{t('inventory.productCategory.dialogs.deleteDialog.message')}}</h1>
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.label')}}</label>
            <label class="w-full">{{ deletableProduct.label }}</label>
          </div>
          <div>
            <label class="block mb-1">{{t('inventory.productCategory.table.headers.imageUrl')}}</label>
            <img :src="deletableProduct.imageUrl" :alt="'No Image ?'" class="rounded" style="width: 64px" />
          </div>
        </div>

        <template #footer>
          <PrimeButton label="Cancel" icon="pi pi-times" text @click="isDeleteDialogOpen = false" />
          <PrimeButton label="Delete" icon="pi pi-check" @click="deleteProduct" />
        </template>
      </PrimeDialog> -->

  </div>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import { ref } from 'vue'
import { computed } from 'vue'
import { FilterMatchMode } from '@primevue/core/api';
import { useFetchProductCategories, useUpdateProductCategories, useDeleteProductCategory, useCreateProductCategory} from '../composables/productCategory.composable'

interface ProductCategory {
  id: string,
  label: string,
  imageUrl: string
}

const { t } = useI18n()

const { data:productCategories, refetch } = useFetchProductCategories()
const { mutate:updateProductCategories } = useUpdateProductCategories()
const { mutate:deleteProductCategory} = useDeleteProductCategory()
const { mutate:createProductCategory} = useCreateProductCategory()

const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'label': {value: null, matchMode: FilterMatchMode.CONTAINS},
});


const mappedProductCategory = computed(()=>{
  if (!productCategories.value) return []
  return productCategories.value.map((productCategory)=>{
    const {label, imageUrl} = productCategory
    return {
      label,
      imageUrl
    }
  })
})

// Pour afficher/masquer la modale
const isUpdateDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isCreationDialogOpen = ref(false)
//const areManySelected = ref(true)
//const isdeleteProductsDialogOpen = ref(false)

const currentCategoryProductId = ref('')
//const selectedProducts = ref();

// Pour stocker le produit à éditer
const editableProduct = ref({
  label : '',
  imageUrl : ''
}) //productCategories.value[0]

// Pour stocker le produit à supprimer
const deletableProduct = ref({
  label : '',
  imageUrl : ''
}) 

// Pour stocker le produit à créer
const creatableProduct = ref({
  label : '',
  imageUrl : ''
}) 

function startEdition(product:ProductCategory) {
  currentCategoryProductId.value = product.id
  editableProduct.value = { ...product}
  isUpdateDialogOpen.value = true
}

async function editProduct() {
  await updateProductCategories({id : currentCategoryProductId.value, ...editableProduct.value})
  isUpdateDialogOpen.value = false
  refetch.value()
}

function startDeletion(product: ProductCategory){
  deletableProduct.value = { ...product}
  currentCategoryProductId.value = product.id
  isDeleteDialogOpen.value = true
}

function deleteProduct(){
  const a = {
    id : currentCategoryProductId.value
  }
  deleteProductCategory(a)
  isDeleteDialogOpen.value = false
}

function startCreation(){
  isCreationDialogOpen.value = true
  creatableProduct.value = {
    label : '',
    imageUrl : ''
  }
}

function createProduct(){
  const a = {
    label : creatableProduct.value.label,
    imageUrl : creatableProduct.value.imageUrl
  }
  createProductCategory(a)
  isCreationDialogOpen.value = false
}

</script>
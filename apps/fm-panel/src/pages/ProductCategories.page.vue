<template>
  <div class="dark:text-white">

      <PrimeToolbar class="mb-6">
          <template #start>
              <PrimeButton label="New" icon="pi pi-plus" class="mr-2" @click="startCreation"></PrimeButton>
          </template>
          <template #end>
            <div class="flex flex-wrap gap-2 items-center justify-between">
                <PrimeIconField>
                    <PrimeInputIcon>
                        <i class="pi pi-search" />
                    </PrimeInputIcon>
                    <PrimeInputText v-model="filters['label'].value" placeholder="Search..." /> <!-- v-model="filters['global'].value" -->
                </PrimeIconField>
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
          <PrimeColumn v-for="(column, index) in Object.keys(mappedProductCategory[0] || {})" :key="index" :field="column" :header="column" style="width: 35%">
            <template #body="rowData">
              <img v-if="column === 'imageUrl'" :src="rowData.data[column]" :alt="'No Image ?'" class="rounded" style="width: 128px" />
              <span v-else>
                {{ rowData.data[column] }}
              </span>
            </template>
          </PrimeColumn>
          <PrimeColumn header="editeur">
            <template #body="rowData">
              <PrimeButton icon="pi pi-pencil" outlined rounded class="mr-2" @click="startEdition(rowData.data)" />
              <PrimeButton icon="pi pi-trash" outlined rounded severity="danger" @click="startDeletion(rowData.data)"/>
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </table>

      <PrimeDialog v-model:visible="isUpdateDialogOpen" header="Edit Product" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1">Label</label>
            <PrimeInputText v-model="editableProduct.label" class="w-full" />
          </div>
          <div>
            <label class="block mb-1">Image URL</label>
            <PrimeInputText v-model="editableProduct.imageUrl" class="w-full" />
          </div>
        </div>

        <template #footer>
          <PrimeButton label="Cancel" icon="pi pi-times" text @click="isUpdateDialogOpen = false" />
          <PrimeButton label="Save" icon="pi pi-check" @click="editProduct" />
        </template>
      </PrimeDialog>

      <PrimeDialog v-model:visible="isDeleteDialogOpen" header="Delete Product" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
          <h1 class="block mb-1">Are you sure you want to delete ?</h1>
          <div>
            <label class="block mb-1">Label</label>
            <label class="w-full">{{ deletableProduct.label }}</label>
          </div>
          <div>
            <label class="block mb-1">Image Url</label>
            <img :src="deletableProduct.imageUrl" :alt="'No Image ?'" class="rounded" style="width: 64px" />
          </div>
        </div>

        <template #footer>
          <PrimeButton label="Cancel" icon="pi pi-times" text @click="isDeleteDialogOpen = false" />
          <PrimeButton label="Delete" icon="pi pi-check" @click="deleteProduct" />
        </template>
      </PrimeDialog>

      
      <PrimeDialog v-model:visible="isCreationDialogOpen" header="Create Product" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1">Label</label>
            <PrimeInputText v-model="creatableProduct.label" class="w-full" />
          </div>
          <div>
            <label class="block mb-1">Image URL</label>
            <PrimeInputText v-model="creatableProduct.imageUrl" class="w-full" />
          </div>
        </div>

        <template #footer>
          <PrimeButton label="Cancel" icon="pi pi-times" text @click="isCreationDialogOpen = false" />
          <PrimeButton label="Create" icon="pi pi-check" @click="createProduct" />
        </template>
      </PrimeDialog>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { FilterMatchMode } from '@primevue/core/api';
import { useFetchProductCategories, useUpdateProductCategories, useDeleteProductCategory, useCreateProductCategory} from '../composables/productCategory.composable'

interface ProductCategory {
  id: string,
  label: string,
  imageUrl: string
}

const { data:productCategories } = useFetchProductCategories()
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

const currentCategoryProductId = ref('')

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

function editProduct() {
  updateProductCategories({id : currentCategoryProductId.value, ...editableProduct.value})
  isUpdateDialogOpen.value = false
  // const response = useFetchProductCategories()
  // if (response.data){
  //   productCategories.value = response.data;
  // }
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
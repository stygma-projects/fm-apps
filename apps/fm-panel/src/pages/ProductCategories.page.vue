<template>
  <div class="dark:text-white">
    <table>

      <PrimeDataTable 
        ref="dt"
        v-model:selection="selectedProducts"
        :value="mappedProductCategory"
        data-Key="id"
      >
        <PrimeColumn v-for="(column, index) in Object.keys(mappedProductCategory[0] || {})" :key="index" :field="column" :header="column" style="width: 20%">
          <template #body="rowData">
            <img v-if="column === 'imageUrl'" :src="rowData.data[column]" :alt="'No Image ?'" class="rounded" style="width: 64px" />
            <span v-else>
              {{ rowData.data[column] }}
            </span>
          </template>
        </PrimeColumn>
        <PrimeColumn header="editeur">
          <template #body="rowData">
            <PrimeButton icon="pi pi-pencil" rounded class="mr-2" @click="editProduct(rowData.data.id)" />
            <PrimeButton icon="pi pi-trash" rounded severity="danger" />
          </template>
        </PrimeColumn>
      </PrimeDataTable>

    </table>

    <PrimeDialog v-model:visible="isDialogOpen" header="Edit Product" :modal="true" class="w-[30rem]">
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
        <PrimeButton label="Cancel" icon="pi pi-times" text @click="isDialogOpen = false" />
        <PrimeButton label="Save" icon="pi pi-check" @click="saveProduct" />
      </template>
    </PrimeDialog>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useFetchProductCategories, useUpdateProductCategories } from '../composables/productCategory.composable'

const { data:productCategories } = useFetchProductCategories()

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
const isDialogOpen = ref(false)

const currentCategoryProductId = ref('')

// Pour stocker le produit à éditer
const editableProduct = ref() //productCategories.value[0]

function editProduct(productId: string) {
  currentCategoryProductId.value = productId
  if (productCategories.value){
    const currentCategoryProduct = ref(productCategories.value.find(p => p.id === currentCategoryProductId.value))
    editableProduct.value = { ...currentCategoryProduct.value }
    isDialogOpen.value = true
  }
  else{
    console.log('No.')
  }
}

function saveProduct() {
  useUpdateProductCategories(editableProduct.value)
  isDialogOpen.value = false
}

</script>
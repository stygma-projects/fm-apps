<template>
  <div class="dark:text-white">
    <table>

      <PrimeDataTable 
        ref="dt"
        v-model:selection="selectedProducts"
        :value="productCategories"
        data-Key="id"
      >
        <PrimeColumn v-for="(column, index) in Object.keys(mappedProductCategory[0] || {})" :key="index" :field="column" :header="column" style="width: 20%">
          <template #body="slotProps">
            <img v-if="column === 'imageUrl'" :src="slotProps.data[column]" alt="Nope LOL." class="rounded" style="width: 64px" />
            <span v-else>
              {{ slotProps.data[column] }}
            </span>
          </template>
        </PrimeColumn>
        <PrimeColumn header="editeur">
          <template #body="slotProps">
            {{ slotProps}}
            <PrimeButton icon="pi pi-pencil" rounded class="mr-2" @click="editProduct(slotProps.data)" />
            <!-- <PrimeButton icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" /> -->
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
        <!-- <PrimeButton label="Save" icon="pi pi-check" @click="saveProduct" /> -->
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

// Pour stocker le produit à éditer
const editableProduct = ({ label: '', imageUrl: '' })

function editProduct(product: any) {
  console.log(product)
  isDialogOpen.value = true
}

// function saveProduct() {
//   // À adapter selon logique de sauvegarde (API, emit, etc.)
//   useUpdateProductCategories(editableProduct.value[0])
//   isDialogOpen.value = false
// }

</script>
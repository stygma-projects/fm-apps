<template>
  <div>
    <PrimeDataTable
      ref="dt"
      v-model:filters="filters"
      v-model:selection="selectedIngredients"
      :value="data"
      data-key="id"
      filter-display="row"
      :global-filter-fields="[
        'label',
        'priceExclTax',
        'priceIncludingTax',
        'category.label',
      ]"
      class="p-datatable-sm"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <h1 class="text-2xl font-bold mb-0">
            {{ t('ingredients.title') }}
          </h1>
          <div class="flex items-center">
            <div>
              <PrimeIconField>
                <PrimeInputIcon>
                  <i class="pi pi-search" />
                </PrimeInputIcon>
                <PrimeInputText
                  v-model="filters['global'].value"
                  :placeholder="t('ingredients.search.searchPlaceholder')"
                />
              </PrimeIconField>
            </div>
            <PrimeButton
              :label="t('ingredients.actions.new')"
              class="mr-3 ml-3"
              outlined
              rounded
              @click="openNew"
            >
              <template #icon>
                <i class="pi pi-plus" style="font-size: 1.2rem" />
              </template>
            </PrimeButton>
            <PrimeButton
              :disabled="!selectedIngredients || !selectedIngredients.length"
              :label="t('ingredients.actions.delete')"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteSelected"
            >
              <template #icon>
                <i class="pi pi-times" style="font-size: 1.2rem" />
              </template>
            </PrimeButton>
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
        <template #body="ingredient">
          <div class="truncate" :title="ingredient.data.label">
            {{ ingredient.data.label }}
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <PrimeInputText
            v-model="filterModel.value"
            type="text"
            :placeholder="t('ingredients.search.searchPlaceholder')"
            class="w-full"
            @input="filterCallback()"
          />
        </template>
      </PrimeColumn>

      <PrimeColumn
        field="priceExclTax"
        :header="t('ingredients.table.priceHt')"
        style="width: 14%"
      >
        <template #body="ingredient">
          {{ ingredient.data.priceExclTax }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <PrimeInputText
            v-model="filterModel.value"
            type="text"
            :placeholder="t('ingredients.search.searchPlaceholder')"
            class="w-full"
            @input="filterCallback()"
          />
        </template>
      </PrimeColumn>

      <PrimeColumn
        field="priceIncludingTax"
        :header="t('ingredients.table.priceTtc')"
        style="width: 14%"
      >
        <template #body="ingredient">
          {{ ingredient.data.priceIncludingTax }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <PrimeInputText
            v-model="filterModel.value"
            type="text"
            :placeholder="t('ingredients.search.searchPlaceholder')"
            class="w-full"
            @input="filterCallback()"
          />
        </template>
      </PrimeColumn>

      <PrimeColumn
        :header="t('ingredients.table.imageUrl')"
        style="width: 110px"
      >
        <template #body="ingredient">
          <img
            v-if="ingredient.data.imageUrl"
            :src="ingredient.data.imageUrl"
            :alt="ingredient.data.label"
            class="rounded shadow-sm"
            style="width: 92px; height: 92px; object-fit: cover"
          />
          <span v-else>{{ t('ingredients.table.noImage') }}</span>
        </template>
      </PrimeColumn>

      <PrimeColumn
        :header="t('ingredients.table.category')"
        field="category.label"
        filter-field="category.id"
        style="width: 14%"
        :show-filter-menu="false"
      >
        <template #body="ingredient">
          <div class="truncate" :title="ingredient.data.category?.label">
            {{ ingredient.data.category?.label }}
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <PrimeMultiSelect
            v-model="filterModel.value"
            :options="categoriesOptions"
            option-label="name"
            option-value="value"
            class="w-full"
            @change="filterCallback()"
          >
            <template #option="ingredient">
              <div class="flex items-center gap-2">
                <span>{{ ingredient.option.name }}</span>
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
        <template #body="slotProps">
          <PrimeButton
            class="mr-2"
            outlined
            rounded
            @click="editIngredient(slotProps.data)"
          >
            <template #icon>
              <i class="pi pi-pencil" style="font-size: 1.2rem" />
            </template>
          </PrimeButton>
          <PrimeButton
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteIngredient(slotProps.data)"
          >
            <template #icon>
              <i class="pi pi-times-circle" style="font-size: 1.2rem" />
            </template>
          </PrimeButton>
        </template>
      </PrimeColumn>
    </PrimeDataTable>

    <!-- Dialog de création/édition d'ingrédient -->
    <PrimeDialog
      v-model:visible="ingredientDialog"
      :header="
        isEditing
          ? t('ingredients.dialogs.editTitle')
          : t('ingredients.dialogs.detailsTitle')
      "
      :modal="true"
      :style="{ width: '450px' }"
      class="p-fluid"
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-center mb-2">
          <img
            v-if="ingredient.imageUrl"
            :alt="ingredient.label"
            :src="ingredient.imageUrl"
            class="rounded shadow-md"
            style="width: 120px; height: 120px; object-fit: cover"
          />
        </div>
        <div>
          <label for="label" class="font-semibold">{{
            t('ingredients.table.label')
          }}</label>
          <PrimeInputText
            id="label"
            v-model="ingredient.label"
            required
            autofocus
            class="w-full"
          />
        </div>
        <div>
          <label for="priceExclTax" class="font-semibold">{{
            t('ingredients.table.priceHt')
          }}</label>
          <PrimeInputText
            id="priceExclTax"
            v-model="ingredient.priceExclTax"
            type="number"
            class="w-full"
          />
        </div>
        <div>
          <label for="priceIncludingTax" class="font-semibold">{{
            t('ingredients.table.priceTtc')
          }}</label>
          <PrimeInputText
            id="priceIncludingTax"
            v-model="taxCalculator"
            type="number"
            class="w-full"
            disabled
          />
        </div>
        <div>
          <label for="imageUrl" class="font-semibold">{{
            t('ingredients.table.imageUrl')
          }}</label>
          <PrimeInputText
            id="imageUrl"
            v-model="ingredient.imageUrl"
            class="w-full"
          />
        </div>
        <div>
          <label for="category" class="font-semibold">{{
            t('ingredients.table.category')
          }}</label>
          <PrimeDropdown
            id="category"
            v-model="ingredient.categoryId"
            :options="allCategoriesOptions"
            option-label="name"
            option-value="value"
            placeholder="Choisir une catégorie"
            class="w-full"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton
            :label="t('ingredientCategories.actions.cancel')"
            outlined
            @click="hideDialog"
          />
          <PrimeButton
            :label="t('ingredientCategories.actions.save')"
            @click="saveIngredient"
          />
        </div>
      </template>
    </PrimeDialog>

    <!-- Dialog de suppression simple -->
    <PrimeDialog
      v-model:visible="deleteIngredientDialog"
      :modal="true"
      :style="{ width: '450px' }"
      :header="t('ingredients.dialogs.confirmDeleteTitle')"
    >
      <div class="flex items-center justify-center gap-4">
        <div>
          <p class="mt-2">
            {{ t('ingredients.dialogs.confirmDeleteSingle')
            }}<span class="font-bold">{{ ingredient.label }}</span> ?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton
            :label="t('ingredientCategories.buttons.no')"
            outlined
            @click="deleteIngredientDialog = false"
          />
          <PrimeButton
            :label="t('ingredientCategories.buttons.yes')"
            severity="danger"
            @click="deleteCurrentIngredient"
          />
        </div>
      </template>
    </PrimeDialog>

    <!-- Dialog de suppression multiple -->
    <PrimeDialog
      v-model:visible="deleteIngredientsDialog"
      :header="t('ingredients.dialogs.confirmDeleteTitle')"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="flex items-center justify-center gap-4">
        <div>
          <p class="mt-2">
            {{ t('ingredients.dialogs.confirmDeleteMultiple') }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <PrimeButton
            :label="t('ingredientCategories.buttons.no')"
            outlined
            @click="deleteIngredientsDialog = false"
          />
          <PrimeButton
            :label="t('ingredientCategories.buttons.yes')"
            severity="danger"
            @click="deleteSelectedIngredients"
          />
        </div>
      </template>
    </PrimeDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { FilterMatchMode } from '@primevue/core/api'
import {
  useFetchIngredient,
  useCreateIngredient,
  useUpdateIngredient,
  useDeleteIngredient,
  useDeleteManyIngredient,
} from '../composables/ingredient.composable'
import { useToast } from 'primevue'
import type { IngredientInput, IngredientWithCategory } from '../types/ingredientCategory.type'
import { useFetchIngredientCategories } from '../composables/ingredientCategory.composable'
import type { IngredientCategory } from '../../../../packages/db/generated/client'

const toast = useToast()
const { t } = useI18n()
const { data, refetch: refetchIngredients } = useFetchIngredient()
const { data: ingredientCategories } = useFetchIngredientCategories()
const createIngredient = useCreateIngredient()
const updateIngredient = useUpdateIngredient()
const deleteIngredient = useDeleteIngredient()
const deleteManyIngredient = useDeleteManyIngredient()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  label: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  priceExclTax: { value: null, matchMode: FilterMatchMode.EQUALS },
  priceIncludingTax: { value: null, matchMode: FilterMatchMode.EQUALS },
  'category.id': { value: [], matchMode: FilterMatchMode.IN },
})

const categoriesOptions = computed(() => {
  const unique = new Map()
  ;(data.value ?? []).forEach((ingredient: IngredientWithCategory) => {
    if (ingredient.label && ingredient.category.label) {
      unique.set(ingredient.category.id, {
        name: ingredient.category.label,
        value: ingredient.category.id,
      })
    }
  })
  return Array.from(unique.values())
})

const allCategoriesOptions = computed(() => {
  return (ingredientCategories.value ?? []).map((category: IngredientCategory) => ({
    name: category.label,
    value: category.id,
  }))
})

const selectedIngredients = ref<IngredientInput[]>([])
const dt = ref(null)

const ingredientDialog = ref(false)
const deleteIngredientDialog = ref(false)
const deleteIngredientsDialog = ref(false)
const isEditing = ref(false)
const submitted = ref(false)

const taxCalculator = computed(() => {
  return ingredient.value.priceExclTax
    ? parseFloat((ingredient.value.priceExclTax * 1.1).toFixed(2))
    : 0
})

const ingredient = ref<IngredientInput>({
  id: '',
  label: '',
  priceExclTax: 0,
  priceIncludingTax: 0,
  imageUrl: '',
  categoryId: '',
})

const openNew = () => {
  ingredient.value = {
    id: '',
    label: '',
    priceExclTax: 0,
    priceIncludingTax: 0,
    imageUrl: '',
    categoryId: '',
  }
  isEditing.value = false
  submitted.value = false
  ingredientDialog.value = true
}

const hideDialog = () => {
  ingredientDialog.value = false
  submitted.value = false
}

const editIngredient = (editIngredient: IngredientInput) => {
  let categoryId = editIngredient.categoryId
  if (!categoryId && editIngredient.categoryId) {
    categoryId = editIngredient.categoryId
  }
  ingredient.value = { ...editIngredient, categoryId }
  isEditing.value = true
  ingredientDialog.value = true
}

const saveIngredient = async () => {
  submitted.value = true

  const label = ingredient.value.label?.trim()

  if (!label) {
    return toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: t('ingredients.error.nameRequired'),
      life: 3000,
    })
  }

  // Mettre à jour priceIncludingTax avant de sauvegarder
  ingredient.value.priceIncludingTax = parseFloat(
    (ingredient.value.priceExclTax * 1.1).toFixed(2),
  )

  const payload: IngredientInput = {
    ...ingredient.value,
    label,
    categoryId: ingredient.value.categoryId,
  }

  try {
    if (isEditing.value && ingredient.value.id) {
      await updateIngredient.mutateAsync({ ...payload })
    } else {
      await createIngredient.mutateAsync(payload)
    }
    ingredientDialog.value = false
    refetchIngredients.value()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (
      error &&
      error.message &&
      error.message.includes(
        "The provided value for the column is too long for the column's type",
      )
    ) {
      return toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail:
          "L'URL de l'image est trop longue et ne peut pas être enregistrée. Veuillez fournir une URL plus courte.",
        life: 3000,
      })
    } else if (error) {
      return toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: error.message || error,
        life: 3000,
      })
    }
  }
}

const confirmDeleteIngredient = (ingredientToDelete: IngredientInput) => {
  ingredient.value = ingredientToDelete
  deleteIngredientDialog.value = true
}

const deleteCurrentIngredient = async () => {
  await deleteIngredient.mutateAsync(ingredient.value.id)
  deleteIngredientDialog.value = false
  await refetchIngredients.value()
}

const confirmDeleteSelected = () => {
  deleteIngredientsDialog.value = true
}

const deleteSelectedIngredients = async () => {
  const ingredientIds = selectedIngredients.value.map(
    (ingredient) => ingredient.id,
  )
  await deleteManyIngredient.mutateAsync(ingredientIds)
  deleteIngredientsDialog.value = false
  selectedIngredients.value = []
  await refetchIngredients.value()
}
</script>

<style>
.p-multiselect-header {
  display: none !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>

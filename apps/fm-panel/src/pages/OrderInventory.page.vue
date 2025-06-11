<template>
  <div class="card">
    <PrimeTabMenu :model="tabItems" />
    <div class="card">
      <PrimeDataTable :value="commandesFiltrees">
        <PrimeColumn field="orderId" :header="t('order.title.id')" />
        <PrimeColumn field="type" :header="t('order.title.type')">
          <template #body="slotProps">
            <PrimeTag
              :value="getTypeLabel(slotProps.data.type)"
              :severity="getTypeSeverity(slotProps.data.type)"
            />
          </template>
        </PrimeColumn>
        <PrimeColumn field="price" :header="t('order.title.price')">
          <template #body="slotProps"> {{ slotProps.data.price }} € </template>
        </PrimeColumn>
        <PrimeColumn field="createdAt" :header="t('order.title.createdAt')">
          <template #body="slotProps">
            {{ utils.formatHour(slotProps.data.createdAt) }}
          </template>
        </PrimeColumn>
        <PrimeColumn header="Actions">
          <template #body="slotProps">
            <PrimeButton
              icon="pi pi-eye"
              rounded
              text
              class="mr-2"
              @click="showDetails(slotProps.data)"
            />
            <PrimeButton
              v-if="
                slotProps.data.status !== 'DELIVERED' &&
                slotProps.data.status !== 'CANCELED'
              "
              icon="pi pi-arrow-right"
              rounded
              class="ml-2"
              @click="submitOrder(slotProps.data)"
            />
            <PrimeButton
              v-if="
                slotProps.data.status === 'PENDING' ||
                slotProps.data.status === 'IN_PROGRESS'
              "
              icon="pi pi-times"
              severity="danger"
              rounded
              class="ml-2"
              @click="cancelOrder(slotProps.data)"
            />
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
    <PrimeDialog
      v-model:visible="visible"
      maximizable
      modal
      :header="t('order.dialogs.title')"
      :style="{ width: '50rem' }"
    >
      <div v-if="selectedCommande" class="p-4">
        <div class="mb-4 pb-2 border-b border-gray-200">
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('order.dialogs.id') }}</span>
            <span>{{ selectedCommande.orderId }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('order.dialogs.createdAt') }}</span>
            <span>{{ utils.formatHour(selectedCommande.createdAt) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('order.dialogs.price') }}</span>
            <span class="font-bold">{{ selectedCommande.price }} €</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{
              t('order.dialogs.withdrawalMethod')
            }}</span>
            <span>{{ selectedCommande.withdrawalMethod }}</span>
          </div>
          <div
            v-if="selectedCommande.terminalId"
            class="flex justify-between mb-2"
          >
            <span class="font-medium">{{ t('order.dialogs.terminal') }}</span>
            <span>{{ selectedCommande.terminalId }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('order.dialogs.status') }}</span>
            <span>{{ getStatusLabel(selectedCommande.status) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('order.dialogs.type') }}</span>
            <PrimeTag
              :value="getTypeLabel(selectedCommande.type)"
              :severity="getTypeSeverity(selectedCommande.type)"
            />
          </div>
        </div>

        <!-- Products section -->
        <div class="mt-4">
          <h3 class="text-lg font-medium mb-3">
            {{ t('order.dialogs.product') }}
          </h3>
          <div
            v-for="productInOrder in selectedCommande.orderHasProduct"
            :key="productInOrder.id"
            class="mb-4 p-3 bg-gray-50 rounded"
          >
            <div class="font-medium mb-2">{{ productInOrder.product.label }}</div>
            
            <!-- Ingrédients obligatoires -->
            <div
              v-if="productInOrder.mandatory && productInOrder.mandatory.length"
              class="pl-4 mt-2"
            >
              <div class="text-sm font-medium text-gray-700">
                {{ t('order.ingredientTypes.mandatory') }}:
              </div>
              <div
                v-for="ingredient in productInOrder.mandatory"
                :key="ingredient.id"
                class="text-gray-600 pl-2"
              >
                - {{ ingredient.label }}
              </div>
            </div>

            <!-- Base optionnelle -->
            <div
              v-if="productInOrder.optionalBase && productInOrder.optionalBase.length"
              class="pl-4 mt-2"
            >
              <div class="text-sm font-medium text-gray-700">
                {{ t('order.ingredientTypes.optionalBase') }}:
              </div>
              <div
                v-for="ingredient in productInOrder.optionalBase"
                :key="ingredient.id"
                class="text-gray-600 pl-2"
              >
                - {{ ingredient.label }}
              </div>
            </div>

            <!-- Ingrédients supplémentaires -->
            <div
              v-if="productInOrder.extraIngredients && productInOrder.extraIngredients.length"
              class="pl-4 mt-2"
            >
              <div class="text-sm font-medium text-gray-700">
                {{ t('order.ingredientTypes.extra') }}:
              </div>
              <div
                v-for="extra in productInOrder.extraIngredients"
                :key="extra.id"
                class="text-gray-600 pl-2"
              >
                - {{ extra.ingredient.label }} 
                <span v-if="extra.quantity > 1">(x{{ extra.quantity }})</span>
              </div>
            </div>
          </div>
        </div>
        <template v-if="selectedCommande">
          <PrimeButton
            v-if="
              selectedCommande.status !== 'DELIVERED' &&
              selectedCommande.status !== 'CANCELED'
            "
            icon="pi pi-arrow-right"
            rounded
            class="ml-2"
            @click="submitOrder(selectedCommande)"
          />
          <PrimeButton
            v-if="
              selectedCommande.status === 'PENDING' ||
              selectedCommande.status === 'IN_PROGRESS'
            "
            icon="pi pi-times"
            severity="danger"
            rounded
            class="ml-2"
            @click="cancelOrder(selectedCommande)"
          />
        </template>
      </div>
    </PrimeDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFetchOrder, useUpdateOrder } from '../composables/order.composable'
import type { Order } from '../types/inventory.type'
import utils from '@fm-apps/toolkit/utils'

const { t } = useI18n()
const { data, refetch: orderRefetch } = useFetchOrder()
const updateOrder = useUpdateOrder()
const selectedStatus = ref('PENDING')

const visible = ref(false)
const selectedCommande = ref<Order>()

const getStatusLabel = (status: string) => t(`order.status.${status}`) || status
const getTypeLabel = (type: string) => t(`order.types.${type}`) || type

// Rename database values to match the tabs
const statusTabs = [
  { value: 'PENDING' },
  { value: 'IN_PROGRESS' },
  { value: 'DELIVERED' },
  { value: 'CANCELED' },
]

// Get the number of orders by status
const getCountByStatus = (status: string) =>
  data.value?.filter((item: { status: string }) => item.status === status)
    .length ?? 0

// Add command property to each tab
const tabItems = computed(() =>
  statusTabs.map((tab) => ({
    label: `${getStatusLabel(tab.value)} (${getCountByStatus(tab.value)})`,
    command: () => {
      selectedStatus.value = tab.value
    },
  })),
)

// Filter orders by selected status
const commandesFiltrees = computed(
  () =>
    data.value?.filter(
      (item: { status: string }) => item.status === selectedStatus.value,
    ) ?? [],
)

const getTypeSeverity = (type: string) => {
  switch (type) {
    case 'TERMINALS':
      return 'info'
    case 'PICKUP':
      return 'success'
    case 'DELIVERY':
      return 'warning'
    default:
      return null
  }
}

const showDetails = (commande: Order) => {
  selectedCommande.value = commande
  visible.value = true
}

const submitOrder = async (commande: Order) => {
  const index = statusTabs.findIndex((tab) => tab.value === commande.status)
  // We take the next status in the tab
  const nextStatus = statusTabs[index + 1]?.value
  if (nextStatus) {
    const updatedCommande = { ...commande, status: nextStatus } as Order
    try {
      await updateOrder.mutateAsync(updatedCommande)
      await orderRefetch()
      visible.value = false
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

const cancelOrder = async (commande: Order) => {
  const canceledCommande = { ...commande, status: 'CANCELED' } as Order
  try {
    await updateOrder.mutateAsync(canceledCommande)
    await orderRefetch()
    visible.value = false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false
  }
}
</script>

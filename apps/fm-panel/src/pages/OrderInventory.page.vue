<template>
  <div class="card">
    <PrimeTabMenu :model="tabItems" />
    <div class="card">
      <PrimeDataTable :value="commandesFiltrees">
        <PrimeColumn field="id" :header="t('commande.title.id')" />
        <PrimeColumn field="type" :header="t('commande.title.type')">
          <template #body="slotProps">
            <PrimeTag
              :value="getTypeLabel(slotProps.data.type)"
              :severity="getTypeSeverity(slotProps.data.type)"
            />
          </template>
        </PrimeColumn>
        <PrimeColumn field="price" :header="t('commande.title.price')">
          <template #body="slotProps"> {{ slotProps.data.price }} € </template>
        </PrimeColumn>
        <PrimeColumn field="createdAt" :header="t('commande.title.createdAt')">
          <template #body="slotProps">
            {{ formatHour(slotProps.data.createdAt) }}
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
      :header="t('commande.dialogs.title')"
      :style="{ width: '50rem' }"
    >
      <div v-if="selectedCommande" class="p-4">
        <div class="mb-4 pb-2 border-b border-gray-200">
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('commande.dialogs.id') }}</span>
            <span>{{ selectedCommande.id }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{
              t('commande.dialogs.createdAt')
            }}</span>
            <span>{{ formatHour(selectedCommande.createdAt) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('commande.dialogs.price') }}</span>
            <span class="font-bold">{{ selectedCommande.price }} €</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{
              t('commande.dialogs.withdrawalMethod')
            }}</span>
            <span>{{ selectedCommande.withdrawalMethod }}</span>
          </div>
          <div
            v-if="selectedCommande.terminalId"
            class="flex justify-between mb-2"
          >
            <span class="font-medium">{{
              t('commande.dialogs.terminal')
            }}</span>
            <span>{{ selectedCommande.terminalId }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('commande.dialogs.status') }}</span>
            <span>{{ getStatusLabel(selectedCommande.status) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ t('commande.dialogs.type') }}</span>
            <PrimeTag
              :value="getTypeLabel(selectedCommande.type)"
              :severity="getTypeSeverity(selectedCommande.type)"
            />
          </div>
        </div>

        <!-- Products section -->
        <div class="mt-4">
          <h3 class="text-lg font-medium mb-3">Produits:</h3>
          <div
            v-for="product in selectedCommande.products"
            :key="product.id"
            class="mb-4 p-3 bg-gray-50 rounded"
          >
            <div class="font-medium mb-2">{{ product.label }}</div>
            <div
              v-if="product.ingredients && product.ingredients.length"
              class="pl-4"
            >
              <div
                v-for="ingredient in product.ingredients"
                :key="ingredient.id"
                class="text-gray-600"
              >
                - {{ ingredient.ingredient?.label }}
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
import type { OrderDialog } from '../types/order.type'

const { t } = useI18n()
const { data, refetch: orderRefetch } = useFetchOrder()
const updateOrder = useUpdateOrder()
const selectedStatus = ref('PENDING')

const visible = ref(false)
const selectedCommande = ref<OrderDialog>()

const getStatusLabel = (status: string) =>
  t(`commande.status.${status}`) || status
const getTypeLabel = (type: string) => t(`commande.types.${type}`) || type

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

const formatHour = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

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

const showDetails = (commande: OrderDialog) => {
  selectedCommande.value = commande
  visible.value = true
}

const submitOrder = async (commande: OrderDialog) => {
  const index = statusTabs.findIndex((tab) => tab.value === commande.status)
  // We take the next status in the tab
  const nextStatus = statusTabs[index + 1]?.value
  if (nextStatus) {
    const updatedCommande = { ...commande, status: nextStatus } as OrderDialog
    try {
      await updateOrder.mutateAsync(updatedCommande)
      await orderRefetch.value()
      visible.value = false
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

const cancelOrder = async (commande: OrderDialog) => {
  const canceledCommande = { ...commande, status: 'CANCELED' } as OrderDialog
  try {
    await updateOrder.mutateAsync(canceledCommande)
    await orderRefetch.value()
    visible.value = false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false
  }
}
</script>

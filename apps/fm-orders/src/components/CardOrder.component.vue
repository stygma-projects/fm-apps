<template>
  <div class="rounded-md overflow-hidden border border-gray-200 shadow-sm">
    <!-- En-tête avec ID et heure -->
    <div class="p-3 flex justify-between items-center bg-blue-500 text-white">
      <div class="flex items-center">
        <i class="pi pi-file-o mr-2"></i>
        <span class="font-semibold">{{ order.id.slice(-5) }}</span>
      </div>
      <div>{{ formatTime(order.createdAt) }}</div>
    </div>

    <!-- Statut de la commande -->
    <div class="p-2 border-b bg-gray-100 text-gray-800">
      <div class="flex items-center">
        <i class="pi pi-check-circle mr-2"></i>
        <span class="font-medium">{{ getStatusLabel(order.status) }}</span>
      </div>
    </div>

    <!-- Informations de la commande -->
    <div class="bg-white p-4">
      <!-- Affichage uniquement du terminal -->
      <div v-if="order.terminalId" class="mb-3">
        <span>Terminal: </span>
        <span class="font-medium">{{ order.terminalId }}</span>
      </div>

      <!-- Liste des produits avec ingrédients -->
      <div v-if="order.products && order.products.length > 0">
        <div
          v-for="(product, index) in order.products"
          :key="product.id"
          class="mb-3 pb-2 border-b last:border-0"
        >
          <div class="flex justify-between font-medium">
            <div class="flex">
              <span
                class="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center mr-2"
              >
                {{ index + 1 }}
              </span>
              <span>{{ product.label }}</span>
            </div>
            <span>{{ product.priceIncludingTax?.toFixed(2) }} €</span>
          </div>

          <!-- Ingrédients du produit -->
          <div
            v-if="product.ingredients && product.ingredients.length > 0"
            class="ml-8 mt-1"
          >
            <div class="text-sm text-gray-500 mb-1">Ingrédients:</div>
            <ul class="text-sm text-gray-600 list-disc pl-4">
              <li
                v-for="ingredientItem in product.ingredients"
                :key="ingredientItem.id"
              >
                {{ ingredientItem.ingredient?.label }}
                <span
                  v-if="ingredientItem.composition === 'EXTRA'"
                  class="text-blue-600 font-medium"
                >
                  (Extra)</span
                >
                <span v-else class="text-gray-400"> (Optionnel)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Boutons d'action -->
    <!-- <div class="flex">
      <template v-if="order.status === 'PENDING'">
        <button 
          class="w-1/2 p-2 text-center bg-gray-200 hover:bg-gray-300 text-gray-700"
          @click="updateOrderStatus(order.id, 'CANCELED')"
        >
          Annuler
        </button>
        <button 
          class="w-1/2 p-2 text-center bg-blue-500 hover:bg-blue-600 text-white"
          @click="updateOrderStatus(order.id, 'IN_PROGRESS')"
        >
          En cours
        </button>
      </template>
      
      <template v-else-if="order.status === 'IN_PROGRESS'">
        <button 
          class="w-full p-2 text-center bg-blue-500 hover:bg-blue-600 text-white"
          @click="updateOrderStatus(order.id, 'DELIVERED')"
        >
          Préparation terminée
        </button>
      </template>
      
      <template v-else-if="order.status === 'DELIVERED'">
        <button 
          class="w-full p-2 text-center bg-gray-200 text-gray-500 cursor-not-allowed"
          disabled
        >
          Terminé
        </button>
      </template>
      
      <template v-else-if="order.status === 'CANCELED'">
        <button 
          class="w-full p-2 text-center bg-gray-200 text-gray-500 cursor-not-allowed"
          disabled
        >
          Annulé
        </button>
      </template>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { Order } from '../types/order.type'

// Props
const props = defineProps<{
  order: Order
}>()

const { order } = props

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'En attente',
    IN_PROGRESS: 'En préparation',
    DELIVERED: 'Préparation terminée',
    CANCELED: 'Annulé',
  }
  return labels[status] || status
}

function formatTime(dateString: string | Date): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

// Functions
// const updateOrderStatus = (orderId: string, newStatus: string) => {
//   // emit('update-status', { orderId, status: newStatus })
// }
</script>

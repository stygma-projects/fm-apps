<template>
  <div class="p-6 bg-gray-50">
    <Button :text="fr.order.title" @click="handleConfirmCreateOrder" />
  </div>
</template>

<script lang="ts" setup>
import { useCreateOrder } from '~/composables/api/order.composable'
import { useCreateProductInOrder } from '~/composables/api/productInOrder.composable'
import Button from '../../components/ui/button.component.vue'
import { fr } from '../../i18n/locales/fr'

const cartStore = useCartStore()
const { mutate: createOrder } = useCreateOrder()
const { mutate: createProductInOrder } = useCreateProductInOrder()

const handleConfirmCreateOrder = async () => {
  try {
    const orderData = cartStore.getOrderData()
    const createdOrder = await createOrder(orderData)

    const productInOrderData = cartStore.getProductInOrderData(createdOrder.id)

    for (const productData of productInOrderData) {
      await createProductInOrder(productData)
    }

    cartStore.clearCart()
  } catch (error) {
    console.error('Error creating order:', error)
  }
}
</script>

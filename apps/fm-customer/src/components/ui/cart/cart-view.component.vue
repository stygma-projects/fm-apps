<template>
  <div class="h-[100dvh] flex flex-col">
    <PrimeDataView
      :value="cartStore.items"
      :pt="{
        root: {
          class: 'flex-1 flex flex-col min-h-0',
        },
        content: {
          class: 'flex-1 overflow-y-auto min-h-0',
        },
        footer: {
          class: 'sticky bottom-0',
        },
      }"
    >
      <template #list="{ items }">
        <div class="lg:pt-[6vh] lg:px-[26vh] lg:p-12">
          <CartItem
            v-for="(item, index) in items"
            :key="`item-${index}`"
            :item="item"
            :index="index"
            @remove="cartStore.removeItem"
          />
        </div>
      </template>

      <template #footer v-if="cartStore.items.length > 0">
        <CartFooter @confirm-order="handleConfirmCreateOrder" />
      </template>
    </PrimeDataView>
  </div>
</template>

<script lang="ts" setup>
import { useCreateOrder } from '~/composables/api/order.composable'
import {
  useCreateManyProductInOrder,
  useCreateProductInOrder,
} from '~/composables/api/productInOrder.composable'
import CartItem from './cart-item.component.vue'
import CartFooter from './cart-footer.component.vue'

const cartStore = useCartStore()
const { mutate: createOrder } = useCreateOrder()
const { mutate: createProductInOrder } = useCreateProductInOrder()
const { mutate: createManyProductInOrder } = useCreateManyProductInOrder()

const handleConfirmCreateOrder = async () => {
  try {
    const orderData = cartStore.getOrderData()
    const createdOrder = await createOrder(orderData)

    const productInOrderData = cartStore.getProductInOrderData(createdOrder.id)

    const create =
      productInOrderData.length > 1
        ? await createManyProductInOrder(productInOrderData)
        : await createProductInOrder(productInOrderData[0])

    cartStore.clearCart()
    await navigateTo('/')
  } catch (error) {
    console.error('Error creating order:', error)
  }
}
</script>

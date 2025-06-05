<template>
  <div class="h-[100dvh] flex flex-col">
    <PrimeDataView
      :value="cartStore.items"
      layout="grid"
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
      <template #grid="slotProps">
        <div class="lg:pt-[6vh] lg:px-[26vh] lg:p-12">
          <BackLink :text="fr.stepper.back" :applySpecialStyles="true" />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:pb-0 pb-12">
            <div
              v-for="(item, index) in slotProps.items"
              :key="`item-${index}`"
              class="col-span-1"
            >
              <CartItem
                :item="item"
                :index="index"
                @remove="cartStore.removeItem"
              />
            </div>
          </div>
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
import BackLink from '../back-link.component.vue'
import { useRouter } from 'vue-router'
import { fr } from '~/i18n/locales/fr'

const router = useRouter()
const cartStore = useCartStore()
const { mutate: createOrder } = useCreateOrder()
const { mutate: createProductInOrder } = useCreateProductInOrder()
const { mutate: createManyProductInOrder } = useCreateManyProductInOrder()

// redirect to categorie page if he deleted everything in the cart
watch(
  () => cartStore.items.length,
  (actualLength: number) => {
    if (actualLength === 0) {
      router.push('/order/product-categories')
    }
  },
)

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

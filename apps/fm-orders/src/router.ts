import { createRouter, createWebHistory } from 'vue-router'
import MainTemplateLayout from './layouts/MainTemplate.layout.vue'
import TerminalOrdersPage from './pages/TerminalOrders.page.vue'
import DeliveryOrderPage from './pages/DeliveryOrder.page.vue'
import PickUpOrderPage from './pages/PickupOrder.page.vue'

const routes = [
  {
    path: '/',
    component: MainTemplateLayout,
    children: [
      { path: '', redirect: '/orders/terminal' },
      {
        path: 'orders',
        children: [
          { path: '', redirect: '/orders/terminal' },
          {
            path: 'click-and-collect',
            component: PickUpOrderPage,
          },
          {
            path: 'delivery',
            component: DeliveryOrderPage,
          },
          {
            path: 'terminal',
            component: TerminalOrdersPage,
          },
        ],
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

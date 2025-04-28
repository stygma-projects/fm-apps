import { createRouter, createWebHistory } from 'vue-router'
import MainTemplateLayout from './layouts/MainTemplate.layout.vue'
import OrdersListPage from './pages/OrdersList.page.vue'

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
          { path: 'click-and-collect', component: OrdersListPage },
          {
            path: 'delivery',
            component: OrdersListPage,
          },
          {
            path: 'terminal',
            component: OrdersListPage,
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

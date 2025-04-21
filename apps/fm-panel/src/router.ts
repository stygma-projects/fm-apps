import { createRouter, createWebHistory } from 'vue-router'
import InventoryDashboardPage from './pages/InventoryDashboard.page.vue'
import MainTemplateLayout from './layouts/MainTemplate.layout.vue'

const routes = [
  {
    path: '/',
    component: MainTemplateLayout,
    children: [{ path: '/', component: InventoryDashboardPage }],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

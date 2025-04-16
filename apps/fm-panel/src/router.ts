import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from './layouts/Default.layout.vue'
import DashboardPage from './pages/Dashboard.page.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [{ path: '/', component: DashboardPage }],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

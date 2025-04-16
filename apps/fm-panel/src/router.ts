import { createRouter, createWebHistory } from 'vue-router'
import PanelDashboardPage from './pages/PanelDashboard.page.vue'

const routes = [
  {
    path: '/',
    children: [{ path: '/', component: PanelDashboardPage }],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

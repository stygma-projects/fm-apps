import {createRouter, createWebHistory} from 'vue-router'
import InventoryPage from './pages/Inventory.page.vue'
import DashboardPage from './pages/Dashboard.page.vue'

const routes = [
    {path: '/', component: DashboardPage},
    {path: '/inventory', component: InventoryPage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

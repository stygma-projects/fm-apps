import { createRouter, createWebHistory } from 'vue-router'
import MainTemplateLayout from './layouts/MainTemplate.layout.vue'
import ProductCategoriesPage from './pages/product-categories.page.vue'
import IngredientCategoriesPage from './pages/IngredientCategories.page.vue'
import IngredientInventoryPage from './pages/IngredientInventory.page.vue'
import ProductPage from './pages/ProductsInventory.page.vue'
import CommandeInventoryPage from './pages/OrderInventory.page.vue'
import UsersPanelPage from './pages/UsersPanel.page.vue'

const routes = [
  {
    path: '/',
    component: MainTemplateLayout,
    children: [
      { path: '', redirect: '/inventory/product-categories' },
      {
        path: 'inventory',
        children: [
          { path: '', redirect: '/inventory/product-categories' },
          {
            path: 'product-categories',
            component: ProductCategoriesPage,
          },
          {
            path: 'ingredient-categories',
            component: IngredientCategoriesPage,
          },
          {
            path: 'products-inventory',
            component: ProductPage,
          },
          {
            path: 'ingredient',
            component: IngredientInventoryPage,
          },
        ],
      },
      {
        path: 'order',
        children: [
          { path: '', redirect: '/order/list' },
          {
            path: 'list',
            component: CommandeInventoryPage,
          },
        ],
      },
      {
        path: 'user',
        children: [
          { path: '', redirect: '/user/list' },
          {
            path: 'list',
            component: UsersPanelPage,
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

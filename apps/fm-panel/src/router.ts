import { createRouter, createWebHistory } from 'vue-router'
import MainTemplateLayout from './layouts/MainTemplate.layout.vue'
import ProductCategoriesPage from './pages/ProductCategories.page.vue'

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
          { path: 'product-categories', component: ProductCategoriesPage },
        ],
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

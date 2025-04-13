import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from './pages/SignUp.page.vue'

const routes = [
  { path: '/', component: SignUpPage },
  { path: '/sign-up', component: SignUpPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

import { useRouteHistoryStore } from '~/stores/routeHistory.store'

export default defineNuxtRouteMiddleware((to) => {
  const routeHistoryStore = useRouteHistoryStore()
  routeHistoryStore.addRoute(to.path)
})

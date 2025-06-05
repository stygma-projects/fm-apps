import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouteHistoryStore = defineStore('routeHistory', () => {
  const history = ref<string[]>([])

  const addRoute = (route: string) => {
    history.value.push(route)
  }

  return {
    history,
    addRoute,
  }
})

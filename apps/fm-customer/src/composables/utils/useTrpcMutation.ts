export const useTrpcMutation = <T, V = void>(
  key: string,
  mutationFn: (variables: V) => Promise<T>
) => {
  const isTesting = process.client && (window as any).Cypress
  const cacheKey = isTesting ? `${key}-test` : key

  const data = ref<T | null>(null)
  const pending = ref(false)
  const error = ref<unknown>(null)

  const mutate = async (variables: V) => {
    pending.value = true
    error.value = null
    try {
      data.value = await mutationFn(variables)
      return data.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      pending.value = false
    }
  }

  return { data, pending, error, mutate }
}
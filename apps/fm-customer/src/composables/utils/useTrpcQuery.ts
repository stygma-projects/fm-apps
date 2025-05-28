export const useTrpcQuery = <T>(key: string, queryFn: () => Promise<T>) => {
  const isTesting = process.client && (window as any).Cypress

  // Eviter que Nuxt se serve des mauvaises données depuis le cache
  const cacheKey = isTesting ? `${key}-test` : key

  const { data, pending, error, refresh } = useAsyncData<T>(cacheKey, queryFn, {
    server: !isTesting, // désactive le préchargement SSR en test
  })

  return { data, pending, error, refresh }
}

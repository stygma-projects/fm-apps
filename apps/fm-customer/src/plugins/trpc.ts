import type { AppRouter } from '@fm-apps/trpc'
import { httpBatchLink, createTRPCProxyClient } from '@trpc/client'

export default defineNuxtPlugin(() => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/trpc',
      }),
    ],
  })

  return {
    provide: {
      trpc: client,
    },
  }
})
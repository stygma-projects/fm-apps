import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@fm-apps/trpc'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // Vous pouvez ajouter des options supplémentaires ici si nécessaire
      // headers: () => ({ ... }),
    }),
  ],
})

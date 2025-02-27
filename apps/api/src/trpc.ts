import { initTRPC } from '@trpc/server';

// Créer une instance tRPC avec le contexte
const t = initTRPC.create();

// Export des helpers
export const router = t.router;
export const publicProcedure = t.procedure;
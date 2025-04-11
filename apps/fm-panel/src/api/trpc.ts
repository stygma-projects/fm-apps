
import {createTRPCClient, httpLink} from '@trpc/client';
import type {AppRouter} from "@fm-monorepo/trpc";

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpLink({
            url: 'http://localhost:3000/trpc',
        }),
    ],
});


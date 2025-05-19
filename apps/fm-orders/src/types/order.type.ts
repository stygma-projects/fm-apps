import type { GetByIdProductOutput, GetByIdOrderOutput } from '@fm-apps/trpc/'

export type Product = NonNullable<GetByIdProductOutput>
export type Order = NonNullable<GetByIdOrderOutput>

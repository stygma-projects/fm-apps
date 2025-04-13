import cors from 'cors'
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter, createContext } from '@fm-monorepo/trpc'

const app = express()

app.use(cors())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.listen(3000)

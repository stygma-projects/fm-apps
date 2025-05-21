import { router } from '../../trpc'
import { userRouter } from './user.route'

export const apiRouter = router({
  user: userRouter,
})
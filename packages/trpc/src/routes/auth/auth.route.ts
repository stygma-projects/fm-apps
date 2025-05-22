import { router } from '../../trpc'
import { userRouter } from './user.route'

export const authRouter = router({
  user: userRouter,
})
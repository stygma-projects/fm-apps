import { router } from '../../trpc'
import { userRouter } from './user.route'
import { sessionRouter } from './session.route'

export const authRouter = router({
  user: userRouter,
  session: sessionRouter,
})
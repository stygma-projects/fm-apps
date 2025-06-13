import { router } from '../../trpc'
import { scheduleRouter } from './schedule.route'
import { openingHourRouter } from './openingHour.route'

export const administrationRouter = router({
  schedule: scheduleRouter,
  openingHour: openingHourRouter,
})
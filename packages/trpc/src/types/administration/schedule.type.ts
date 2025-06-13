import { RouterInput, RouterOutput } from '../..'

export type ListScheduleInput = 
  RouterInput['administration']['schedule']['list']
export type GetByIdScheduleInput = 
  RouterInput['administration']['schedule']['getById']
export type GetByDayScheduleInput = 
  RouterInput['administration']['schedule']['getByDay']
export type CreateScheduleInput =
  RouterInput['administration']['schedule']['create']
export type UpdateScheduleInput =
  RouterInput['administration']['schedule']['update']
export type DeleteScheduleInput =
  RouterInput['administration']['schedule']['delete']
export type DeleteManySchedulesInput =
  RouterInput['administration']['schedule']['deleteMany']

export type ListScheduleOutput = 
  RouterOutput['administration']['schedule']['list']
export type GetByIdScheduleOutput = 
  RouterOutput['administration']['schedule']['getById']
export type GetByDayScheduleOutput = 
  RouterOutput['administration']['schedule']['getByDay']
export type CreateScheduleOutput =
  RouterOutput['administration']['schedule']['create']
export type UpdateScheduleOutput =
  RouterOutput['administration']['schedule']['update']
export type DeleteScheduleOutput =
  RouterOutput['administration']['schedule']['delete']
export type DeleteManySchedulesOutput =
  RouterOutput['administration']['schedule']['deleteMany']
import { RouterInput, RouterOutput } from '../..'

export type ListOpeningHourInput = 
  RouterInput['administration']['openingHour']['list']
export type GetByIdOpeningHourInput = 
  RouterInput['administration']['openingHour']['getById']

export type ListOpeningHourOutput = 
  RouterOutput['administration']['openingHour']['list']
export type GetByIdOpeningHourOutput = 
  RouterOutput['administration']['openingHour']['getById']
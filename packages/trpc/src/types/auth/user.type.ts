import { RouterInput, RouterOutput } from '../..'

export type ListUsersInput = 
  RouterInput['auth']['user']['list']
export type GetByIdUserInput = 
  RouterInput['auth']['user']['getById']
export type SignUpByMailAndPasswordInput =
  RouterInput['auth']['user']['signUpByMailAndPassword']
export type SignInByMailAndPasswordInput =
  RouterInput['auth']['user']['signInByMailAndPassword']

export type ListUsersOutput = 
  RouterOutput['auth']['user']['list']
export type GetByIdUserOutput = 
  RouterOutput['auth']['user']['getById']
export type SignUpByMailAndPasswordOutput =
  RouterOutput['auth']['user']['signUpByMailAndPassword']
export type signInByMailAndPasswordOutput =
  RouterOutput['auth']['user']['signInByMailAndPassword']

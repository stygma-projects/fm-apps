import { RouterInput, RouterOutput } from '../..'

export type ListUsersInput = 
  RouterInput['auth']['user']['list']
export type GetByIdUserInput = 
  RouterInput['auth']['user']['getById']
export type SignUpByMailAndPasswordInput =
  RouterInput['auth']['user']['signUpByMailAndPassword']
export type SignInByMailAndPasswordInput =
  RouterInput['auth']['user']['signInByMailAndPassword']
export type SignInWithGoogleInput =
  RouterInput['auth']['user']['signInWithGoogle']
export type DeleteUserInput =
  RouterInput['auth']['user']['delete']
export type DeleteManyUsersInput =
  RouterInput['auth']['user']['deleteMany']

export type ListUsersOutput = 
  RouterOutput['auth']['user']['list']
export type GetByIdUserOutput = 
  RouterOutput['auth']['user']['getById']
export type SignUpByMailAndPasswordOutput =
  RouterOutput['auth']['user']['signUpByMailAndPassword']
export type SignInByMailAndPasswordOutput =
  RouterOutput['auth']['user']['signInByMailAndPassword']
export type SignInWithGoogleOutput =
  RouterOutput['auth']['user']['signInWithGoogle']
export type DeleteUserOutput =
  RouterOutput['auth']['user']['delete']
export type DeleteManyUsersOutput =
  RouterOutput['auth']['user']['deleteMany']

import { RouterInput, RouterOutput } from '../..'

export type signUpByMailAndPasswordInput =
  RouterInput['auth']['user']['signUpByMailAndPassword']
export type signInByMailAndPasswordInput =
  RouterInput['auth']['user']['signInByMailAndPassword']

export type signUpByMailAndPasswordOutput =
  RouterOutput['auth']['user']['signUpByMailAndPassword']
export type signInByMailAndPasswordOutput =
  RouterOutput['auth']['user']['signInByMailAndPassword']

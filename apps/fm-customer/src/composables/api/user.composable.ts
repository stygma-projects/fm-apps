import type { 
  SignUpByMailAndPasswordInput, 
  SignInByMailAndPasswordInput,
  SignInWithGoogleInput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'
import { useTrpcMutation } from '../utils/useTrpcMutation'

export const useUser = () => {
  const { $trpc } = useNuxtApp()

  const getById = (id: string) => useTrpcQuery(
    'user',
    () => $trpc.auth.user.getById.query(id)
  )

  const signUpByMailAndPassword = useTrpcMutation(
    'user',
    (input : SignUpByMailAndPasswordInput) => $trpc.auth.user.signUpByMailAndPassword.mutate(input)
  )

  const signInByMailAndPassword = useTrpcMutation(
    'user',
    (input : SignInByMailAndPasswordInput) => $trpc.auth.user.signInByMailAndPassword.mutate(input)
  )

  const signInWithGoogle = useTrpcMutation(
    'user',
    (input : SignInWithGoogleInput) => $trpc.auth.user.signInWithGoogle.mutate(input)
  )


  return {    
    getById,
    signUpByMailAndPassword,
    signInByMailAndPassword,
    signInWithGoogle
  }

}
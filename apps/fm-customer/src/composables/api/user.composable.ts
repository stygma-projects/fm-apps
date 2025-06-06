import type { SignUpByMailAndPasswordInput, SignInByMailAndPasswordInput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'
import { useTrpcMutation } from '../utils/useTrpcMutation'

export const useUser = () => {
  const { $trpc } = useNuxtApp()

  const getById = (id: string) => useTrpcQuery(
    'user',
    () => $trpc.auth.user.getById.query(id)
  )

  const signUpByMailAndPassword = useTrpcMutation(
    (input: signUpByMailAndPasswordInput) => $trpc.auth.user.signUpByMailAndPassword.mutate(input)
  )

  const signInByMailAndPassword = useTrpcMutation(
    (input: signInByMailAndPasswordInput) => $trpc.auth.user.signInByMailAndPassword.mutate(input)
  )

  return {    
    getById,
    signUpByMailAndPassword,
    signInByMailAndPassword
  }
}
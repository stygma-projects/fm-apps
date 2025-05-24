import type { signUpByMailAndPasswordInput, signUpByMailAndPasswordOutput } from '@fm-apps/trpc'
import { useTrpcQuery } from '../utils/useTrpcQuery'
import { useTrpcMutation } from '../utils/useTrpcMutation'

export const useUser = () => {
  const { $trpc } = useNuxtApp()

  const signUpByMailAndPassword = useTrpcMutation(
    'user',
    (input : signUpByMailAndPasswordInput) => $trpc.auth.user.signUpByMailAndPassword.mutate(input)
  )

  return {    
    signUpByMailAndPassword
  }

}
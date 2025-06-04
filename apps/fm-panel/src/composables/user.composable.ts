import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../api/trpc'
import type {
  ListUsersOutput,
  SignUpByMailAndPasswordInput,
  SignUpByMailAndPasswordOutput,
  SignInByMailAndPasswordInput,
  SignInByMailAndPasswordOutput,
} from '@fm-apps/trpc'

enum UserQueryKey {
  LIST = 'listUsers',
}

enum UserMutationKey {
  // UPDATE = 'updateUser',
  SIGN_UP_BY_MAIL_AND_PASSWORD = 'signUpByMailAndPassword',
  SIGN_IN_BY_MAIL_AND_PASSWORD = 'signInByMailAndPassword',
}


export const useFetchUsers = () => {
    return useQuery<ListUsersOutput, Error>({
    queryKey: [UserQueryKey.LIST],
    queryFn: () => trpc.auth.user.list.query(),
  })
}

export const useSignUpWithMailAndPasswordUser = () => {
    return useMutation<
        SignUpByMailAndPasswordOutput,
        Error,
        SignUpByMailAndPasswordInput
      >({
    mutationKey: [UserMutationKey.SIGN_UP_BY_MAIL_AND_PASSWORD],
    mutationFn: (SignUpByMailAndPasswordInput) => trpc.auth.user.signUpByMailAndPassword.mutate(SignUpByMailAndPasswordInput),
  })
}

export const useSignInWithMailAndPasswordUser = () => {
    return useMutation<
        SignInByMailAndPasswordOutput,
        Error,
        SignInByMailAndPasswordInput
      >({
    mutationKey: [UserMutationKey.SIGN_IN_BY_MAIL_AND_PASSWORD],
    mutationFn: (SignInByMailAndPasswordInput) => trpc.auth.user.signInByMailAndPassword.mutate(SignInByMailAndPasswordInput),
  })
}

// export const useUpdateUser = () => {
//   return useMutation<
//     UpdateOrderOutput,
//     Error,
//     UpdateOrderInput
//   >({
//     mutationKey: [OrderMutationKey.UPDATE],
//     mutationFn: (updateOrderInput) =>
//       trpc.order.orders.update.mutate(updateOrderInput),
//   })
// }
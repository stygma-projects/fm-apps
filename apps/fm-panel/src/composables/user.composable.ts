import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../api/trpc'
import type {
  ListUsersOutput,
  SignUpByMailAndPasswordInput,
  SignUpByMailAndPasswordOutput,
  SignInByMailAndPasswordInput,
  SignInByMailAndPasswordOutput,
  DeleteUserInput,
  DeleteUserOutput,
  DeleteManyUsersInput,
  DeleteManyUsersOutput,
} from '@fm-apps/trpc'

enum UserQueryKey {
  LIST = 'listUsers',
}

enum UserMutationKey {
  // UPDATE = 'updateUser',
  SIGN_UP_BY_MAIL_AND_PASSWORD = 'signUpByMailAndPassword',
  SIGN_IN_BY_MAIL_AND_PASSWORD = 'signInByMailAndPassword',
  SIGN_IN_WITH_GOOGLE = 'signInWithGoogle',
  DELETE = 'deleteUser',
  DELETE_MANY = 'deleteManyUsers',
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

export const useDeleteUser = () => {
    return useMutation<
        DeleteUserOutput,
        Error,
        DeleteUserInput
      >({
    mutationKey: [UserMutationKey.DELETE],
    mutationFn: (DeleteUserInput) => trpc.auth.user.delete.mutate(DeleteUserInput),
  })
}

export const useDeleteManyUsers = () => {
    return useMutation<
        DeleteManyUsersOutput,
        Error,
        DeleteManyUsersInput
      >({
    mutationKey: [UserMutationKey.DELETE_MANY],
    mutationFn: (DeleteManyUsersInput) => trpc.auth.user.deleteMany.mutate(DeleteManyUsersInput),
  })
}
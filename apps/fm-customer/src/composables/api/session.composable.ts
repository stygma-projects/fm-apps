import { useTrpcQuery } from '../utils/useTrpcQuery'
// import { useTrpcMutation } from '../utils/useTrpcMutation'

export const useSession = () => {
  const { $trpc } = useNuxtApp()

  const getById = (id: string) => useTrpcQuery(
    'session',
    () => $trpc.auth.session.getById.query(id)
  )

  const getByValues = (token: string, userId: string) => useTrpcQuery(
    'session',
    () => $trpc.auth.session.getByValues.query({ token, userId })
  )

  return {    
    getById,
    getByValues,
  }

}
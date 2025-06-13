import { useQuery } from '@tanstack/vue-query'
import { trpc } from '../api/trpc'
import type {
    ListOpeningHourOutput,
} from '@fm-apps/trpc'

enum OpeningHourQueryKey {
    LIST = 'listOpeningHour',
}

export const useListOpeningHour = () => {
  return useQuery<ListOpeningHourOutput, Error>({
    queryKey: [OpeningHourQueryKey.LIST],
    queryFn: () => trpc.administration.openingHour.list.query(),
  })
}
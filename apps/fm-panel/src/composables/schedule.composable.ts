import { useMutation, useQuery } from '@tanstack/vue-query'
import { trpc } from '../api/trpc'
import type {
    CreateScheduleInput,
    CreateScheduleOutput,
    // GetByIdScheduleOutput,
    // GetByDayScheduleOutput,
    DeleteManySchedulesInput,
    DeleteManySchedulesOutput,
    DeleteScheduleInput,
    DeleteScheduleOutput,
    ListScheduleOutput,
    UpdateScheduleInput,
    UpdateScheduleOutput,
} from '@fm-apps/trpc'

enum ProductQueryKey {
    LIST = 'listSchedules',
    // GET_BY_ID = 'getScheduleById',
    // GET_BY_DAY = 'getScheduleByDay',
}

enum ProductMutationKey {
    UPDATE = 'updateSchedule',
    DELETE = 'deleteSchedule',
    CREATE = 'createSchedule',
    DELETE_MANY = 'deleteManySchedules',
}

export const useListSchedule = () => {
  return useQuery<ListScheduleOutput, Error>({
    queryKey: [ProductQueryKey.LIST],
    queryFn: () => trpc.administration.schedule.list.query(),
  })
}

// export const useGetByIdSchedule = () => {
//   return useQuery<GetByIdScheduleOutput, Error>({
//     queryKey: [ProductQueryKey.GET_BY_ID],
//     queryFn: () => trpc.administration.schedule.getById.query(),
//   })
// }

// export const useGetByDaySchedule = () => {
//   return useQuery<GetByDayScheduleOutput, Error>({
//     queryKey: [ProductQueryKey.GET_BY_DAY],
//     queryFn: () => trpc.administration.schedule.getByDay.query(),
//   })
// }

export const useUpdateSchedule = () => {
  return useMutation<
    UpdateScheduleOutput,
    Error,
    UpdateScheduleInput
  >({
    mutationKey: [ProductMutationKey.UPDATE],
    mutationFn: (updateScheduleInput) =>
      trpc.administration.schedule.update.mutate(updateScheduleInput),
  })
}

export const useDeleteSchedule = () => {
  return useMutation<
    DeleteScheduleOutput,
    Error,
    DeleteScheduleInput
  >({
    mutationKey: [ProductMutationKey.DELETE],
    mutationFn: (deleteScheduleInput) =>
      trpc.administration.schedule.delete.mutate(deleteScheduleInput),
  })
}

export const useCreateSchedule = () => {
  return useMutation<
    CreateScheduleOutput,
    Error,
    CreateScheduleInput
  >({
    mutationKey: [ProductMutationKey.CREATE],
    mutationFn: (createScheduleInput) =>
      trpc.administration.schedule.create.mutate(createScheduleInput)
  })
}

export const useDeleteManySchedules = () => {
  return useMutation<
    DeleteManySchedulesOutput,
    Error,
    DeleteManySchedulesInput
  >({
    mutationKey: [ProductMutationKey.DELETE_MANY],
    mutationFn: (deleteManySchedulesInput) =>
      trpc.administration.schedule.deleteMany.mutate(
        deleteManySchedulesInput,
      ),
  })
}
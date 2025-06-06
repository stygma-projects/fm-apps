import { ref } from 'vue'
import type { MutationOptions } from '~/types/mutation.type'

export const useTrpcMutation = <TInput, TOutput>(
  mutationFn: (input: TInput) => Promise<TOutput>,
  options?: MutationOptions<TOutput>,
) => {
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<TOutput | null>(null)

  const mutate = async (input: TInput) => {
    try {
      isLoading.value = true
      error.value = null

      const result = await mutationFn(input)
      data.value = result

      options?.onSuccess?.(result)
      return result
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error')
      error.value = errorObj
      options?.onError?.(errorObj)
      throw errorObj
    } finally {
      isLoading.value = false
      options?.onSettled?.()
    }
  }

  return {
    mutate,
    isLoading: readonly(isLoading),
    error: readonly(error),
    data: readonly(data),
  }
}

export const useTrpcQuery = <T>(
    key: string,
    queryFn: () => Promise<T>
  ) => {
    const { data, pending, error, refresh } = useAsyncData<T>(
      key,
      queryFn
    )
  
    return { data, pending, error, refresh }
  }
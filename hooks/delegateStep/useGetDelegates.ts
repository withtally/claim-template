import { useQuery } from '@tanstack/react-query'
import { Delegate } from '~/types/delegate'

const delegatesFetchFunction = async () => {
  return fetch(process.env.NEXT_PUBLIC_DELEGATES_FETCH_URL).then((res) => res.json())
}

export const useGetDelegates = () => {
  const {
    data: delegates,
    isPending,
    error,
    isFetched,
    isLoading,
    isError,
  } = useQuery<Delegate[]>({
    queryKey: ['delegates'],
    queryFn: () => delegatesFetchFunction(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  })

  return { isPending, error, delegates, isFetched, isLoading, isError }
}

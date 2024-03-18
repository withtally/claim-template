import { useQuery } from '@tanstack/react-query';
import { Delegate } from '~/types/delegate';

export const useGetDelegates = () => {
  const { isPending, error, data: delegates, isFetched, isLoading, isError } = useQuery<Delegate[]>({
    queryKey: ['delegates'],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_FETCH_URL)
        .then((res) =>
          res.json(),
        ),
  })

  return { isPending, error, delegates, isFetched, isLoading, isError };
}
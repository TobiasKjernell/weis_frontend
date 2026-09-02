import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reserveMerch } from '../lib/fetchers'

export function useReserveMerch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: reserveMerch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merch-items'] })
    },
  })
}

import { useQuery } from '@tanstack/react-query'
import { fetchTourDates } from '../lib/fetchers'

export function useTourDates() {
  return useQuery({
    queryKey: ['tour-dates'],
    queryFn: fetchTourDates,
  })
}

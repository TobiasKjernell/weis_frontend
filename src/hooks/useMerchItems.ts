import { useQuery } from '@tanstack/react-query'
import { fetchMerchItems } from '../lib/fetchers'

export function useMerchItems() {
  return useQuery({
    queryKey: ['merch-items'],
    queryFn: fetchMerchItems,
  })
}

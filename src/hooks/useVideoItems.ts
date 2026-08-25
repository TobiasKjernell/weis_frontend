import { useQuery } from '@tanstack/react-query'
import { fetchVideoItems } from '../lib/fetchers'

export function useVideoItems() {
  return useQuery({
    queryKey: ['video-items'],
    queryFn: fetchVideoItems,
  })
}

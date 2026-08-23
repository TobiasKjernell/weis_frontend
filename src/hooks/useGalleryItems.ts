import { useQuery } from '@tanstack/react-query'
import { fetchGalleryItems } from '../lib/fetchers'

export function useGalleryItems() {
  return useQuery({
    queryKey: ['gallery-items'],
    queryFn: fetchGalleryItems,
  })
}

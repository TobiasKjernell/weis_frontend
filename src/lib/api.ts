// Requests go through our own origin — the Vite dev server (see vite.config.ts)
// and nginx (see nginx.conf) both proxy /api to the real backend, since the
// backend itself doesn't send CORS headers for direct browser fetches.
const API_BASE_URL = ''
const ARTIST_SLUG = 'moroii'

interface YoutubeVideoApiResponse {
  id: number
  video: string
  title: string | null
  position: number
}

interface TourDateApiResponse {
  id: number
  date: string
  location: string
  venue: string
  tickets_state: boolean
  tickets_url: string
}

interface GalleryImageApiResponse {
  id: number
  url: string
  position: number
}

type MerchSizeApi = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

interface MerchVariantApiResponse {
  id: number
  size: MerchSizeApi | null
  stock: number
}

interface MerchItemApiResponse {
  id: number
  name: string
  description: string | null
  price_cents: number
  type: 'clothing' | 'misc'
  image_url: string | null
  position: number
  variants: MerchVariantApiResponse[]
}

export interface MerchReservationRequest {
  merch_variant_id: number
  contact_email?: string
  contact_instagram?: string
  quantity: number
}

interface MerchReservationApiResponse {
  id: number
  merch_variant_id: number
  user_id: number
  contact_email: string | null
  contact_instagram: string | null
  quantity: number
  status: string
  created_at: string
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, init)
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchArtistYoutubeVideos() {
  return fetchJson<YoutubeVideoApiResponse[]>(`/api/artists/${ARTIST_SLUG}/youtube`)
}

export function fetchArtistTourDates() {
  return fetchJson<TourDateApiResponse[]>(`/api/artists/${ARTIST_SLUG}/tour-dates`)
}

export function fetchArtistGalleryImages() {
  return fetchJson<GalleryImageApiResponse[]>(`/api/artists/${ARTIST_SLUG}/images`)
}

export function fetchArtistMerch() {
  return fetchJson<MerchItemApiResponse[]>(`/api/artists/${ARTIST_SLUG}/merch`)
}

export function reserveArtistMerchItem(itemId: number, payload: MerchReservationRequest) {
  return fetchJson<MerchReservationApiResponse>(`/api/artists/${ARTIST_SLUG}/merch/${itemId}/reserve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

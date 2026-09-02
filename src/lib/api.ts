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

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`)
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

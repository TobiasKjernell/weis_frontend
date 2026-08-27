import { z } from 'zod'
import { mockGalleryItems, mockMerchItems } from './mockData'
import { galleryItemListSchema } from '../schemas/galleryItem'
import { merchItemListSchema } from '../schemas/merchItem'
import { tourDateListSchema } from '../schemas/tourDate'
import { videoItemListSchema } from '../schemas/videoItem'
import { getSimulatedDelay, shouldSimulateEmpty, shouldSimulateError } from './config'
import { fetchArtistTourDates, fetchArtistYoutubeVideos } from './api'

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Parses `data` through `schema`, mapping a Zod failure onto the same
 * `Error` shape a failed `fetch` would produce, so callers (React Query
 * hooks) don't need to special-case validation errors vs network errors.
 */
function validate<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Error(`Data validation failed: ${result.error.issues[0]?.message ?? 'unknown error'}`)
  }
  return result.data
}

// Tour dates and YouTube videos come from the artist platform API — see lib/api.ts.
// Gallery and merch stay mock-backed; mockTourDates/mockVideoItems in mockData.ts
// are kept for reference/dev use even though these fetchers no longer read them.

export async function fetchTourDates() {
  const data = await fetchArtistTourDates()
  const mapped = data
    .map((item) => ({
      id: String(item.id),
      date: item.date,
      location: item.location,
      venue: item.venue,
      ticketUrl: item.tickets_url,
      soldOut: !item.tickets_state,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return validate(tourDateListSchema, mapped)
}

export async function fetchGalleryItems() {
  await wait(getSimulatedDelay())
  if (shouldSimulateError('gallery')) throw new Error('Unable to load gallery images.')
  const data = shouldSimulateEmpty('gallery') ? [] : mockGalleryItems
  return validate(galleryItemListSchema, data)
}

export async function fetchMerchItems() {
  await wait(getSimulatedDelay())
  if (shouldSimulateError('merch')) throw new Error('Unable to load merch inventory.')
  const data = shouldSimulateEmpty('merch') ? [] : mockMerchItems
  return validate(merchItemListSchema, data)
}

export async function fetchVideoItems() {
  const data = await fetchArtistYoutubeVideos()
  const mapped = [...data]
    .sort((a, b) => a.position - b.position)
    .map((item) => ({
      id: String(item.id),
      youtubeId: item.video,
      title: item.title ?? 'Untitled',
    }))
  return validate(videoItemListSchema, mapped)
}

import { z } from 'zod'
import { galleryItemListSchema } from '../schemas/galleryItem'
import { merchItemListSchema } from '../schemas/merchItem'
import { tourDateListSchema } from '../schemas/tourDate'
import { videoItemListSchema } from '../schemas/videoItem'
import {
  fetchArtistGalleryImages,
  fetchArtistMerch,
  fetchArtistTourDates,
  fetchArtistYoutubeVideos,
  reserveArtistMerchItem,
} from './api'

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

// Tour dates, YouTube videos, gallery images, and merch all come from the
// artist platform API — see lib/api.ts. mockTourDates/mockVideoItems/
// mockGalleryItems/mockMerchItems in mockData.ts are kept for reference/dev
// use even though these fetchers no longer read them.

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
  const data = await fetchArtistGalleryImages()
  const mapped = [...data]
    .sort((a, b) => a.position - b.position)
    .map((item) => ({
      id: String(item.id),
      src: item.url,
      alt: `Moroii live photo ${item.position + 1}`,
    }))
  return validate(galleryItemListSchema, mapped)
}

export async function fetchMerchItems() {
  const data = await fetchArtistMerch()
  const mapped = [...data]
    .sort((a, b) => a.position - b.position)
    .map((item) => ({
      id: String(item.id),
      name: item.name,
      description: item.description,
      price: item.price_cents / 100,
      currency: 'USD',
      type: item.type,
      imageUrl: item.image_url,
      variants: item.variants.map((variant) => ({
        id: String(variant.id),
        size: variant.size,
        stock: variant.stock,
      })),
    }))
  return validate(merchItemListSchema, mapped)
}

export interface ReserveMerchInput {
  itemId: string
  variantId: string
  contactEmail?: string
  contactInstagram?: string
  quantity: number
}

export function reserveMerch({ itemId, variantId, contactEmail, contactInstagram, quantity }: ReserveMerchInput) {
  return reserveArtistMerchItem(Number(itemId), {
    merch_variant_id: Number(variantId),
    contact_email: contactEmail || undefined,
    contact_instagram: contactInstagram || undefined,
    quantity,
  })
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

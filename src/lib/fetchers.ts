import { z } from 'zod'
import { mockGalleryItems, mockMerchItems, mockTourDates, mockVideoItems } from './mockData'
import { galleryItemListSchema } from '../schemas/galleryItem'
import { merchItemListSchema } from '../schemas/merchItem'
import { tourDateListSchema } from '../schemas/tourDate'
import { videoItemListSchema } from '../schemas/videoItem'
import { getSimulatedDelay, shouldSimulateEmpty, shouldSimulateError } from './config'

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

// Swap the body of each of these for a real `fetch(...)` call later —
// the validate() + simulated-latency/error scaffolding can stay as-is.

export async function fetchTourDates() {
  await wait(getSimulatedDelay())
  if (shouldSimulateError('tour')) throw new Error('Unable to reach the tour dates service.')
  const data = shouldSimulateEmpty('tour') ? [] : mockTourDates
  return validate(tourDateListSchema, data)
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
  await wait(getSimulatedDelay())
  if (shouldSimulateError('videos')) throw new Error('Unable to load videos.')
  const data = shouldSimulateEmpty('videos') ? [] : mockVideoItems
  return validate(videoItemListSchema, data)
}

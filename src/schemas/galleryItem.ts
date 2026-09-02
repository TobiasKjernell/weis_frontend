import { z } from 'zod'

export const galleryItemSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
})

export const galleryItemListSchema = z.array(galleryItemSchema)

export type GalleryItem = z.infer<typeof galleryItemSchema>

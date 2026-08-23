import { z } from 'zod'

export const galleryItemSchema = z.object({
  id: z.string(),
  src: z.string(),
  thumbSrc: z.string(),
  alt: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
})

export const galleryItemListSchema = z.array(galleryItemSchema)

export type GalleryItem = z.infer<typeof galleryItemSchema>

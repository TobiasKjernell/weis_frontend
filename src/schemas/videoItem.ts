import { z } from 'zod'

export const videoItemSchema = z.object({
  id: z.string(),
  youtubeId: z.string(),
  title: z.string(),
})

export const videoItemListSchema = z.array(videoItemSchema)

export type VideoItem = z.infer<typeof videoItemSchema>

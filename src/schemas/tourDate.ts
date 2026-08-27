import { z } from 'zod'

export const tourDateSchema = z.object({
  id: z.string(),
  date: z.string(),
  location: z.string(),
  venue: z.string(),
  ticketUrl: z.url(),
  soldOut: z.boolean().default(false),
})

export const tourDateListSchema = z.array(tourDateSchema)

export type TourDate = z.infer<typeof tourDateSchema>

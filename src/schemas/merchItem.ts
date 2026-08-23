import { z } from 'zod'

export const merchItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  currency: z.string().default('USD'),
  tag: z.enum(['new', 'preorder', 'sold-out']).optional(),
  available: z.boolean().default(true),
  placeholder: z.boolean().default(true),
})

export const merchItemListSchema = z.array(merchItemSchema)

export type MerchItem = z.infer<typeof merchItemSchema>

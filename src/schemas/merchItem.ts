import { z } from 'zod'

export const merchSizeSchema = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL'])

export const merchVariantSchema = z.object({
  id: z.string(),
  size: merchSizeSchema.nullable(),
  stock: z.number().int().nonnegative(),
})

export const merchItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().nonnegative(),
  currency: z.string().default('USD'),
  type: z.enum(['clothing', 'misc']),
  imageUrl: z.string().nullable(),
  variants: z.array(merchVariantSchema),
})

export const merchItemListSchema = z.array(merchItemSchema)

export type MerchSize = z.infer<typeof merchSizeSchema>
export type MerchVariant = z.infer<typeof merchVariantSchema>
export type MerchItem = z.infer<typeof merchItemSchema>

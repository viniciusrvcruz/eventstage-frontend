import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_WEB_ADDRESS: z.string(),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_WEB_ADDRESS: process.env.NEXT_PUBLIC_WEB_ADDRESS,
})

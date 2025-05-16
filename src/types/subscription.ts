import { z } from 'zod'

export const subscriptionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(256),
  email: z.string().email().max(256),
  eventId: z.string().uuid(),
  createdAt: z.date(),
})

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>

const subscriptionRankingSchema = z.object({
  ranking: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      score: z.number(),
    })
  ),
})

export type SubscriptionRankingSchema = z.infer<
  typeof subscriptionRankingSchema
>

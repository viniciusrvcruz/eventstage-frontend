import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'required'),
  subtitle: z.string().min(2, 'min_chars'),
  description: z.string().min(2, 'min_chars'),
  date: z
    .string({ required_error: 'required' })
    .min(1, 'required')
    .refine(
      (val) => {
        return !Number.isNaN(new Date(val).getTime())
      },
      { message: 'invalid_date' }
    ),
  url: z
    .string()
    .min(1, 'required')
    .url('invalid_url')
    .max(2048, { message: 'max_url' }),
  is_live: z.boolean(),
  createdBy: z.string(),
  createdAt: z.date(),
})

export type EventSchema = z.infer<typeof eventSchema>

export const eventPayloadSchema = eventSchema
  .omit({
    createdBy: true,
    createdAt: true,
  })
  .extend({
    id: eventSchema.shape.id.optional(),
  })

export type EventPayloadSchema = z.infer<typeof eventPayloadSchema>

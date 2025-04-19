import { z } from 'zod'

export const EventSchema = z.object({
  id: z.string().optional(),
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
})

export type EventSchema = z.infer<typeof EventSchema>

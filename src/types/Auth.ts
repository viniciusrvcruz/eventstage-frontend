import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('invalid_email'),
  password: z.string().min(6, 'min_password_length'),
})

export type ILoginPayload = z.infer<typeof LoginSchema>

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, 'min_name_length'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'password_mismatch',
  path: ['confirmPassword'],
})

export type IRegisterPayload = z.infer<typeof RegisterSchema>

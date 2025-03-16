import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type ILoginPayload = z.infer<typeof LoginSchema>

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

export type IRegisterPayload = z.infer<typeof RegisterSchema>

'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { AuthService } from '@/services/auth-service'
import { type ILoginPayload, LoginSchema } from '@/types/Auth'
import { alertToast } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { ArrowRight, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const router = useRouter()
  const authService = new AuthService()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(payload: ILoginPayload) {
    authService
      .login(payload)
      .then(({ data }) => {
        Cookies.set('token', data.token)
        router.push('/home')
      })
      .catch(() => alertToast('As credenciais são inválidas', 'error'))
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-heading mb-14">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-700 border border-gray-600 rounded-2xl p-4 space-y-2 sm:p-6 sm:w-[440px]"
      >
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <InputRoot error={!!errors.email}>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register('email')}
            />
          </InputRoot>
          {errors.email && (
            <p className="text-danger text-xs font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Senha</label>
          <InputRoot error={!!errors.password}>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField
              id="password"
              type="password"
              placeholder="******"
              {...register('password')}
            />
          </InputRoot>
          {errors.password && (
            <p className="text-danger text-xs font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="mt-5">
          Entrar
          <ArrowRight />
        </Button>
        <p className="text-sm mt-5">
          Ainda não possui conta?
          <Link href="/register" className="ms-1 text-blue hover:underline">
            Crie sua conta
          </Link>
        </p>
      </form>
    </div>
  )
}

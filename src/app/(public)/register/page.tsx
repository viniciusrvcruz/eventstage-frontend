'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { AuthService } from '@/services/auth-service'
import { type IRegisterPayload, RegisterSchema } from '@/types/Auth'
import { alertToast } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function RegisterPage() {
  const router = useRouter()
  const authService = new AuthService()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPayload>({
    resolver: zodResolver(RegisterSchema),
  })

  async function onSubmit(payload: IRegisterPayload) {
    authService
      .register(payload)
      .then(async () => {
        router.push('/login')
      })
      .catch(() => alertToast('Erro ao criar conta', 'error'))
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-heading mb-14">Criar conta</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-700 border border-gray-600 rounded-2xl p-4 space-y-2 sm:p-6 sm:w-[440px]"
      >
        <div className="space-y-2">
          <label htmlFor="name">Nome</label>
          <InputRoot error={!!errors.name}>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField
              id="name"
              type="text"
              placeholder="Seu nome"
              {...register('name')}
            />
          </InputRoot>
          {errors.name && (
            <p className="text-danger text-xs font-semibold">
              {errors.name.message}
            </p>
          )}
        </div>

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

        <div className="space-y-2">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <InputRoot error={!!errors.confirmPassword}>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField
              id="confirmPassword"
              type="password"
              placeholder="******"
              {...register('confirmPassword')}
            />
          </InputRoot>
          {errors.confirmPassword && (
            <p className="text-danger text-xs font-semibold">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="mt-5">
          Criar conta
          <ArrowRight />
        </Button>
        <p className="text-sm mt-5">
          Já possui uma conta?
          <Link href="/login" className="ms-1 text-blue hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  )
}

'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { login } from '@/services/auth-service'
import { type ILoginPayload, LoginSchema } from '@/types/auth'
import { alertToast } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { ArrowRight, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const router = useRouter()
  const t = useTranslations('public.authentication')
  const tValidations = useTranslations('validations')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(payload: ILoginPayload) {
    login(payload)
      .then(({ token }) => {
        Cookies.set('token', token)
        router.push('/home')
      })
      .catch(() => alertToast(tValidations('invalid_credentials'), 'error'))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-700 border border-gray-600 rounded-2xl p-4 space-y-2 sm:p-6 sm:w-[440px]"
    >
      <div className="space-y-2">
        <label htmlFor="email">{t('email_label')}</label>
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
            {tValidations(errors.email.message as string)}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password">{t('password_label')}</label>
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
            {tValidations(errors.password.message as string)}
          </p>
        )}
      </div>
      <Button type="submit" className="mt-5">
        {t('enter_button')}
        <ArrowRight />
      </Button>
      <p className="text-sm mt-5">
        {t('no_account')}
        <Link href="/register" className="ms-1 text-blue hover:underline">
          {t('create_account')}
        </Link>
      </p>
    </form>
  )
}

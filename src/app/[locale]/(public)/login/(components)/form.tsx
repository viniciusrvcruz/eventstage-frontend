'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { login, setCookie } from '@/services/auth-service'
import type { ILoginPayload } from '@/types/auth'
import { LoginSchema } from '@/types/auth'
import { alertToast } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const t = useTranslations('public.authentication')
  const tValidations = useTranslations('validations')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(LoginSchema),
  })

  const [pendingRequest, setPendingRequest] = useState(false)

  async function onSubmit(payload: ILoginPayload) {
    setPendingRequest(true)
    let success = true

    login(payload)
      .then(async ({ token }) => {
        await setCookie(token)
      })
      .catch(() => {
        success = false
        alertToast(tValidations('invalid_credentials'), 'error')
      })
      .finally(() => {
        setPendingRequest(false)
        if (success) redirect('/events')
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-700 border border-gray-600 rounded-2xl p-4 space-y-2 w-full sm:p-6 sm:w-[440px]"
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
      <Button type="submit" className="mt-5" disabled={pendingRequest}>
        {pendingRequest ? (
          <div className="group flex items-center justify-center w-full">
            <div className="animate-spin h-8 w-8 border-t-4 border-b-4 rounded-full border-gray-400 group-hover:border-gray-900" />
          </div>
        ) : (
          <>
            {t('enter_button')}
            <ArrowRight />
          </>
        )}
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

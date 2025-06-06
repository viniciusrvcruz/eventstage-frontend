'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { register as registerUser } from '@/services/auth-service'
import type { IRegisterPayload } from '@/types/auth'
import { RegisterSchema } from '@/types/auth'
import { alertToast } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function RegisterForm() {
  const t = useTranslations('public.authentication')
  const tValidations = useTranslations('validations')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPayload>({
    resolver: zodResolver(RegisterSchema),
  })

  const [pendingRequest, setPendingRequest] = useState(false)

  async function onSubmit(payload: IRegisterPayload) {
    setPendingRequest(true)

    let success = true

    registerUser(payload)
      .catch((e) => {
        success = false

        if (e?.message === 'user_already_exists_with_this_email') {
          alertToast(
            tValidations('user_already_exists_with_this_email'),
            'warning'
          )
        } else {
          alertToast(tValidations('register_error'), 'error')
        }
      })
      .finally(() => {
        setPendingRequest(false)
        if (success) redirect('/login')
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-700 border border-gray-600 rounded-2xl p-4 space-y-2 mb-10 w-full sm:p-6 sm:w-[440px]"
    >
      <div className="space-y-2">
        <label htmlFor="name">{t('name_label')}</label>
        <InputRoot error={!!errors.name}>
          <InputIcon>
            <User />
          </InputIcon>
          <InputField
            id="name"
            type="text"
            placeholder={t('name_placeholder')}
            {...register('name')}
          />
        </InputRoot>
        {errors.name && (
          <p className="text-danger text-xs font-semibold">
            {tValidations(errors.name.message as string)}
          </p>
        )}
      </div>

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

      <div className="space-y-2">
        <label htmlFor="confirmPassword">{t('confirm_password_label')}</label>
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
            {tValidations(errors.confirmPassword.message as string)}
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
            {t('register_button')}
            <ArrowRight />
          </>
        )}
      </Button>
      <p className="text-sm mt-5">
        {t('already_have_account')}
        <Link href="/login" className="ms-1 text-blue hover:underline">
          {t('login')}
        </Link>
      </p>
    </form>
  )
}

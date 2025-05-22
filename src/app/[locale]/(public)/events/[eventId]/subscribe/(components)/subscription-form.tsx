'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { createSubscriptionToEvent } from '@/services/event-subscription-service'
import type { UserSchema } from '@/types/user'
import { alertToast, removeTokenFromCookies } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const subscriptionSchema = z.object({
  name: z.string().min(2, 'enter_full_name'),
  email: z.string().email('enter_valid_email'),
})

type SubscriptionSchema = z.infer<typeof subscriptionSchema>

interface SubscriptionFormProps {
  user: UserSchema | null
  eventId: string
}

export function SubscriptionForm({ user, eventId }: SubscriptionFormProps) {
  const t = useTranslations('public.events')
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionSchema>({
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
        }
      : undefined,
    resolver: zodResolver(subscriptionSchema),
  })

  async function onSubscribe({ name, email }: SubscriptionSchema) {
    const referrer = searchParams.get('referrer')

    const subscription = user
      ? { name: user.name, email: user.email, referrer }
      : { name, email, referrer }

    await createSubscriptionToEvent(subscription, eventId)
      .then(() => {
        if (user) {
          alertToast(t('subscription_success'), 'success')
          router.replace(`/events/${eventId}/details`)

          return
        }

        alertToast(t('subscritption_success_login'), 'success')

        removeTokenFromCookies()
        router.replace('/login')
      })
      .catch(() => alertToast(t('create_subscription_error'), 'error'))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubscribe)}
      className="bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]"
    >
      <h2 className="font-heading font-semibold text-gray-200 text-xl">
        {t('registration')}
      </h2>

      {!user && (
        <div className="space-y-3">
          <div className="space-y-2">
            <InputRoot error={!!errors.name}>
              <InputIcon>
                <User />
              </InputIcon>
              <InputField
                type="text"
                placeholder={t('full_name')}
                {...register('name')}
              />
            </InputRoot>

            {errors.name && (
              <p className="text-danger text-xs font-semibold">
                {t(errors.name.message as string)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <InputRoot error={!!errors.email}>
              <InputIcon>
                <Mail />
              </InputIcon>
              <InputField
                type="email"
                placeholder={t('email')}
                {...register('email')}
              />
            </InputRoot>

            {errors.email && (
              <p className="text-danger text-xs font-semibold">
                {t(errors.email.message as string)}
              </p>
            )}
          </div>
        </div>
      )}

      <Button type="submit">
        {t('subscribe_btn')}
        <ArrowRight />
      </Button>
    </form>
  )
}

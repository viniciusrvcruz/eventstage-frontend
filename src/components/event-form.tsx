'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import {
  TextareaField,
  TextareaIcon,
  TextareaRoot,
} from '@/components/textarea'
import { createEvent, updateEvent } from '@/services/event-service'
import { eventPayloadSchema } from '@/types/event'
import type { EventPayloadSchema } from '@/types/event'
import { alertToast } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Calendar,
  Check,
  LetterText,
  Link as LinkIcon,
  Text,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface EventFormProps {
  event?: EventPayloadSchema
}

export function EventForm({ event }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('private.events')
  const tValidations = useTranslations('validations')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventPayloadSchema>({
    defaultValues: event
      ? {
          ...event,
          date: new Date(event.date).toISOString().slice(0, 16),
        }
      : undefined,
    resolver: zodResolver(eventPayloadSchema),
  })

  function onSubmit(data: EventPayloadSchema) {
    setIsSubmitting(true)

    if (event?.id) {
      updateEvent(data, event.id)
        .then(() => {
          alertToast(t('update_event_success'), 'success')
          router.push('/events')
        })
        .catch(() => alertToast(t('update_event_fail'), 'error'))
    } else {
      createEvent(data)
        .then(() => {
          alertToast(t('create_event_success'), 'success')
          router.push('/events')
        })
        .catch(() => alertToast(t('create_event_fail'), 'error'))
    }

    setIsSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-700 border border-gray-600 rounded-2xl p-4 mb-20 space-y-2 w-full sm:p-6 sm:w-[440px]"
    >
      <div>
        <label htmlFor="form_title">{t('form_title')}</label>
        <InputRoot error={!!errors.title}>
          <InputIcon>
            <LetterText />
          </InputIcon>
          <InputField
            id="form_title"
            placeholder={t('form_title')}
            maxLength={256}
            {...register('title')}
          />
        </InputRoot>
        {errors.title && (
          <p className="text-danger text-xs font-semibold mt-1">
            {tValidations(errors.title.message as string)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="form_subtitle">{t('form_subtitle')}</label>
        <InputRoot error={!!errors.subtitle}>
          <InputIcon>
            <Text />
          </InputIcon>
          <InputField
            id="form_subtitle"
            placeholder={t('form_subtitle')}
            maxLength={256}
            {...register('subtitle')}
          />
        </InputRoot>
        {errors.subtitle && (
          <p className="text-danger text-xs font-semibold mt-1">
            {tValidations(errors.subtitle.message as string)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="form_description">{t('form_description')}</label>
        <TextareaRoot error={!!errors.description}>
          <TextareaIcon>
            <Text />
          </TextareaIcon>
          <TextareaField
            id="form_description"
            placeholder={t('form_description')}
            maxLength={500}
            {...register('description')}
          />
        </TextareaRoot>
        {errors.description && (
          <p className="text-danger text-xs font-semibold mt-1">
            {tValidations(errors.description.message as string)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="form_date">{t('form_date')}</label>
        <InputRoot error={!!errors.date}>
          <InputIcon>
            <Calendar />
          </InputIcon>
          <InputField
            id="form_date"
            type="datetime-local"
            placeholder={t('form_date')}
            {...register('date')}
          />
        </InputRoot>
        {errors.date && (
          <p className="text-danger text-xs font-semibold mt-1">
            {tValidations(errors.date.message as string)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="form_date">{t('form_link_placeholder')}</label>
        <InputRoot error={!!errors.url}>
          <InputIcon>
            <LinkIcon />
          </InputIcon>
          <InputField
            type="url"
            placeholder={t('form_link')}
            {...register('url')}
          />
        </InputRoot>
        {errors.url && (
          <p className="text-danger text-xs font-semibold mt-1">
            {tValidations(errors.url.message as string)}
          </p>
        )}
      </div>

      <div className="my-5">
        <label className="flex items-center gap-2 cursor-pointer select-none font-sans text-sm text-gray-300 group">
          <input type="checkbox" className="hidden" {...register('is_live')} />

          <div className="w-5 h-5 rounded-md border-2 border-gray-400 group-has-[input:checked]:border-blue group-has-[input:checked]:bg-blue flex items-center justify-center transition-colors duration-0">
            <Check className="w-4 h-4 text-gray-100 opacity-0 group-has-[input:checked]:opacity-100 transition-opacity" />
          </div>

          <span>{t('form_is_live')}</span>
        </label>
      </div>

      <Button
        type="submit"
        className="mt-2 flex justify-center"
        disabled={isSubmitting}
      >
        {t('form_confirm')}
      </Button>
    </form>
  )
}

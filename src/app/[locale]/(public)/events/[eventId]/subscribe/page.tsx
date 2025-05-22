import { getAuthUser } from '@/services/auth-service'
import { getEvent } from '@/services/event-service'
import { getDateParams } from '@/utils/helper'
import { Radio } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { SubscriptionForm } from './(components)/subscription-form'

interface EventSubscriptionProps {
  params: Promise<{ eventId: string }>
}

export default async function EventSubscription(props: EventSubscriptionProps) {
  const t = await getTranslations()
  const { eventId } = await props.params
  const event = await getEvent(eventId)
  let user = null
  const token = (await cookies()).get('token')?.value

  if (token) {
    try {
      const { user: authUser } = await getAuthUser()

      user = authUser
    } catch {}
  }

  if (!event) notFound()

  const date = getDateParams(event.date, t)

  return (
    <div className="flex flex-col justify-start gap-10 mb-14">
      <div className="flex flex-col gap-8 items-center md:items-start">
        <h1 className="text-4xl text-center break-all leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left">
          <span className="text-blue">{event.title}</span>
          {event.subtitle}
        </h1>
      </div>

      <div className="flex gap-5 flex-col md:flex-row md:items-stretch">
        <div className="flex-1 flex flex-col justify-between bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-gray-200 text-xl">
                {t('private.events.about_the_event')}
              </h2>
              {event.is_live && (
                <span className="text-purple font-semibold text-xs flex items-center gap-2">
                  <Radio className="size-5 " />
                  {t('private.events.live')}
                </span>
              )}
            </div>
            <p className="text-gray-300 leading-relaxed text-sm break-all md:text-base">
              {event.description}
              <br />
              <br />
            </p>
          </div>
          <span>{date}</span>
        </div>

        <div className="md:min-w-[320px] lg:min-w-[430px]">
          <SubscriptionForm user={user} eventId={eventId} />
        </div>
      </div>
    </div>
  )
}

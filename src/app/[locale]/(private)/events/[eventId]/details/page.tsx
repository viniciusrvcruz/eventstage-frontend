import { getEvent, getEventSubscription } from '@/services/event-service'
import { decodeToken } from '@/utils/helper'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { InviteLinkInput } from './(components)/invite-link-input'
import { Ranking } from './(components)/ranking'
import { Stats } from './(components)/stats'

interface InvitePageProps {
  params: Promise<{
    eventId: string
  }>
}

export default async function EventDetails(props: InvitePageProps) {
  const t = await getTranslations('private.events')
  const { eventId } = await props.params
  const token = (await cookies()).get('token')?.value
  const userId = decodeToken(token)?.id
  const event = await getEvent(eventId)

  if (!event) notFound()

  const { subscription } = await getEventSubscription(event.id)

  if (!subscription && userId !== event.createdBy) {
    redirect(`/events/${eventId}/subscribe`)
  }

  return (
    <div>
      <div className="flex flex-col gap-8 items-center mb-5">
        <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left break-all">
          <span className="text-blue break-all">{event.title}</span>
          {event.subtitle}
        </h1>
      </div>
      <div className="min-h-dvh flex justify-between gap-16 flex-col mb-20 items-center md:flex-row md:items-start">
        <div className="flex flex-col gap-10 w-full max-w-[550px]">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold font-heading text-gray-100 leading-none">
              {t('access_event')}
            </h2>
            <p className="text-gray-300">{t('access_instruction')}</p>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-center items-center gap-2 px-5 py-2 bg-gray-500 text-blue font-semibold rounded-xl w-full cursor-pointer transition-colors duration-300 hover:bg-blue hover:text-gray-900 truncate"
            >
              <span className="text-lg my-1 md:text-xl">
                {t('access_event_button')}
              </span>
              <hr className="border-gray-400 group-hover:border-gray-600 w-full transition-colors duration-300" />
              <span className="text-xs w-full text-center text-gray-400 truncate group-hover:text-gray-600">
                {event.url}
              </span>
            </a>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
                {subscription ? t('invite_and_rank') : t('invite_event')}
              </h2>
              <p className="text-gray-300">{t('invite_instruction')}</p>
            </div>
            <InviteLinkInput
              eventId={eventId}
              subscriptionId={subscription?.id}
            />
            {subscription && <Stats eventId={eventId} />}
          </div>
        </div>
        <Ranking eventId={eventId} />
      </div>
    </div>
  )
}

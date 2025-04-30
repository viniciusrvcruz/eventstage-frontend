import { EventForm } from '@/components/event-form'
import { GoBackButton } from '@/components/go-back-button'
import { getEvent } from '@/services/event-service'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

interface EditEventProps {
  params: Promise<{ eventId: string }>
}

export default async function EditEvent(props: EditEventProps) {
  const { eventId } = await props.params
  const t = await getTranslations('private.events')
  const event = await getEvent(eventId)

  if (!event) notFound()

  return (
    <div>
      <GoBackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center leading-none font-heading font-medium mb-10 flex flex-col md:text-6xl">
          {t('edit_event')}
        </h1>
        <EventForm event={event} />
      </div>
    </div>
  )
}

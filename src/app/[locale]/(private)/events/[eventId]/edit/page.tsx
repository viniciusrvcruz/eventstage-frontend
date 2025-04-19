import { EventForm } from '@/components/event-form'
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
    <div className="flex flex-col justify-center space-y-10">
      <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-6xl">
        {t('edit_event')}
      </h1>
      <div className="w-full flex justify-center">
        <EventForm event={event} />
      </div>
    </div>
  )
}

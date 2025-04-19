import { EventForm } from '@/components/event-form'
import { useTranslations } from 'next-intl'

export default function CreateEvent() {
  const t = useTranslations('private.events')

  return (
    <div className="flex flex-col justify-center space-y-10">
      <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-6xl">
        {t('create_an_event')}
      </h1>
      <div className="w-full flex justify-center">
        <EventForm />
      </div>
    </div>
  )
}

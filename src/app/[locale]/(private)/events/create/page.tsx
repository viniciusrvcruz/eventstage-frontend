import { EventForm } from '@/components/event-form'
import { GoBackButton } from '@/components/go-back-button'
import { useTranslations } from 'next-intl'

export default function CreateEvent() {
  const t = useTranslations('private.events')

  return (
    <div>
      <GoBackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col mb-10 md:text-6xl">
          {t('create_an_event')}
        </h1>
        <EventForm />
      </div>
    </div>
  )
}

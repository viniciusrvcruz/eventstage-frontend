'use client'

import { getEvents } from '@/services/event-service'
import type { EventSchema } from '@/types/event'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { DeleteEventDialog } from './delete-event-dialog'
import { EventCard } from './event-card'

interface IInfiniteScrollEventsProps {
  search: string | undefined
  initialEvents: EventSchema[] | undefined
  filter?: string
  userId: string | null
}

export default function InfiniteScrollEvents({
  search,
  initialEvents,
  filter,
  userId,
}: IInfiniteScrollEventsProps) {
  const t = useTranslations('private.events')
  const [events, setEvents] = useState(initialEvents)
  const [page, setPage] = useState(1)
  const [eventToDelete, setEventToDelete] = useState<EventSchema | null>(null)
  const [isDeleteEventAlertOpen, setIsDeleteEventAlertOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [ref, inView] = useInView()

  const loadMoreEvents = async () => {
    const next = page + 1
    const { events: eventsResponse } = await getEvents({
      search,
      page: next,
      filter,
    })

    if (eventsResponse?.length) {
      setPage(next)
      setEvents((prev: EventSchema[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...eventsResponse,
      ])
    } else {
      setShowLoader(false)
    }
  }

  useEffect(() => {
    if (!inView) return

    loadMoreEvents()
  }, [inView])

  function handleDelete(event: EventSchema) {
    setEventToDelete(event)
    setIsDeleteEventAlertOpen(true)
  }

  function handleDeleted(eventId: string) {
    setEvents((prev) => prev?.filter((event) => event.id !== eventId) ?? [])
  }

  return (
    <div className="w-full">
      {events?.length === 0 && (
        <div className="text-center w-full my-10">{t('no_events')}</div>
      )}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {events?.map((event: EventSchema, index: number) => (
          <EventCard
            key={`${event.id}-${index}`}
            event={event}
            userId={userId}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {showLoader && (
        <div ref={ref} className="flex justify-center items-center pb-5">
          <div className="animate-spin h-12 w-12 border-t-4 border-b-4 rounded-full border-gray-300" />
        </div>
      )}

      {eventToDelete && (
        <DeleteEventDialog
          event={eventToDelete}
          open={isDeleteEventAlertOpen}
          setOpen={setIsDeleteEventAlertOpen}
          handleDeleted={handleDeleted}
        />
      )}
    </div>
  )
}

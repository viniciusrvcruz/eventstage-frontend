'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { getEvents } from '@/services/event-service'
import type { EventSchema } from '@/types/event'

interface IInfiniteScrollEventsProps {
  search: string | undefined
  initialEvents: EventSchema[] | undefined
  mySubscriptions?: boolean
}

export default function InfiniteScrollEvents({
  search,
  initialEvents,
  mySubscriptions,
}: IInfiniteScrollEventsProps) {
  const [events, setEvents] = useState(initialEvents)
  const [page, setPage] = useState(1)
  const [showLoader, setShowLoader] = useState(true)
  const [ref, inView] = useInView()

  const loadMoreEvents = async () => {
    const next = page + 1
    const { events: eventsResponse } = await getEvents({
      search,
      page: next,
      mySubscriptions,
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

  return (
    <div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {events?.map((event: EventSchema, index: number) => (
          <div
            key={`${event.id}-${index}`}
            className="flex flex-col bg-gray-700 border border-gray-600 rounded-2xl p-4 min-w-[300px]"
          >
            <span className="font-heading text-blue font-bold text-lg truncate md:text-xl">
              {event.title}
            </span>
            <span className="font-heading leading-none mb-3 truncate">
              {event.subtitle}
            </span>
            <p className="text-gray-300 leading-relaxed text-sm truncate md:text-base">
              {event.description}
            </p>
          </div>
        ))}
      </div>

      {showLoader && (
        <div ref={ref} className="flex justify-center items-center pb-5">
          <div className="animate-spin h-12 w-12 border-t-4 border-b-4 rounded-full border-gray-300" />
        </div>
      )}
    </div>
  )
}

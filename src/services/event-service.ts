'use server'

import { privateApi } from '@/http/api'
import type { EventSchema } from '@/types/event'

interface IEventResponse {
  event: EventSchema
}

interface IGetEventsResponse {
  events: EventSchema[]
  total: number
}

interface IGetEventsProps {
  search?: string
  page: number
  myEvents?: boolean
  mySubscriptions?: boolean
}

export async function getEvent(eventId: string): Promise<EventSchema | null> {
  try {
    const response = await privateApi.get<IEventResponse>(`/events/${eventId}`)
    return response.event
  } catch (error) {
    return null
  }
}

export async function createEvent(event: EventSchema): Promise<IEventResponse> {
  return privateApi.post('/events', event)
}

export async function updateEvent(
  event: EventSchema,
  eventId: string
): Promise<IEventResponse> {
  return privateApi.put(`/events/${eventId}`, event)
}

export async function getEvents({
  search,
  page,
  myEvents = false,
  mySubscriptions = false,
}: IGetEventsProps): Promise<IGetEventsResponse> {
  const searchParams = new URLSearchParams()

  if (search) {
    searchParams.set('search', search)
  }

  searchParams.set('page', page.toString())

  if (myEvents) {
    searchParams.set('myEvents', String(myEvents))
  }

  if (mySubscriptions) {
    searchParams.set('mySubscriptions', String(mySubscriptions))
  }

  try {
    const response = await privateApi.get<IGetEventsResponse>(
      `/events${searchParams ? `?${searchParams.toString()}` : ''}`
    )

    return response
  } catch (error) {
    return {
      events: [],
      total: 0,
    }
  }
}

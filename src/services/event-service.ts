'use server'

import { apiRequest } from '@/lib/api-request'
import type { EventPayloadSchema, EventSchema } from '@/types/event'

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
  filter?: string
}

export async function getEvent(eventId: string): Promise<EventSchema | null> {
  try {
    const response = await apiRequest('GET', `events/${eventId}`)
    return response.event
  } catch (error) {
    return null
  }
}

export async function createEvent(
  event: EventPayloadSchema
): Promise<IEventResponse> {
  return apiRequest('POST', 'events', event)
}

export async function updateEvent(
  event: EventPayloadSchema,
  eventId: string
): Promise<IEventResponse> {
  return apiRequest('PUT', `events/${eventId}`, event)
}

export async function getEvents({
  search,
  page,
  myEvents = false,
  filter,
}: IGetEventsProps): Promise<IGetEventsResponse> {
  const searchParams = new URLSearchParams()

  if (search) {
    searchParams.set('search', search)
  }

  searchParams.set('page', page.toString())

  if (myEvents) {
    searchParams.set('myEvents', String(myEvents))
  }

  if (filter) {
    searchParams.set(filter, 'true')
  }

  try {
    const response = await apiRequest(
      'GET',
      `events${searchParams ? `?${searchParams.toString()}` : ''}`
    )

    return response
  } catch (error) {
    return {
      events: [],
      total: 0,
    }
  }
}

export async function deleteEvent(eventId: string) {
  return apiRequest('DELETE', `events/${eventId}`)
}

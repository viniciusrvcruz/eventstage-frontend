'use server'

import { privateApi } from '@/http/api'
import type { EventSchema } from '@/types/event'

interface IEventResponse {
  event: EventSchema
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

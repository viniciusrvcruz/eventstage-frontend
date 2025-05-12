'use server'

import { apiRequest } from '@/lib/api-request'

interface SubscriptionProps {
  name: string
  email: string
  referrer: string | null
}

export async function createSubscriptionToEvent(
  subscription: SubscriptionProps,
  eventId: string
) {
  return apiRequest('POST', `events/${eventId}/subscriptions`, subscription)
}

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

export async function getSubscriptionInviteClicks(eventId: string) {
  return apiRequest('GET', `events/${eventId}/subscriptions/ranking/clicks`)
}

export async function getSubscriptionInvitesCount(eventId: string) {
  return apiRequest('GET', `events/${eventId}/subscriptions/ranking/count`)
}

export async function getSubscriptionRankingPosition(eventId: string) {
  return apiRequest('GET', `events/${eventId}/subscriptions/ranking/position`)
}

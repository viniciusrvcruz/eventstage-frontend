import {
  getSubscriptionInviteClicks,
  getSubscriptionInvitesCount,
  getSubscriptionRankingPosition,
} from '@/services/event-subscription-service'
import { BadgeCheck, Medal, MousePointerClick } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

interface StatsProps {
  eventId: string
}

export async function Stats({ eventId }: StatsProps) {
  const t = await getTranslations('private.stats')
  const { count: accessCount } = await getSubscriptionInviteClicks(eventId)
  const { count: invitesCount } = await getSubscriptionInvitesCount(eventId)
  const { position: rankingPosition } =
    await getSubscriptionRankingPosition(eventId)

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
          {accessCount}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          {t('link_clicks')}
        </span>
        <MousePointerClick className="size-5 text-purple absolute top-3 left-3" />
      </div>
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
          {invitesCount}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          {t('subscriptions')}
        </span>

        <BadgeCheck className="size-5 text-purple absolute top-3 left-3" />
      </div>
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
          {rankingPosition ? `${rankingPosition}°` : '-'}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          {t('ranking_position')}
        </span>

        <Medal className="size-5 text-purple absolute top-3 left-3" />
      </div>
    </div>
  )
}

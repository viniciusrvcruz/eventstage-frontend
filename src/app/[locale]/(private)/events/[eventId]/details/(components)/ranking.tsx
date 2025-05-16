import medalCooper from '@/assets/medal-cooper.svg'
import medalGold from '@/assets/medal-gold.svg'
import medalSilver from '@/assets/medal-silver.svg'
import { getSubscriptionsRanking } from '@/services/event-subscription-service'
import type { SubscriptionRankingSchema } from '@/types/subscription'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

interface RankingProps {
  eventId: string
}

export async function Ranking({ eventId }: RankingProps) {
  const t = await getTranslations('private.events')
  const { ranking }: SubscriptionRankingSchema =
    await getSubscriptionsRanking(eventId)

  return (
    <div className="w-full max-w-[550px] space-y-5">
      <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
        {t('ranking')}
      </h2>

      <div className="space-y-4">
        {ranking.length
          ? ranking.map((item, index) => {
              const rankingPosition = index + 1

              return (
                <div
                  key={item.id}
                  className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3"
                >
                  <span className="text-sm text-gray-300 leading-none pe-15 break-all">
                    <span className="font-semibold">{rankingPosition}°</span> |{' '}
                    {item.name.substring(0, 46)}
                  </span>

                  <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
                    {item.score}
                  </span>

                  {rankingPosition === 1 && (
                    <Image
                      src={medalGold}
                      alt="Medal img"
                      className="absolute top-0 right-8"
                    />
                  )}

                  {rankingPosition === 2 && (
                    <Image
                      src={medalSilver}
                      alt="Medal img"
                      className="absolute top-0 right-8"
                    />
                  )}

                  {rankingPosition === 3 && (
                    <Image
                      src={medalCooper}
                      alt="Medal img"
                      className="absolute top-0 right-8"
                    />
                  )}
                </div>
              )
            })
          : '-'}
      </div>
    </div>
  )
}

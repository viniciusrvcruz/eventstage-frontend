import { getEvents } from '@/services/event-service'
import { getTranslations } from 'next-intl/server'
import EventOptions from './(components)/event-options'
import InfiniteScrollEvents from './(components)/infinite-scroll-events'

export default async function Events(props: {
  searchParams: Promise<{
    search?: string
    mySubscriptions?: string
  }>
}) {
  const t = await getTranslations('private.events')

  const searchParams = await props.searchParams

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const mySubscriptions =
    typeof searchParams.mySubscriptions === 'string'
      ? !!searchParams.mySubscriptions
      : undefined

  const { events } = await getEvents({ search, page: 1, mySubscriptions })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left">
          {t('title')}
        </h1>
        <p className="text-gray-300 text-sm text-center sm:text-xl sm:text-start">
          {t('events_description')}
        </p>
      </div>
      <EventOptions search={search} mySubscriptions={mySubscriptions} />
      {mySubscriptions && (
        <h1 className="text-2xl font-bold">{t('my_subscriptions')}</h1>
      )}
      <InfiniteScrollEvents
        key={Math.random()}
        search={search}
        initialEvents={events}
        mySubscriptions={mySubscriptions}
      />
    </div>
  )
}

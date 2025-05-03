import { eventFilters } from '@/constants/event-filters'
import { getEvents } from '@/services/event-service'
import { decodeToken } from '@/utils/helper'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import EventOptions from './(components)/event-options'
import InfiniteScrollEvents from './(components)/infinite-scroll-events'

export default async function Events(props: {
  searchParams: Promise<{
    search?: string
    filter?: string
  }>
}) {
  const t = await getTranslations('private.events')

  const searchParams = await props.searchParams

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const selectedFilter =
    typeof searchParams.filter === 'string'
      ? eventFilters.find((f) => f.value === searchParams.filter)
      : undefined

  const { events } = await getEvents({
    search,
    page: 1,
    filter: selectedFilter?.value,
  })

  const nextCookies = await cookies()

  const token = nextCookies.get('token')
  const userId = decodeToken(token?.value)?.id

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
      <EventOptions search={search} filter={selectedFilter?.value} />
      {selectedFilter && (
        <h1 className="text-2xl font-bold">{t(selectedFilter.label)}</h1>
      )}
      <InfiniteScrollEvents
        key={Math.random()}
        search={search}
        initialEvents={events}
        filter={selectedFilter?.value}
        userId={userId}
      />
    </div>
  )
}

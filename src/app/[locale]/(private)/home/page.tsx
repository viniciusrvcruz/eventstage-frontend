import { getTranslations } from 'next-intl/server'
import EventOptions from './(components)/event-options'

export default async function Home(props: {
  searchParams: Promise<{
    search?: string
  }>
}) {
  const t = await getTranslations('private.home')

  const searchParams = await props.searchParams

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left">
          {t('events')}
        </h1>
        <p className="text-gray-300 text-sm text-center sm:text-xl sm:text-start">
          {t('events_description')}
        </p>
      </div>
      <EventOptions search={search} />
    </div>
  )
}

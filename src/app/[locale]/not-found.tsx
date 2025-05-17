import { LinkButton } from '@/components/link-button'
import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('public.not_found')

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-blue">{t('code')}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance font-heading text-blue sm:text-7xl">
          {t('title')}
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8">
          {t('description')}
        </p>
        <div className="flex justify-center items-center">
          <LinkButton
            href="/events"
            className="flex justify-center mt-10 w-[200px]"
          >
            {t('button')}
          </LinkButton>
        </div>
      </div>
    </main>
  )
}

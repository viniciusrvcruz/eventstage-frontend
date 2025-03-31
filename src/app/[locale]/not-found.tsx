import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('public.not_found')

  return <h1>{t('title')}</h1>
}

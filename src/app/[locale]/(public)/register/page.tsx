import { NextIntlClientProvider } from 'next-intl'
import { useTranslations } from 'next-intl'
import { RegisterForm } from './(components)/form'

export default function RegisterPage() {
  const t = useTranslations('public.authentication')

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-heading mb-14">{t('register_title')}</h1>

      <NextIntlClientProvider>
        <RegisterForm />
      </NextIntlClientProvider>
    </div>
  )
}

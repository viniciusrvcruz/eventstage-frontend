import { useTranslations } from 'next-intl'
import { LoginForm } from './(components)/form'

export default function LoginPage() {
  const t = useTranslations('public.authentication')

  return (
    <div className="flex flex-col items-center pt-5">
      <h1 className="text-6xl font-heading mb-10">{t('enter_button')}</h1>

      <LoginForm />
    </div>
  )
}

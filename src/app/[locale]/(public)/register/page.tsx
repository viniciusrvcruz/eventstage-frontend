import { useTranslations } from 'next-intl'
import { RegisterForm } from './(components)/form'

export default function RegisterPage() {
  const t = useTranslations('public.authentication')

  return (
    <div className="flex flex-col items-center pt-5">
      <h1 className="text-6xl text-center font-heading mb-10">
        {t('register_title')}
      </h1>

      <RegisterForm />
    </div>
  )
}

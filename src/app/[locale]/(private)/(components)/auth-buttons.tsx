'use client'

import { LinkButton } from '@/components/link-button'
import { usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const AuthButtons = () => {
  const t = useTranslations('public.authentication')
  const pathname = usePathname()

  const isLoginPage = pathname.includes('/login')
  const isRegisterPage = pathname.includes('/register')

  return (
    <div>
      {!isLoginPage && (
        <LinkButton href="/login" className="h-auto px-5 py-2">
          {t('enter_button')}
        </LinkButton>
      )}
      {!isRegisterPage && isLoginPage && (
        <LinkButton href="/register" className="h-auto px-5 py-2">
          {t('create_account')}
        </LinkButton>
      )}
    </div>
  )
}

export default AuthButtons

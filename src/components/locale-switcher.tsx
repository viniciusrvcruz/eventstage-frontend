import { routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import LocaleSwitcherSelect from './locale-switcher-dropdown'

interface LocaleSwitcherProps {
  className: string
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      locales={routing.locales}
      className={className}
    />
  )
}

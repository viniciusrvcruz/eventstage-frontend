'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Check, Languages } from 'lucide-react'
import { type Locale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'

type Props = {
  defaultValue: string
  locales: readonly Locale[]
  className: string
}

export default function LocaleSwitcherSelect({
  defaultValue,
  locales,
  className,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()
  const t = useTranslations('locales')

  function onSelectChange(event: string) {
    const nextLocale = event as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'p-1.5 rounded-lg border cursor-pointer focus:outline-none',
          className
        )}
      >
        <Languages />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((cur) => (
          <DropdownMenuItem key={cur} onClick={() => onSelectChange(cur)}>
            {t(`${cur}`)}
            {defaultValue === cur && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

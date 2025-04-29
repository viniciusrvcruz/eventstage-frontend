'use client'

import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Check, Filter } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IEventFilterDropdownProps {
  filter: string | null
  isSearching?: boolean
}

export function EventFilterDropdown({
  filter: filterProp,
  isSearching = false,
}: IEventFilterDropdownProps) {
  const t = useTranslations('private.events')
  const { replace } = useRouter()
  const pathname = usePathname()

  const [filter, setFilter] = useState(filterProp)

  const filters = [
    { value: 'myEvents', label: t('my_events') },
    { value: 'mySubscriptions', label: t('my_subscriptions') },
  ]

  useEffect(() => {
    const params = new URLSearchParams()

    if (filter) {
      params.set(filter, 'true')
    }

    routerReplace(params.toString())
  }, [filter])

  function routerReplace(params?: string) {
    replace(`${pathname}${params ? `?${params}` : ''}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'flex justify-center gap-1.5 text-center relative',
            isSearching && 'flex-1 hidden sm:flex'
          )}
          type="button"
        >
          <Filter />
          {!isSearching && (
            <span className="hidden md:block">{t('filter')}</span>
          )}
          <div className="absolute -top-1 -right-1 h-4 px-2 bg-orange-500 rounded-full text-gray-900 text-[10px] flex items-center justify-center">
            {!isSearching &&
              filters.find((item) => item.value === filter)?.label}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {filters.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="cursor-pointer"
            onClick={() => setFilter(item.value)}
          >
            {item.label}
            {filter === item.value && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

'use client'

import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { eventFilters } from '@/constants/event-filters'
import { cn } from '@/lib/utils'
import { Check, Filter, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

interface IEventFilterDropdownProps {
  filter?: string | null
  isSearching?: boolean
}

export function EventFilterDropdown({
  filter: filterProp,
  isSearching = false,
}: IEventFilterDropdownProps) {
  const t = useTranslations('private.events')
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialRender = useRef(true)

  const [filter, setFilter] = useState(filterProp)

  const filters = eventFilters

  const selectedFilter = useMemo(() => {
    return filters.find((item) => item.value === filter)
  }, [filter, filters])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    const params = getUrlSearchParams()

    if (filter) {
      params.set('filter', filter)
    } else {
      params.delete('filter')
    }

    routerReplace(params.toString())
  }, [filter])

  function getUrlSearchParams() {
    return new URLSearchParams(searchParams.toString())
  }

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
          {selectedFilter && (
            <span className="absolute -top-1 -right-1 h-4 px-2 bg-orange-500 rounded-full text-gray-900 text-[10px] flex items-center justify-center" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {filters.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="cursor-pointer"
            onClick={() => setFilter(item.value)}
          >
            {item.icon}
            {t(item.label)}
            {filter === item.value && <Check />}
          </DropdownMenuItem>
        ))}
        {selectedFilter && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter(null)}>
              <Trash2 />
              {t('remove')}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

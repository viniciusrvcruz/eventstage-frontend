'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { LinkButton } from '@/components/link-button'
import { cn } from '@/lib/utils'
import { ArrowLeft, Plus, Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { EventFilterDropdown } from './event-filter-dropdown'

interface IEventOptionsProps {
  search?: string
  filter?: string
}

export default function EventOptions({ search, filter }: IEventOptionsProps) {
  const t = useTranslations('private.events')

  const { replace } = useRouter()
  const pathname = usePathname()
  const initialRender = useRef(true)
  const searchParams = useSearchParams()

  const [isSearching, setIsSearching] = useState(!!search)
  const [text, setText] = useState(search ?? '')
  const [query] = useDebounce(text, 300)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    const params = getUrlSearchParams()

    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }

    routerReplace(params.toString())
  }, [query])

  function getUrlSearchParams() {
    return new URLSearchParams(searchParams.toString())
  }

  function handleSearch() {
    setIsSearching((prev) => {
      const newValue = !prev

      if (!prev) handleInputFocus()

      return newValue
    })
  }

  function routerReplace(params?: string) {
    replace(`${pathname}${params ? `?${params}` : ''}`)
  }

  function resetSearch(fullReset = false) {
    setText('')

    if (fullReset) {
      setIsSearching(false)
    } else {
      handleInputFocus()
    }
  }

  function handleInputFocus() {
    setTimeout(() => document.getElementById('search_input')?.focus(), 0)
  }

  return (
    <section className="flex bg-gray-700 border border-gray-600 rounded-2xl p-4 gap-4 w-full">
      {isSearching ? (
        <InputRoot className="w-full">
          <InputIcon>
            <ArrowLeft
              className="text-gray-400 cursor-pointer me-2"
              onClick={() => resetSearch(true)}
            />
          </InputIcon>
          <InputField
            type="text"
            id="search_input"
            placeholder={t('search_events_placeholder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <InputIcon>
              <X
                className="text-gray-400 cursor-pointer"
                onClick={() => resetSearch()}
              />
            </InputIcon>
          )}
        </InputRoot>
      ) : (
        <Button
          className="flex justify-center gap-1.5 text-center"
          type="submit"
          onClick={handleSearch}
        >
          <Search />
          <span className="hidden md:block">{t('search_events')}</span>
        </Button>
      )}
      <EventFilterDropdown filter={filter} isSearching={isSearching} />
      <LinkButton
        className={cn(
          'flex justify-center gap-1.5 text-center',
          isSearching && 'flex-1',
          isSearching && 'hidden sm:flex'
        )}
        href="/events/create"
        type="submit"
      >
        <Plus />
        {!isSearching && (
          <span className="hidden md:block">{t('create_new_event')}</span>
        )}
      </LinkButton>
    </section>
  )
}

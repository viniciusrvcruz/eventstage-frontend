'use client'

import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { cn } from '@/lib/utils'
import { ArrowLeft, Plus, Search, TextSearch, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function EventOptions({ search }: { search?: string }) {
  const t = useTranslations('private.home')

  const router = useRouter()
  const initialRender = useRef(true)

  const [isSearching, setIsSearching] = useState(!!search)
  const [text, setText] = useState(search ? search : '')
  const [query] = useDebounce(text, 300)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) {
      routerPush('/home')
    } else {
      routerPush(`/home?search=${query}`)
    }
  }, [query])

  function handleSearch() {
    setIsSearching((prev) => {
      const newValue = !prev

      if (!prev) handleInputFocus()

      return newValue
    })
  }

  function routerPush(route: string) {
    router.push(route)
  }

  function resetSearch(fullReset = false) {
    setText('')
    initialRender.current = true
    routerPush('/home')

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
      <Button
        className={cn(
          'flex justify-center gap-1.5 text-center',
          isSearching && 'flex-1',
          isSearching && 'hidden sm:flex'
        )}
        type="submit"
      >
        <TextSearch />
        {!isSearching && (
          <span className="hidden md:block">{t('see_my_events')}</span>
        )}
      </Button>
      <Button
        className={cn(
          'flex justify-center gap-1.5 text-center',
          isSearching && 'flex-1',
          isSearching && 'hidden sm:flex'
        )}
        type="submit"
      >
        <Plus />
        {!isSearching && (
          <span className="hidden md:block">{t('create_new_event')}</span>
        )}
      </Button>
    </section>
  )
}

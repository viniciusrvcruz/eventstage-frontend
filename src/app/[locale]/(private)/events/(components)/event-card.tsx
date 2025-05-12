'use client'

import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from '@/i18n/navigation'
import type { EventSchema } from '@/types/event'
import { Ellipsis } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

interface EventCardProps {
  event: EventSchema
  userId: string | null
  handleDelete: (event: EventSchema) => void
}

export function EventCard({ event, userId, handleDelete }: EventCardProps) {
  const t = useTranslations('private.events')
  const router = useRouter()

  const eventLinkHref = event.subscription
    ? `/events/${event.id}/details`
    : `/events/${event.id}/subscribe`

  return (
    <Link
      href={eventLinkHref}
      type="button"
      className="flex flex-col bg-gray-700 border border-gray-600 rounded-2xl p-4 min-w-[300px]"
    >
      <div className="flex justify-between">
        <div className="flex flex-col flex-grow justify-center truncate">
          <span className="font-heading text-blue font-bold text-lg truncate md:text-xl">
            {event.title}
          </span>
          <span className="font-heading leading-none mb-3 truncate">
            {event.subtitle}
          </span>
        </div>
        {userId === event.createdBy && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex justify-center items-center flex-shrink-0 w-10 h-10 p-0">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`events/${event.id}/edit`)
                }}
              >
                {t('edit')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(event)
                }}
              >
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <p className="text-gray-300 leading-relaxed text-sm truncate md:text-base">
        {event.description}
      </p>
    </Link>
  )
}

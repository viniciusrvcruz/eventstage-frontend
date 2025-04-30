'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useTranslations } from 'use-intl'

interface UserDropdownProps {
  name: string
  email: string
}

export function UserDropdown({ name, email }: UserDropdownProps) {
  const t = useTranslations('components.user_dropdown')

  function handleLogout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    redirect('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 rounded-lg border border-gray-500 cursor-pointer focus:outline-none">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="max-w-[250px] truncate">
          <h5 className="text-lg leading-none truncate">{name}</h5>
          <small>{email}</small>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {t('logout_btn')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

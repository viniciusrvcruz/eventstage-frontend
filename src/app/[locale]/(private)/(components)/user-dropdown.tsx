'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { removeTokenFromCookies } from '@/utils/helper'
import { User } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'use-intl'

interface UserDropdownProps {
  name: string
  email: string
}

export function UserDropdown({ name, email }: UserDropdownProps) {
  const t = useTranslations('components.user_dropdown')
  const [open, setOpen] = useState(false)

  function handleSupportClick() {
    setOpen(false)
    redirect('/support')
  }

  function handleLogout() {
    removeTokenFromCookies()
    redirect('/login')
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="p-1.5 rounded-lg border border-gray-500 cursor-pointer focus:outline-none">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="max-w-[250px] truncate">
          <h5 className="text-lg leading-none truncate">{name}</h5>
          <small>{email}</small>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSupportClick}>
          {t('support_btn')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          {t('logout_btn')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

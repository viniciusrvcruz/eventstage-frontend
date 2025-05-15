'use client'

import { IconButton } from '@/components/icon-button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { env } from '@/env'
import { Copy, Link } from 'lucide-react'
import { useEffect, useState } from 'react'

interface InviteLinkInputProps {
  eventId: string
  subscriptionId: string | null
}

export function InviteLinkInput({
  eventId,
  subscriptionId,
}: InviteLinkInputProps) {
  const [inviteLink, setInviteLink] = useState('')

  const baseApiUrl = env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const link = subscriptionId
      ? `${baseApiUrl}/events/${eventId}/subscription/${subscriptionId}`
      : `${origin}/events/${eventId}/subscribe`

    setInviteLink(link)
  }, [eventId, subscriptionId, baseApiUrl])

  function copyInviteLink() {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>

      <InputField readOnly value={inviteLink} />

      <IconButton className="-mr-2" onClick={copyInviteLink}>
        <Copy className="size-5" />
      </IconButton>
    </InputRoot>
  )
}

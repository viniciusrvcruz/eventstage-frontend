'use client'

import { IconButton } from '@/components/icon-button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { Copy, Link } from 'lucide-react'
import { useEffect, useState } from 'react'

interface InviteLinkInputProps {
  eventId: string
  userId: string
}

export function InviteLinkInput({ eventId, userId }: InviteLinkInputProps) {
  const [inviteLink, setInviteLink] = useState('')

  useEffect(() => {
    const origin = window.location.origin
    setInviteLink(`${origin}/events/${eventId}/subscribe?referrer=${userId}`)
  }, [eventId, userId])

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

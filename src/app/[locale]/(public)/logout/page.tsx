'use client'

import { removeTokenFromCookies } from '@/utils/helper'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Logout() {
  useEffect(() => {
    removeTokenFromCookies()
    redirect('/login')
  }, [])

  return (
    <div className="flex justify-center items-center pb-5">
      <div className="animate-spin h-12 w-12 border-t-4 border-b-4 rounded-full border-gray-300" />
    </div>
  )
}

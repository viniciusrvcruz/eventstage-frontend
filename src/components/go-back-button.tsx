'use client'

import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export function GoBackButton() {
  const t = useTranslations('components')
  const router = useRouter()

  return (
    <button
      type="button"
      className="flex gap-1 items-center px-3 py-1 rounded-full text-xl cursor-pointer mb-5 sm:mb-0 hover:bg-gray-500"
      onClick={() => router.back()}
    >
      <ArrowLeft />
      {t('go_back')}
    </button>
  )
}

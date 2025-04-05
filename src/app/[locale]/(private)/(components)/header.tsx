import logo from '@/assets/logo.svg'
import { getAuthUser } from '@/services/auth-service'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

export async function Header() {
  const { user } = await getAuthUser()
  const t = await getTranslations('greeting')

  const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      return 'morning'
    }

    if (hour >= 12 && hour < 18) {
      return 'afternoon'
    }

    return 'evening'
  }

  const greeting = getGreeting()

  return (
    <header className="flex justify-between bg-gray-700 border border-gray-600 rounded-2xl px-5 py-4 my-10 w-full max-w-[1240px]">
      <Link href="/home">
        <Image
          src={logo}
          alt="devstage"
          width={108.5}
          height={30}
          priority={true}
        />
      </Link>
      {t(greeting)}, {user.name}
      <Image
        src={logo}
        alt="devstage"
        width={108.5}
        height={30}
        priority={true}
      />
    </header>
  )
}

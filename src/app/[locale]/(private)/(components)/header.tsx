import logo from '@/assets/logo.svg'
import LocaleSwitcher from '@/components/locale-switcher'
import { getAuthUser } from '@/services/auth-service'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { UserDropdown } from './user-dropdown'

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
    <header className="flex items-center justify-between bg-gray-700 border border-gray-600 rounded-2xl px-5 py-3 my-10 w-full max-w-[1240px]">
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
      <div className="flex items-center gap-3">
        <LocaleSwitcher className="border-gray-500" />
        <UserDropdown name={user.name} email={user.email} />
      </div>
    </header>
  )
}

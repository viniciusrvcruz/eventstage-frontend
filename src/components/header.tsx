import logo from '@/assets/logo.svg'
import LocaleSwitcher from '@/components/locale-switcher'
import { Link } from '@/i18n/navigation'
import { getAuthUser } from '@/services/auth-service'
import type { UserSchema } from '@/types/user'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import AuthButtons from '../app/[locale]/(private)/(components)/auth-buttons'
import { UserDropdown } from '../app/[locale]/(private)/(components)/user-dropdown'

interface HeaderProps {
  authUser?: UserSchema
}

export async function Header({ authUser }: HeaderProps) {
  let user = authUser ? { ...authUser } : null
  const token = (await cookies()).get('token')?.value

  if (!user && token) {
    try {
      const { user: authUser } = await getAuthUser()

      user = authUser
    } catch {}
  }

  const t = await getTranslations('greeting')

  const getGreeting = () => {
    const date = new Date().toLocaleString('en-US', {
      timeZone: 'America/Sao_Paulo',
    })

    const hour = new Date(date).getHours()
    let greeting = 'evening'

    if (hour >= 5 && hour < 12) {
      greeting = 'morning'
    }

    if (hour >= 12 && hour < 18) {
      greeting = 'afternoon'
    }

    return `${t(greeting)}, ${user?.name}`
  }

  return (
    <header className="flex items-center justify-between bg-gray-700 border border-gray-600 rounded-2xl px-5 py-3 my-10 w-full max-w-[1240px]">
      <Link href={user ? '/events' : '/'}>
        <Image
          src={logo}
          alt="eventstage"
          width={108.5}
          height={30}
          priority={true}
        />
      </Link>
      {user && (
        <span className="mx-5 hidden truncate sm:block">{getGreeting()}</span>
      )}
      <div className="flex items-center gap-3">
        <LocaleSwitcher className="border-gray-500" />
        {user && <UserDropdown name={user.name} email={user.email} />}
        {!user && <AuthButtons />}
      </div>
    </header>
  )
}

import brazilFlag from '@/assets/brazil.png'
import logo from '@/assets/logo.svg'
import usaFlag from '@/assets/states_of_america_united.png'
import LocaleSwitcher from '@/components/locale-switcher'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const t = useTranslations('locales')

  return (
    <div className="max-w-[1240px] w-full py-5 px-5 md:p-8">
      <header className="flex justify-between">
        <Image src={logo} alt="devstage" width={108.5} height={30} />
        <LocaleSwitcher className="border-gray-300/50" />
      </header>
      <main className="mx-auto px-5 py-8 md:py-0">{children}</main>
    </div>
  )
}

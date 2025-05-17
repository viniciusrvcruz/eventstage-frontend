import { Header } from '@/components/header'
import { getAuthUser } from '@/services/auth-service'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let authUser = null

  try {
    const response = await getAuthUser()

    authUser = response.user
  } catch {
    redirect('/logout')
  }

  return (
    <div className="max-w-[1240px] w-full px-5 py-0">
      <Header authUser={authUser} />
      <main>{children}</main>
    </div>
  )
}

import { getAuthUser } from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Header } from './(components)/header'

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
    ;(await cookies()).delete('token')
    redirect('/login')
  }

  return (
    <div className="max-w-[1240px] w-full px-5 py-0">
      <Header />
      <main>{children}</main>
    </div>
  )
}

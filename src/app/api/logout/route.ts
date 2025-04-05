import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const nextCookies = await cookies()

  nextCookies.delete('token')

  return redirect('/login')
}

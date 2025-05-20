import { routing } from '@/i18n/routing'
import createMiddleware from 'next-intl/middleware'
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server'

const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/subscribe', whenAuthenticated: 'next' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login'

const intlMiddleware = createMiddleware(routing)

const LOCALES = routing.locales

function isRootOrLocalizedRoot(pathname: string) {
  if (pathname === '/') return true
  return LOCALES.some((locale) => pathname === `/${locale}`)
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => path.includes(route.path))
  const authToken = request.cookies.get('token')

  if ((!authToken && publicRoute) || isRootOrLocalizedRoot(path)) {
    return intlMiddleware(request)
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/events'

    return NextResponse.redirect(redirectUrl)
  }

  return intlMiddleware(request)
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|background.png|og-image.png|trpc|_next|_vercel).*)',
  ],
}

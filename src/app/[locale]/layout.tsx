import { env } from '@/env'
import './globals.css'

import { routing } from '@/i18n/routing'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Montserrat, Oxanium } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

export async function generateMetadata() {
  const t = await getTranslations('metadata')

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    metadataBase: new URL(env.NEXT_PUBLIC_WEB_ADDRESS),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: env.NEXT_PUBLIC_WEB_ADDRESS,
      siteName: 'Eventstage',
      images: [
        {
          url: `${env.NEXT_PUBLIC_WEB_ADDRESS}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t('ogAlt'),
        },
      ],
      locale: t('ogLocale'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [`${env.NEXT_PUBLIC_WEB_ADDRESS}/og-image.png`],
    },
    icons: {
      icon: '/favicon.ico',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const oxanium = Oxanium({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-oxanium',
})

const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={`${oxanium.variable} ${montserrat.variable}`}
    >
      <body className="flex items-center flex-col bg-gray-900 text-gray-100 antialiased bg-[url(/background.png)] bg-no-repeat md:bg-right-top">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <ToastContainer />
      </body>
    </html>
  )
}

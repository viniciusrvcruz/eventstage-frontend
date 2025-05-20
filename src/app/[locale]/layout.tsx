import { env } from '@/env'
import './globals.css'

import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Montserrat, Oxanium } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Eventstage – Sua Plataforma de Eventos',
  description:
    'Descubra, participe e gerencie eventos incríveis com o Eventstage. Acompanhe agendas, compre ingressos e conecte-se com organizadores e participantes.',
  keywords: [
    'eventos',
    'plataforma de eventos',
    'ingressos',
    'agenda de eventos',
    'organização de eventos',
  ],
  metadataBase: new URL(env.NEXT_PUBLIC_WEB_ADDRESS),
  openGraph: {
    title: 'Eventstage – Sua Plataforma de Eventos',
    description:
      'Descubra, participe e gerencie eventos incríveis com o Eventstage.',
    url: env.NEXT_PUBLIC_WEB_ADDRESS,
    siteName: 'Eventstage',
    images: [
      {
        url: `${env.NEXT_PUBLIC_WEB_ADDRESS}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Banner do Eventstage',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventstage – Sua Plataforma de Eventos',
    description:
      'Descubra, participe e gerencie eventos incríveis com o Eventstage.',
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

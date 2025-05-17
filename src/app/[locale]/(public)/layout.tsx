import { Header } from '@/components/header'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="max-w-[1240px] w-full px-5 py-0">
      <Header />
      <main>{children}</main>
    </div>
  )
}

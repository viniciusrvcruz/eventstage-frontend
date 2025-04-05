import { Header } from './(components)/header'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="max-w-[1240px] w-full px-5 py-8 md:py-0">
      <Header />
      <main>{children}</main>
    </div>
  )
}

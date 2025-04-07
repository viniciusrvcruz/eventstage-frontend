export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="max-w-[1240px] mx-auto px-5 py-8 md:py-0">{children}</main>
  )
}

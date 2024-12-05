import './globals.css'
import TrackerProvider from '../components/tracking-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        {children}
        <TrackerProvider />
      </body>
    </html>
  )
}

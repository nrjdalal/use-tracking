import './globals.css'
import Tracker from '../components/tracker'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        {children}
        <Tracker />
      </body>
    </html>
  )
}

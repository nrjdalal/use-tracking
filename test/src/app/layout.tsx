import './globals.css'
import { Tracker } from 'use-tracking'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        {children}
        <Tracker
          action={async (event) => {
            await fetch('/api/analytics', {
              method: 'POST',
              body: JSON.stringify(event),
            })
          }}
        />
      </body>
    </html>
  )
}

'use client'

import { useTracking } from 'use-tracking'

export default function Page() {
  useTracking({
    action: (event) => {
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(event),
      })
    },
  })

  return <button>Click me</button>
}

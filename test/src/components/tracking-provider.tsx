'use client'

import { Tracker } from 'use-tracking'

export default function TrackingProvider() {
  return (
    <Tracker
      // other options
      action={(event) => {
        fetch('/api/analytics', {
          method: 'POST',
          body: JSON.stringify(event),
        })
      }}
    />
  )
}

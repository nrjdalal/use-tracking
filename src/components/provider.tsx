import { useTracking, type UseTrackingOptions } from '@/src/hooks/use-tracking'
import React from 'react'

export function TrackingClientProvider({
  config,
  children,
}: {
  config: UseTrackingOptions
  children?: React.ReactNode
}) {
  useTracking(config)

  return <React.Fragment>{children}</React.Fragment>
}

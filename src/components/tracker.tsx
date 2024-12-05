'use client'

import { useTracking, type UseTrackingOptions } from '@/src/hooks/use-tracking'

interface TrackerProps extends UseTrackingOptions {}

export default function Tracker(props: TrackerProps) {
  const options = {
    ...props,
  }

  useTracking(options)

  return null
}

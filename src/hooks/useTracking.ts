import { useEffect, useCallback } from 'react'
import { getDataAttributes } from '../utils/getDataAttributes.js'
import { findClosestMeaningfulParent } from '../utils/findClosestMeaningfulParent.js'
import { UseTrackingOptions } from '../types.js'

export function useTracking(options: UseTrackingOptions) {
  const {
    prefix,
    includeAll,
    ignore,
    action = (data) => console.log('useTracking:', data),
  } = options

  const memoizedAction = useCallback(action, [action])

  useEffect(() => {
    const trackPageView = () => {
      const pathname = window.location.pathname
      memoizedAction({
        event: 'pageview',
        pathname,
        timestamp: new Date().toISOString(), // ISO UTC format timestamp
      })
    }

    trackPageView()

    const handleRouteChange = (url: string) => {
      memoizedAction({
        event: 'pageview',
        pathname: url,
        timestamp: new Date().toISOString(),
      })
    }

    window.addEventListener('popstate', () =>
      handleRouteChange(window.location.pathname)
    )

    return () => {
      window.removeEventListener('popstate', () =>
        handleRouteChange(window.location.pathname)
      )
    }
  }, [memoizedAction])

  useEffect(() => {
    const trackClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Find the closest meaningful parent or use the target itself
      const meaningfulTarget = findClosestMeaningfulParent(target)

      // Extract attributes from the meaningful target
      const attributes = getDataAttributes(meaningfulTarget, {
        prefix,
        includeAll,
        ignore,
      })

      const eventData: Record<string, string> = {
        event: 'click',
        elementType: meaningfulTarget.tagName.toLowerCase(),
        timestamp: new Date().toISOString(), // ISO UTC format timestamp
      }

      Object.keys(attributes).forEach((key) => {
        eventData[key] = String(attributes[key])
      })

      memoizedAction(eventData)
    }

    document.addEventListener('click', trackClickEvent)

    return () => {
      document.removeEventListener('click', trackClickEvent)
    }
  }, [prefix, includeAll, ignore, memoizedAction])

  return null
}

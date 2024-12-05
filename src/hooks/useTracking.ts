import { useEffect, useCallback } from 'react'
import { getDataAttributes } from '../utils/getDataAttributes.js'
import { UseTrackingOptions } from '../types.js'

export function useTracking(options: UseTrackingOptions) {
  const {
    prefix,
    includeAll,
    ignore,
    action = (data) => console.log('useTracking:', data),
  } = options

  // Memoize the action function to avoid unnecessary re-creations
  const memoizedAction = useCallback(action, [action])

  // Track page views as a core functionality
  useEffect(() => {
    // Track initial page load view
    const trackPageView = () => {
      const pathname = window.location.pathname
      memoizedAction({
        event: 'pageview',
        pathname,
        timestamp: new Date().toISOString(), // ISO UTC format timestamp
      })
    }

    trackPageView() // Track the initial page load

    // Optional: Track SPA navigation (if you're using a client-side routing solution)
    const handleRouteChange = (url: string) => {
      memoizedAction({
        event: 'pageview',
        pathname: url,
        timestamp: new Date().toISOString(), // ISO UTC format timestamp
      })
    }

    // Listen to route changes (e.g., SPA navigation)
    window.addEventListener('popstate', () =>
      handleRouteChange(window.location.pathname)
    )

    // Cleanup on unmount
    return () => {
      window.removeEventListener('popstate', () =>
        handleRouteChange(window.location.pathname)
      )
    }
  }, [memoizedAction])

  useEffect(() => {
    // Function to handle click events and other relevant interactions
    const trackClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const attributes = getDataAttributes(target, {
        prefix,
        includeAll,
        ignore,
      })

      // Ensure attributes are strings and include elementType
      const eventData: Record<string, string> = {
        event: 'click', // Event type
        elementType: target.tagName.toLowerCase(), // Type of the clicked element (e.g., 'button', 'a', etc.)
        timestamp: new Date().toISOString(), // ISO UTC format timestamp
      }

      // Flatten attributes if necessary and make sure all values are strings
      Object.keys(attributes).forEach((key) => {
        eventData[key] = String(attributes[key])
      })

      memoizedAction(eventData)
    }

    // Add event listener for clicks (you can customize this to specific elements if needed)
    document.addEventListener('click', trackClickEvent)

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', trackClickEvent)
    }
  }, [prefix, includeAll, ignore, memoizedAction])

  return null
}

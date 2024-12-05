import { useEffect } from 'react'
import { getDataAttributes } from '../utils/getDataAttributes.js'
import { UseTrackingOptions } from '../types.js'

export function useTracking(options: UseTrackingOptions) {
  const { prefix, includeAll, ignore, action = false } = options

  useEffect(() => {
    const trackClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Only track if it's a button or a link
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        // Get data attributes from the element
        const attributes = getDataAttributes(target, {
          prefix,
          includeAll,
          ignore,
        })

        // If there are attributes, handle the action
        if (Object.keys(attributes).length > 0) {
          if (action) {
            // If action is provided, run the function with the event data
            action(attributes)
          } else {
            // Default: log the event to the console
            console.log('Tracked Event:', attributes)
          }
        }
      }
    }

    // Attach the click event listener to the document
    document.addEventListener('click', trackClickEvent)

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', trackClickEvent)
    }
  }, [prefix, includeAll, ignore, action])

  return null
}

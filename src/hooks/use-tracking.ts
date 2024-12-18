import { IGNORE_PATTERNS, MEANINGFUL_TAGS } from '@/src/constants'
import { getDataAttributes, getMeaningfulTag } from '@/src/utils'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

export interface UseTrackingOptions {
  prefix?: string
  ignore?: string[]
  meaningfulTags?: string[]
  action?: (data: Record<string, string>) => void
}

export function useTracking({
  prefix = '',
  ignore = IGNORE_PATTERNS,
  meaningfulTags = MEANINGFUL_TAGS,
  action,
}: UseTrackingOptions = {}) {
  // if no action is provided, log to console in development
  if (!action && process.env.NODE_ENV === 'development') {
    action = (data) => console.log(data)
  }

  const url = usePathname()

  const sessionId = useRef(
    Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((n) => n.toString(16))
      .join(''),
  )

  const trackPageView = useCallback(() => {
    action?.({
      sessionId: sessionId.current,
      url,
      event: 'pageview',
      timestamp: new Date().toISOString(),
    })
  }, [action, url])

  const trackClickEvent = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const meaningfulTag = getMeaningfulTag({
        target,
        meaningfulTags,
      })

      if (!meaningfulTag) return

      const attributes = getDataAttributes(meaningfulTag.target, {
        ignore,
        prefix,
      })

      const eventData: Record<string, string> = {
        sessionId: sessionId.current,
        url,
        event: `${meaningfulTag.name}click`,
        timestamp: new Date().toISOString(),
        attributes: JSON.stringify(attributes),
      }

      return action?.(eventData)
    },
    [action, url, ignore, prefix],
  )

  useEffect(() => {
    trackPageView()
  }, [trackPageView])

  useEffect(() => {
    document.addEventListener('click', trackClickEvent)
    return () => {
      document.removeEventListener('click', trackClickEvent)
    }
  }, [trackClickEvent])

  return null
}

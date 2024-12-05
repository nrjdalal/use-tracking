export interface UseTrackingOptions {
  prefix?: string
  includeAll?: 'auto' | 'true' | 'false'
  ignore?: string[]
  action?: (data: Record<string, string>) => void
}

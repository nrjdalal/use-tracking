interface GetDataAttributesOptions {
  prefix?: string
  includeAll?: 'auto' | 'true' | 'false'
  ignore?: string[]
}

export function getDataAttributes(
  target: HTMLElement,
  { prefix, includeAll = 'auto', ignore = [] }: GetDataAttributesOptions = {}
): Record<string, string> {
  if (includeAll === 'true' && ignore.length > 0) {
    throw new Error(
      'Cannot use includeAll="true" with a user-defined ignore array'
    )
  }

  if (prefix && includeAll !== 'auto') {
    throw new Error('Cannot use both prefix and includeAll together')
  }

  if (includeAll === 'auto') {
    ignore = ['class']
  }

  if (includeAll === 'true') {
    ignore = []
  }

  return Array.from(target.attributes)
    .filter((attr) => {
      if (includeAll === 'true') return true
      if (ignore.includes(attr.name)) return false
      if (prefix) return attr.name.startsWith(prefix)
      return !ignore.includes(attr.name)
    })
    .reduce((acc, attr) => {
      const key = prefix ? attr.name.slice(prefix.length) : attr.name
      acc[key] = attr.value
      return acc
    }, {} as Record<string, string>)
}

interface GetDataAttributesOptions {
  ignore?: string[]
  prefix?: string
}

export function getDataAttributes(
  target: HTMLElement,
  { ignore = [], prefix }: GetDataAttributesOptions = {},
): Record<string, string> {
  if (!target) return {}

  return Array.from(target.attributes).reduce(
    (acc, attr) => {
      if (ignore.some((i) => attr.name.startsWith(i))) return acc
      if (prefix && !attr.name.startsWith(prefix)) return acc
      return { ...acc, [attr.name]: attr.value }
    },
    {} as Record<string, string>,
  )
}

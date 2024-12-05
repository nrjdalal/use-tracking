interface GetMeaningfulTagOptions {
  meaningfulTags?: string[]
  target: HTMLElement | null
}

export function getMeaningfulTag({
  meaningfulTags = [],
  target,
}: GetMeaningfulTagOptions): {
  name: string
  target: HTMLElement
} | null {
  if (!target) return null

  const renameTag = (tag: string) => (tag === 'A' ? 'link' : tag.toLowerCase())

  const isMeaningfulTag = (el: HTMLElement) => {
    return !meaningfulTags.length
      ? el
      : meaningfulTags.includes(el.tagName)
        ? el
        : (el.closest(meaningfulTags.join(',')) as HTMLElement | null)
  }

  const meaningfulTag = isMeaningfulTag(target)

  return meaningfulTag
    ? {
        name: renameTag(meaningfulTag.tagName),
        target: meaningfulTag,
      }
    : null
}

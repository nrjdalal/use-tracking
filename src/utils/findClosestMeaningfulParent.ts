/**
 * Finds the closest meaningful parent of the target element.
 * If no meaningful parent is found, returns the target itself.
 *
 * @param target - The initial element that was clicked.
 * @param meaningfulTags - An array of meaningful tag names to check for (e.g., ['button', 'a', 'div']).
 * @returns The closest meaningful parent element or the original target.
 */

export function findClosestMeaningfulParent(
  target: HTMLElement,
  meaningfulTags: string[] = ['button', 'a', 'div']
): HTMLElement {
  // Traverse up the DOM tree to find the closest meaningful element
  return (target.closest(meaningfulTags.join(',')) as HTMLElement) || target
}

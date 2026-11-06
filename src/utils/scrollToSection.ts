import { exitMapEmbedFullscreen } from './mapEmbedFullscreen'

export type SectionScrollBlock = ScrollLogicalPosition

const SECTION_SCROLL_BLOCK: Record<string, SectionScrollBlock> = {
  'map-section': 'center',
}

/** 2025 anchor names still used in some comms links */
export const LEGACY_SECTION_HASH: Record<string, string> = {
  'amoc-section': 'climate-section',
  'elnino-section': 'forecasting-section',
  'southafrica-section': 'international-alliance-section',
}

export function resolveSectionHash(hash: string): string {
  return LEGACY_SECTION_HASH[hash] ?? hash
}

export function getSectionScrollBlock(sectionId: string): SectionScrollBlock {
  return SECTION_SCROLL_BLOCK[sectionId] ?? 'start'
}

export function scrollToSection(
  sectionId: string,
  options?: { behavior?: ScrollBehavior; block?: SectionScrollBlock }
) {
  const element = document.getElementById(sectionId)
  if (!element) return false

  element.scrollIntoView({
    behavior: options?.behavior ?? 'smooth',
    block: options?.block ?? getSectionScrollBlock(sectionId),
  })
  return true
}

/** Leave map fullscreen (if active), wait for layout, then scroll to a section. */
export async function navigateToSection(
  sectionId: string,
  options?: { behavior?: ScrollBehavior; block?: SectionScrollBlock }
): Promise<boolean> {
  await exitMapEmbedFullscreen()
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
  return scrollToSection(sectionId, options)
}

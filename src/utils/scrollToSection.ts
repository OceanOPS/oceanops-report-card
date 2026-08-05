export type SectionScrollBlock = ScrollLogicalPosition

const SECTION_SCROLL_BLOCK: Record<string, SectionScrollBlock> = {
  'map-section': 'center',
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

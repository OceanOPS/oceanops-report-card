const ISO_NAME_FALLBACK: Record<string, string> = {
  FJ: 'Fiji',
  FO: 'Faroe Islands',
  GW: 'Guinea-Bissau',
  TZ: 'Tanzania',
}

/** Prefer export name; resolve ISO acronyms via Intl or static fallback. */
export function resolveCountryDisplayName(
  iso: string,
  name: string,
  locale = 'en',
): string {
  if (name && name !== iso && name.length > 3) return name

  try {
    const display = new Intl.DisplayNames([locale], { type: 'region' }).of(iso)
    if (display && display !== iso) return display
  } catch {
    // Intl unavailable or unknown code
  }

  return ISO_NAME_FALLBACK[iso] ?? name ?? iso
}

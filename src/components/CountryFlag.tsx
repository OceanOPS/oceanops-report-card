import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getGeoCountryCode } from '../utils/geoCountryCodes'
import { getGeoCountryLabel } from '../utils/geoCountryLabels'

type CountryFlagProps = {
  country: string
  size?: 'sm' | 'md'
  className?: string
}

const SIZE_CLASS = {
  sm: 'w-5 h-3.5',
  md: 'w-6 h-4',
} as const

export default function CountryFlag({
  country,
  size = 'sm',
  className = '',
}: CountryFlagProps) {
  const { t } = useTranslation()
  const [failed, setFailed] = useState(false)
  const code = getGeoCountryCode(country)

  if (!code || failed) return null

  const label = getGeoCountryLabel(country)

  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={`${label} ${t('common.flag')}`}
      className={`${SIZE_CLASS[size]} object-cover rounded-[2px] shrink-0 ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

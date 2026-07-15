import type { TFunction } from 'i18next'
import type { RatingStatusKey, RatingValue } from '../types/matureNetworks'

const RATING_STATUS_KEYS: RatingStatusKey[] = [
  'noTarget',
  'noArchive',
  'notApplicable',
  'notCoreMission',
]

export function isRatingStatusKey(value: RatingValue): value is RatingStatusKey {
  return typeof value === 'string' && RATING_STATUS_KEYS.includes(value as RatingStatusKey)
}

export function resolveRatingLabel(value: RatingValue, t: TFunction): string {
  if (typeof value === 'number') {
    return String(value)
  }
  return t(`satelliteObservations.statuses.${value}`)
}

interface StarRatingProps {
  rating: RatingValue
  accentColor?: string
  textColor?: string
  compact?: boolean
}

export function StarRating({
  rating,
  accentColor = 'text-goos-orange-500',
  textColor = 'text-white',
  compact = false,
}: StarRatingProps) {
  if (typeof rating !== 'number') {
    return (
      <span
        className={`${textColor} ${compact ? 'text-xs' : 'text-sm'} italic opacity-80 text-right leading-tight`}
      >
        {/* Label resolved by parent when needed in table cells */}
      </span>
    )
  }

  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className={accentColor}>
        ★
      </span>,
    )
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half" className={`relative ${accentColor}`}>
        <span className="text-gray-100">★</span>
        <span className="absolute inset-0 overflow-hidden w-1/2">★</span>
      </span>,
    )
  }

  const emptyStars = 3 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="text-gray-100">
        ★
      </span>,
    )
  }

  return <div className={`flex gap-0.5 ${compact ? 'text-sm' : 'text-base'}`}>{stars}</div>
}

interface RatingCellProps extends StarRatingProps {
  t: TFunction
}

export function RatingCell({ rating, t, accentColor, textColor, compact }: RatingCellProps) {
  if (typeof rating === 'number') {
    return (
      <StarRating
        rating={rating}
        accentColor={accentColor}
        textColor={textColor}
        compact={compact}
      />
    )
  }

  return (
    <span
      className={`${textColor} ${compact ? 'text-xs' : 'text-sm'} italic opacity-80 text-center leading-tight`}
    >
      {resolveRatingLabel(rating, t)}
    </span>
  )
}

export type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

export type RatingStatusKey =
  | 'noTarget'
  | 'noArchive'
  | 'notApplicable'
  | 'notCoreMission'

export type RatingValue = number | RatingStatusKey

export interface NetworkRatings {
  implementationStatus: RatingValue
  realTime: RatingValue
  archivedHighQuality: RatingValue
  metadata: RatingValue
  bestPractices: RatingValue
}

export interface MatureNetworkDetailsKeys {
  applications: string
  coverage: string
  targets?: string
  maturity?: string
}

export interface MatureNetwork {
  id: string
  sortOrder: number
  iconPath: string
  iconAlt: string
  titleKey: string
  networkUrl: string
  ratings: NetworkRatings
  deliveryAreas: DeliveryAreaKey[]
  yoy: number | null
  detailsKeys: MatureNetworkDetailsKeys
}

export type DeliveryAreaFilter = 'all' | DeliveryAreaKey

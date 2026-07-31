export type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

export type NetworkMaturity = 'mature' | 'emerging'

export type RatingStatusKey =
  | 'noTarget'
  | 'noArchive'
  | 'notApplicable'
  | 'notCoreMission'
  | 'notYetRated'

export type RatingValue = number | RatingStatusKey

export interface NetworkRatings {
  implementationStatus: RatingValue
  realTime: RatingValue
  archivedHighQuality: RatingValue
  metadata: RatingValue
  bestPractices: RatingValue
}

export interface InSituNetworkDetailsKeys {
  applications: string
  coverage: string
  targets?: string
  maturity?: string
}

export interface InSituNetwork {
  id: string
  sortOrder: number
  maturity: NetworkMaturity
  iconPath: string
  iconAlt: string
  titleKey: string
  networkUrl: string
  ratings: NetworkRatings
  deliveryAreas: DeliveryAreaKey[]
  yoy: number | null
  detailsKeys: InSituNetworkDetailsKeys
}

export type DeliveryAreaFilter = 'all' | DeliveryAreaKey

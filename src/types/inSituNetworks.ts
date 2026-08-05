export type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

/** Measured essential ocean / climate variables (EOV-style) used for matrix filtering. */
export type EssentialVariableKey =
  | 'temperature'
  | 'salinity'
  | 'pressure'
  | 'chlorophyll'
  | 'ph'
  | 'oxygen'
  | 'carbonDioxide'
  | 'seaLevel'
  | 'currents'
  | 'waves'
  | 'wind'
  | 'nutrients'
  | 'humidity'
  | 'seaIce'
  | 'biodiversity'

export type EssentialVariableFilter = 'all' | EssentialVariableKey

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
  essentialVariablesMeasured?: string
  implementationProgress?: string
  platformType?: string
  samplingFrequency?: string
  activityTrend?: string
  challenges?: string
  opportunities?: string
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
  essentialVariables: EssentialVariableKey[]
  yoy: number | null
  detailsKeys: InSituNetworkDetailsKeys
}

/** Static network rows in `inSituNetworks.ts` (variables merged from `networkEssentialVariables.ts`). */
export type InSituNetworkRecord = Omit<InSituNetwork, 'essentialVariables'>

export type DeliveryAreaFilter = 'all' | DeliveryAreaKey

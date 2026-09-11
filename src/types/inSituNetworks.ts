export type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

/** GOOS EOVs / GCOS ECVs from the ESAC Ocean variables mapping (one key per CSV column). */
export type EssentialVariableKey =
  | 'seaSurfaceTemperature'
  | 'subsurfaceTemperature'
  | 'seaSurfaceSalinity'
  | 'subsurfaceSalinity'
  | 'surfaceCurrents'
  | 'subsurfaceCurrents'
  | 'seaState'
  | 'seaSurfaceHeight'
  | 'heatFlux'
  | 'seaIce'
  | 'surfaceStress'
  | 'oceanBottomPressure'
  | 'inorganicCarbon'
  | 'oxygen'
  | 'nutrients'
  | 'nitrousOxide'
  | 'particulateMatter'
  | 'transientTracers'
  | 'oceanColour'
  | 'surfaceWind'
  | 'surfaceWaterVapour'
  | 'surfaceAirTemperature'
  | 'airPressure'
  | 'upperAirWind'
  | 'upperAirWaterVapour'
  | 'upperAirTemperature'

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

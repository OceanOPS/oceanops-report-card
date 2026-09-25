import CountryFlag from './CountryFlag'
import { getGeoCountryLabel } from '../utils/geoCountryLabels'

type CountryNameCellProps = {
  country: string
}

export default function CountryNameCell({ country }: CountryNameCellProps) {
  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      <CountryFlag country={country} />
      <span className="truncate">{getGeoCountryLabel(country)}</span>
    </span>
  )
}

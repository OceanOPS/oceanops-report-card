/**
 * SatelliteTable Component
 *
 * Displays a timeline table of Satellite Essential Climate Variables from 1990-2030.
 * Shows the status of each variable with color-coded gradient bars representing
 * adequacy levels: ADEQUATE (orange-500), MARGINAL (orange-300), INADEQUATE (orange-100).
 *
 * @example
 * ```tsx
 * <SatelliteTable />
 * ```
 */

export default function SatelliteTable() {
  return (
    <div className="bg-goos-blue-900 w-full px-12 md:px-16 py-8">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-goos-blue-800 p-0">
              <th className="text-white text-left px-6 py-4 border-b-2 border-goos-blue-900 font-bold w-1/3">
                <div className="text-lg">Satellite Essential Climate Variables Timeline</div>
                <div className="text-sm font-normal">(1990-2030)</div>
              </th>
              <th className="text-white py-4 px-2 border-b-2 border-goos-blue-900 font-medium w-2/3">
                <div className="flex justify-between text-sm whitespace-nowrap p-0">
                  <span>90</span>
                  <span>92</span>
                  <span>94</span>
                  <span>96</span>
                  <span>98</span>
                  <span>00</span>
                  <span>02</span>
                  <span>04</span>
                  <span>06</span>
                  <span>08</span>
                  <span>10</span>
                  <span>12</span>
                  <span>14</span>
                  <span>16</span>
                  <span>18</span>
                  <span>20</span>
                  <span>22</span>
                  <span>24</span>
                  <span className="opacity-50">26</span>
                  <span className="opacity-50">28</span>
                  <span className="opacity-50">30</span>
                </div>
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {/* Sea Ice - Starts 1990 (0%) */}
            <tr>
              <td className="bg-goos-blue-800 text-white px-6 border-b-2 border-goos-blue-900 text-lg">
                Sea Ice
              </td>
              <td className="border-b-2 border-goos-blue-900 p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #F48B25 0%, #F48B25 85%, #F9BF86 97%, #F9BF86 100%)'
                    }}
                  ></div>
                </div>
              </td>
            </tr>

            {/* Ocean Color - Starts 1996 (15%) */}
            <tr>
              <td className="bg-goos-blue-800 text-white px-6 border-b-2 border-goos-blue-900 text-lg">
                Ocean Color
              </td>
              <td className="bg-goos-blue-800 border-b-2 border-goos-blue-900 p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 15%, #F9BF86 15%, #F9BF86 20%, #F48B25 23%, #F48B25 66%, #F48B25 66%, #F9BF86 70%, #F9BF86 82%, #F48B25 86%, #F48B25 100%)'
                    }}
                  ></div>
                </div>
              </td>
            </tr>

            {/* Sea Level - Starts 1992 (5%) */}
            <tr>
              <td className="bg-goos-blue-800 text-white px-6 border-b-2 border-goos-blue-900 text-lg">
                Sea Level
              </td>
              <td className="bg-goos-blue-800 border-b-2 border-goos-blue-900 p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 5%, #F48B25 5%, #F48B25 100%)'
                    }}
                  ></div>
                </div>
              </td>
            </tr>

            {/* Sea Surface Temperature - Starts 1990 (0%) */}
            <tr>
              <td className="bg-goos-blue-800 text-white px-6 border-b-2 border-goos-blue-900 text-lg">
                Sea Surface Temperature
              </td>
              <td className="bg-goos-blue-800 border-b-2 border-goos-blue-900 p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #F48B25 0%, #F48B25 90%, #F9BF86 94%, #F9BF86 100%)'
                    }}
                  ></div>
                </div>
              </td>
            </tr>

            {/* Sea Surface Salinity - Starts 2010 (50%) */}
            <tr>
              <td className="bg-goos-blue-800 text-white px-6 border-b-2 border-goos-blue-900 text-lg">
                Sea Surface Salinity
              </td>
              <td className="bg-goos-blue-800 border-b-2 border-goos-blue-900 p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 50%, #F9BF86 50%, #F9BF86 90%, #FEF2E7 92%, #FEF2E7 95%, #F9BF86 97%, #F9BF86 100%)'
                    }}
                  ></div>
                </div>
              </td>
            </tr>

            {/* Sea State - Starts 1992 (5%) */}
            <tr>
              <td className="bg-goos-blue-800 text-white px-6 border-b-2 border-goos-blue-900 text-lg">
                Sea State
              </td>
              <td className="bg-goos-blue-800 border-b-2 border-goos-blue-900 p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 5%, #F9BF86 5%, #F9BF86 100%)'
                    }}
                  ></div>
                </div>
              </td>
            </tr>

            {/* Wind - Starts 1990 (0%) */}
            <tr>
              <td className="bg-goos-blue-800 text-white px-6 border-b-2 border-goos-blue-900 text-lg">
                Wind
              </td>
              <td className="bg-goos-blue-800 border-b-2 border-goos-blue-900 p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #FEF2E7 0%, #FEF2E7 30%, #F9BF86 35%, #F9BF86 100%)'
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Legend */}
        <div className="flex gap-6 mt-6 items-center flex-wrap text-white">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-goos-orange-100"></div>
            <span className="text-sm">INADEQUATE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-goos-orange-300"></div>
            <span className="text-sm">MARGINAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-goos-orange-500"></div>
            <span className="text-sm">ADEQUATE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

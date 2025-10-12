/**
 * DataTable Component
 *
 * A flexible, fully customizable data table with configurable columns and rows.
 * Supports header row and data rows with optional bold first column.
 * Designed to be used within ContentModule or other content sections.
 *
 * @param columns - Number of columns (1-12)
 * @param headers - Array of header texts (length should match columns)
 * @param rows - Array of row data, each row is an array of cell texts
 * @param firstColumnBold - Make first column bold in data rows (default: true)
 * @param borderColor - Tailwind border color class (default: 'border-goos-blue-700')
 * @param headerBgColor - Tailwind background color for header (default: 'bg-gray-100')
 * @param headerTextColor - Tailwind text color for header (default: 'text-goos-blue-700')
 * @param rowBgColor - Tailwind background color for rows (default: 'bg-gray-100')
 * @param rowTextColor - Tailwind text color for rows (default: 'text-goos-blue-700')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={4}
 *   headers={['Header 1', 'Header 2', 'Header 3', 'Header 4']}
 *   rows={[
 *     ['Row 1 Label', 'Cell 1', 'Cell 2', 'Cell 3'],
 *     ['Row 2 Label', 'Cell 1', 'Cell 2', 'Cell 3'],
 *   ]}
 *   borderColor="border-goos-blue-700"
 *   headerBgColor="bg-gray-100"
 *   headerTextColor="text-goos-blue-700"
 * />
 * ```
 */

interface DataTableProps {
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  headers: string[]
  rows: string[][]
  firstColumnBold?: boolean
  borderColor?: string
  headerBgColor?: string
  headerTextColor?: string
  rowBgColor?: string
  rowTextColor?: string
  className?: string
}

export default function DataTable({
  columns,
  headers,
  rows,
  firstColumnBold = true,
  borderColor = 'border-goos-blue-700',
  headerBgColor = 'bg-gray-100',
  headerTextColor = 'text-goos-blue-700',
  rowBgColor = 'bg-gray-100',
  rowTextColor = 'text-goos-blue-700',
  className = '',
}: DataTableProps) {
  // Map columns to grid classes
  const gridColsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  }

  const gridCols = gridColsMap[columns]

  return (
    <div className={`border ${borderColor} overflow-hidden ${className}`}>
      {/* Header Row */}
      <div className={`grid ${gridCols} ${headerBgColor} border-b-2 ${borderColor}`}>
        {headers.map((header, index) => (
          <div
            key={index}
            className={`p-4 font-bold text-base ${headerTextColor}`}
          >
            {header}
          </div>
        ))}
      </div>

      {/* Data Rows */}
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid ${gridCols} ${rowBgColor} border-b ${borderColor} last:border-b-0`}
        >
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`p-4 text-base ${rowTextColor} ${
                firstColumnBold && cellIndex === 0 ? 'font-bold' : 'font-normal'
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

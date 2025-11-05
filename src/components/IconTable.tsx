/**
 * IconTable Component
 *
 * A flexible data table with support for icons/images and text legends.
 * Similar to DataTable but each cell can contain an icon with a legend below it.
 * Designed to be used within ContentModule or other content sections.
 *
 * @param columns - Number of columns (1-12)
 * @param headers - Array of header texts (length should match columns)
 * @param rows - Array of row data, each row is an array of IconTableCell objects
 * @param borderColor - Tailwind border color class (default: 'border-goos-blue-700')
 * @param headerBgColor - Tailwind background color for header (default: 'bg-gray-100')
 * @param headerTextColor - Tailwind text color for header (default: 'text-goos-blue-700')
 * @param rowBgColor - Tailwind background color for rows (default: 'bg-gray-100')
 * @param rowTextColor - Tailwind text color for rows (default: 'text-goos-blue-700')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <IconTable
 *   columns={3}
 *   headers={['Platform', 'Status', 'Coverage']}
 *   rows={[
 *     [
 *       { icon: '/icons/argo.png', iconSize: 'w-12 h-12', legend: 'Argo Float' },
 *       { icon: '/icons/check.png', iconSize: 'w-8 h-8', legend: 'Operational' },
 *       { legend: 'Global' }  // Text only, no icon
 *     ]
 *   ]}
 *   borderColor="border-goos-blue-700"
 * />
 * ```
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface IconTableCell {
  icon?: string       // URL to icon/image (optional)
  iconSize?: string   // Tailwind size class (e.g., 'w-8 h-8', 'w-12 h-12')
  legend?: string     // Text legend below icon (or standalone text if no icon)
}

interface IconTableProps {
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  headers: string[]
  rows: IconTableCell[][]
  borderColor?: string
  headerBgColor?: string
  headerTextColor?: string
  rowBgColor?: string
  rowTextColor?: string
  className?: string
}

export default function IconTable({
  columns,
  headers,
  rows,
  borderColor = 'border-goos-blue-700',
  headerBgColor = 'bg-gray-100',
  headerTextColor = 'text-goos-blue-700',
  rowBgColor = 'bg-gray-100',
  rowTextColor = 'text-goos-blue-700',
  className = '',
}: IconTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)

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

  // Animate icons with pop-up effect on scroll
  useEffect(() => {
    if (!tableRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No animations for users who prefer reduced motion
      return
    }

    const ctx = gsap.context(() => {
      const icons = tableRef.current?.querySelectorAll('.icon-cell')
      if (!icons || icons.length === 0) return

      gsap.fromTo(
        Array.from(icons),
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08, // 80ms between each icon
          ease: 'back.out(1.5)', // Slight bounce effect
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, tableRef)

    return () => ctx.revert()
  }, [rows.length])

  return (
    <div ref={tableRef} className={`border ${borderColor} overflow-hidden ${className}`}>
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
              className={`icon-cell p-4 flex flex-col items-center gap-2`}
            >
              {/* Icon/Image */}
              {cell.icon && (
                <img
                  src={cell.icon}
                  alt={cell.legend || ''}
                  className={`object-contain ${cell.iconSize || 'w-12 h-12'}`}
                />
              )}

              {/* Legend/Text */}
              {cell.legend && (
                <p className={`text-sm ${rowTextColor} text-center`}>
                  {cell.legend}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

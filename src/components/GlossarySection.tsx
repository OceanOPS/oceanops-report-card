import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContentModule from './ContentModule'
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS, type GlossaryCategory } from '../data/glossaryTerms'

type CategoryFilter = 'all' | GlossaryCategory

function termIdFromHash(hash: string): string | null {
  const match = hash.match(/^#glossary-term-(.+)$/)
  return match ? match[1] : null
}

export default function GlossarySection() {
  const { t } = useTranslation()
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set())

  const terms = useMemo(() => {
    const filtered =
      category === 'all'
        ? GLOSSARY_TERMS
        : GLOSSARY_TERMS.filter((entry) => entry.category === category)

    return [...filtered]
      .map((entry) => ({
        id: entry.id,
        title: t(`glossary.terms.${entry.id}.title`),
        definition: t(`glossary.terms.${entry.id}.definition`),
      }))
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
  }, [category, t])

  useEffect(() => {
    setExpandedIds(new Set())
  }, [category])

  useEffect(() => {
    const openFromHash = () => {
      const id = termIdFromHash(window.location.hash)
      if (!id) return
      setExpandedIds((prev) => new Set(prev).add(id))
      requestAnimationFrame(() => {
        document.getElementById(`glossary-term-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const toggleTerm = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filterButtons: { id: CategoryFilter; labelKey: string }[] = [
    { id: 'all', labelKey: 'glossary.categories.all' },
    ...GLOSSARY_CATEGORIES.map((cat) => ({
      id: cat as CategoryFilter,
      labelKey: `glossary.categories.${cat}`,
    })),
  ]

  return (
    <div id="glossary-section">
      <ContentModule
        title={t('glossary.title')}
        titleLevel="h2"
        layout="split"
        introduction={t('glossary.intro')}
        backgroundColor="bg-goos-white"
        titleColor="text-goos-blue-900"
        textColor="text-goos-gray-800"
        lineColor="bg-goos-orange-500"
      >
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setCategory(btn.id)}
                className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  category === btn.id
                    ? 'border-goos-orange-500 bg-goos-orange-500 text-white'
                    : 'border-goos-blue-300/40 bg-goos-blue-100/50 text-goos-blue-900 hover:border-goos-orange-500/60'
                }`}
              >
                {t(btn.labelKey)}
              </button>
            ))}
          </div>

          <div
            className="divide-y divide-goos-blue-200/60 border-y border-goos-blue-200/60"
            role="list"
          >
            {terms.map((term) => {
              const isExpanded = expandedIds.has(term.id)
              const panelId = `glossary-panel-${term.id}`

              return (
                <div
                  key={term.id}
                  id={`glossary-term-${term.id}`}
                  className="scroll-mt-28"
                  role="listitem"
                >
                  <button
                    type="button"
                    id={`glossary-term-${term.id}-trigger`}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => toggleTerm(term.id)}
                    className="flex w-full items-start justify-between gap-3 py-3 sm:py-3.5 text-left transition-colors hover:bg-goos-blue-100/40 -mx-1 px-1 rounded-sm"
                  >
                    <span className="text-base sm:text-lg font-semibold text-goos-blue-900 leading-snug">
                      {term.title}
                    </span>
                    <span
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-goos-blue-300/50 bg-goos-blue-100/60 text-goos-blue-900"
                      aria-hidden
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={`glossary-term-${term.id}-trigger`}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="pb-3 sm:pb-4 text-sm sm:text-base leading-relaxed text-goos-gray-800 pr-9"
                        dangerouslySetInnerHTML={{ __html: term.definition }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </ContentModule>
    </div>
  )
}

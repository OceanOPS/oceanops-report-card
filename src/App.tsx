import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {t('welcome')}
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          {t('description')}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => changeLanguage('en')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {t('english')}
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            {t('spanish')}
          </button>
          <button
            onClick={() => changeLanguage('fr')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
          >
            {t('french')}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          {t('current_language')}: <span className="font-semibold">{i18n.language}</span>
        </div>
      </div>
    </div>
  )
}

export default App

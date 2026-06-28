export function StatCard({ title, value, subtitle, icon: Icon, accent = 'brand', loading = false }) {
  const accents = {
    brand:   'text-brand-600  dark:text-brand-400  bg-brand-50  dark:bg-brand-900/20',
    success: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    warning: 'text-amber-600  dark:text-amber-400  bg-amber-50  dark:bg-amber-900/20',
    info:    'text-sky-600    dark:text-sky-400    bg-sky-50    dark:bg-sky-900/20',
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-10 w-10 rounded-xl" />
        </div>
        <div className="skeleton h-8 w-24 mb-2" />
        <div className="skeleton h-3 w-20" />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        {Icon && (
          <span className={`p-2.5 rounded-xl ${accents[accent]}`}>
            <Icon size={18} />
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-mono">
        {value}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}

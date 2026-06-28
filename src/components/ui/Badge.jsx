const variants = {
  Active:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  Inactive:   'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  Basic:      'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
  Pro:        'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
  Enterprise: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
}

export function Badge({ label }) {
  const cls = variants[label] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {label === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />}
      {label === 'Inactive' && <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5" />}
      {label}
    </span>
  )
}

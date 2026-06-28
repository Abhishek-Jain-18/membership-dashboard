import { Search, X } from 'lucide-react'
import { MEMBERSHIP_TYPES, STATUSES } from '../../data/mockMembers'

export function MemberFilters({
  query, setQuery,
  typeFilter, setTypeFilter,
  statusFilter, setStatusFilter,
}) {
  const hasFilters = query || typeFilter !== 'All' || statusFilter !== 'All'

  function clearAll() {
    setQuery('')
    setTypeFilter('All')
    setStatusFilter('All')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="search"
          placeholder="Search by name or email…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="
            w-full pl-9 pr-4 py-2 text-sm rounded-lg border
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            border-gray-200 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
          "
        />
      </div>

      {/* Type filter */}
      <select
        value={typeFilter}
        onChange={e => setTypeFilter(e.target.value)}
        className="
          text-sm rounded-lg border px-3 py-2
          bg-white dark:bg-gray-900
          text-gray-700 dark:text-gray-300
          border-gray-200 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-brand-500
        "
      >
        <option value="All">All Plans</option>
        {MEMBERSHIP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        className="
          text-sm rounded-lg border px-3 py-2
          bg-white dark:bg-gray-900
          text-gray-700 dark:text-gray-300
          border-gray-200 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-brand-500
        "
      >
        <option value="All">All Statuses</option>
        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  )
}

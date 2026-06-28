import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Badge } from '../ui/Badge'

const COLUMNS = [
  { key: 'name',           label: 'Name' },
  { key: 'email',          label: 'Email' },
  { key: 'membershipType', label: 'Plan' },
  { key: 'status',         label: 'Status' },
  { key: 'joinedAt',       label: 'Joined' },
]

function SortIcon({ colKey, sortKey, sortDir }) {
  if (sortKey !== colKey) return <ChevronsUpDown size={13} className="text-gray-300 dark:text-gray-600" />
  return sortDir === 'asc'
    ? <ChevronUp size={13} className="text-brand-500" />
    : <ChevronDown size={13} className="text-brand-500" />
}

export function MemberTable({ members, sortKey, sortDir, onSort, loading }) {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {COLUMNS.map(c => (
                <th key={c.key} className="px-4 py-3 text-left">
                  <div className="skeleton h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="bg-white dark:bg-gray-900">
                {COLUMNS.map(c => (
                  <td key={c.key} className="px-4 py-3.5">
                    <div className="skeleton h-3 w-full max-w-[140px]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (members.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">No members found</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    <SortIcon colKey={col.key} sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50 bg-white dark:bg-gray-900">
            {members.map(member => (
              <tr
                key={member.id}
                className="hover:bg-gray-50/70 dark:hover:bg-gray-800/30 transition-colors animate-slide-up"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-brand-700 dark:text-brand-400">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {member.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {member.email}
                </td>
                <td className="px-4 py-3.5">
                  <Badge label={member.membershipType} />
                </td>
                <td className="px-4 py-3.5">
                  <Badge label={member.status} />
                </td>
                <td className="px-4 py-3.5 text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                  {member.joinedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

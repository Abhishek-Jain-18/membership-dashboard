import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useMemberStore } from '../store/memberStore'
import { useMembers } from '../hooks/useMembers'
import { MemberTable } from '../components/members/MemberTable'
import { MemberFilters } from '../components/members/MemberFilters'

export default function Members() {
  const { members, loadingMembers, fetchMembers } = useMemberStore()

  useEffect(() => {
    fetchMembers()
  }, [])

  const {
    filtered,
    query, setQuery,
    typeFilter, setTypeFilter,
    statusFilter, setStatusFilter,
    sortKey, sortDir, toggleSort,
  } = useMembers(members)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Members</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {loadingMembers ? 'Loading…' : `${filtered.length} of ${members.length} members`}
          </p>
        </div>
        <Link
          to="/members/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors self-start sm:self-auto"
        >
          <UserPlus size={16} />
          Add Member
        </Link>
      </div>

      <MemberFilters
        query={query} setQuery={setQuery}
        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
      />

      <MemberTable
        members={filtered}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={toggleSort}
        loading={loadingMembers}
      />
    </div>
  )
}

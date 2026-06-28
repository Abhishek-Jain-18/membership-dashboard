import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, DollarSign, UserPlus, TrendingUp, ArrowRight } from 'lucide-react'
import { useMemberStore } from '../store/memberStore'
import { StatCard } from '../components/ui/StatCard'
import { Badge } from '../components/ui/Badge'

export default function Dashboard() {
  const { members, stats, loadingMembers, loadingStats, fetchMembers, fetchStats } = useMemberStore()

  useEffect(() => {
    fetchMembers()
    fetchStats()
  }, [])

  const loading = loadingMembers || loadingStats
  const recent  = members.slice(0, 5)

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your membership stats at a glance
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          loading={loadingStats}
          title="Active Members"
          value={stats.activeCount.toLocaleString()}
          subtitle="Currently subscribed"
          icon={Users}
          accent="brand"
        />
        <StatCard
          loading={loadingStats}
          title="Monthly Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          subtitle="From active members"
          icon={DollarSign}
          accent="success"
        />
        <StatCard
          loading={loadingStats}
          title="New Today"
          value={stats.newSignupsToday.toLocaleString()}
          subtitle="Signups this calendar day"
          icon={UserPlus}
          accent="info"
        />
        <StatCard
          loading={loadingStats}
          title="Total Members"
          value={stats.totalMembers.toLocaleString()}
          subtitle="All time"
          icon={TrendingUp}
          accent="warning"
        />
      </div>

      {/* Recent members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Members</h3>
          <Link
            to="/members"
            className="inline-flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loadingMembers ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div className="skeleton w-9 h-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3 w-36" />
                  <div className="skeleton h-3 w-48" />
                </div>
                <div className="skeleton h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-10 text-center">
            <p className="text-sm text-gray-400">No members yet.</p>
            <Link to="/members/add" className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline mt-1 inline-block">
              Add your first member →
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-slide-up">
            {recent.map((m, idx) => (
              <div
                key={m.id}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/70 dark:hover:bg-gray-800/20 transition-colors ${
                  idx < recent.length - 1 ? 'border-b border-gray-50 dark:border-gray-800/60' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-brand-700 dark:text-brand-400">
                    {m.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{m.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{m.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge label={m.membershipType} />
                  <Badge label={m.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

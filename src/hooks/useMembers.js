import { useState, useMemo } from 'react'

export function useMembers(members) {
  const [query, setQuery]           = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortKey, setSortKey]       = useState('name')
  const [sortDir, setSortDir]       = useState('asc')

  const filtered = useMemo(() => {
    let result = [...members]

    // Search
    const q = query.toLowerCase().trim()
    if (q) {
      result = result.filter(
        m =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q)
      )
    }

    // Type filter
    if (typeFilter !== 'All') {
      result = result.filter(m => m.membershipType === typeFilter)
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(m => m.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortKey] ?? ''
      let bVal = b[sortKey] ?? ''
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [members, query, typeFilter, statusFilter, sortKey, sortDir])

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return {
    filtered,
    query, setQuery,
    typeFilter, setTypeFilter,
    statusFilter, setStatusFilter,
    sortKey, sortDir, toggleSort,
  }
}

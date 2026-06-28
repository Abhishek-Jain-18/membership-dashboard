import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMembers } from '../hooks/useMembers'

const MEMBERS = [
  { id: '1', name: 'Alice Smith',  email: 'alice@alpha.com', membershipType: 'Pro',        status: 'Active',   joinedAt: '2024-01-01' },
  { id: '2', name: 'Bob Jones',    email: 'bob@beta.com',    membershipType: 'Basic',      status: 'Inactive', joinedAt: '2024-02-01' },
  { id: '3', name: 'Carol White',  email: 'carol@gamma.com', membershipType: 'Enterprise', status: 'Active',   joinedAt: '2024-03-01' },
  { id: '4', name: 'Dave Brown',   email: 'dave@delta.com',  membershipType: 'Pro',        status: 'Active',   joinedAt: '2024-04-01' },
]

describe('useMembers — search', () => {
  it('returns all members when query is empty', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    expect(result.current.filtered.length).toBe(4)
  })

  it('filters by name (case-insensitive)', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => result.current.setQuery('alice'))
    expect(result.current.filtered.length).toBe(1)
    expect(result.current.filtered[0].name).toBe('Alice Smith')
  })

  it('filters by email', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => result.current.setQuery('beta.com'))
    expect(result.current.filtered.length).toBe(1)
    expect(result.current.filtered[0].email).toBe('bob@beta.com')
  })

  it('returns empty array for no match', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => result.current.setQuery('zzznomatch'))
    expect(result.current.filtered.length).toBe(0)
  })
})

describe('useMembers — filters', () => {
  it('filters by membership type', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => result.current.setTypeFilter('Pro'))
    expect(result.current.filtered.every(m => m.membershipType === 'Pro')).toBe(true)
    expect(result.current.filtered.length).toBe(2)
  })

  it('filters by status', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => result.current.setStatusFilter('Inactive'))
    expect(result.current.filtered.length).toBe(1)
    expect(result.current.filtered[0].name).toBe('Bob Jones')
  })

  it('combines search and type filter', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => {
      result.current.setQuery('a')
      result.current.setTypeFilter('Pro')
    })
    // 'a' matches Alice and Dave; both are Pro
    expect(result.current.filtered.every(m => m.membershipType === 'Pro')).toBe(true)
  })
})

describe('useMembers — sorting', () => {
  it('sorts by name ascending by default', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    const names = result.current.filtered.map(m => m.name)
    expect(names).toEqual([...names].sort())
  })

  it('toggles sort direction on same column', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => result.current.toggleSort('name'))
    expect(result.current.sortDir).toBe('desc')
  })

  it('resets to asc when switching columns', () => {
    const { result } = renderHook(() => useMembers(MEMBERS))
    act(() => result.current.toggleSort('name'))  // desc
    act(() => result.current.toggleSort('email')) // new col → asc
    expect(result.current.sortDir).toBe('asc')
    expect(result.current.sortKey).toBe('email')
  })
})

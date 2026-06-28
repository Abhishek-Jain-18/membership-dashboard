import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the API module so tests don't rely on timers or localStorage
vi.mock('../data/mockApi', () => ({
  apiGetMembers: vi.fn(),
  apiGetStats:   vi.fn(),
  apiAddMember:  vi.fn(),
}))

import { apiGetMembers, apiGetStats, apiAddMember } from '../data/mockApi'
import { useMemberStore } from '../store/memberStore'

const SEED = [
  { id: '1', name: 'Alice', email: 'alice@test.com', membershipType: 'Pro',        status: 'Active',   joinedAt: new Date().toISOString().split('T')[0] },
  { id: '2', name: 'Bob',   email: 'bob@test.com',   membershipType: 'Basic',      status: 'Inactive', joinedAt: '2024-01-01' },
  { id: '3', name: 'Carol', email: 'carol@test.com', membershipType: 'Enterprise', status: 'Active',   joinedAt: '2024-06-15' },
]

beforeEach(() => {
  useMemberStore.setState({ members: [], stats: { activeCount: 0, revenue: 0, newSignupsToday: 0, totalMembers: 0 }, loadingMembers: false, loadingStats: false, addingMember: false })
  vi.clearAllMocks()
})

describe('fetchMembers', () => {
  it('loads members from API into store', async () => {
    apiGetMembers.mockResolvedValue(SEED)
    await useMemberStore.getState().fetchMembers()
    expect(useMemberStore.getState().members).toHaveLength(3)
  })

  it('sets loadingMembers true while fetching, false after', async () => {
    let capturedDuring = null
    apiGetMembers.mockImplementation(async () => {
      capturedDuring = useMemberStore.getState().loadingMembers
      return SEED
    })
    await useMemberStore.getState().fetchMembers()
    expect(capturedDuring).toBe(true)
    expect(useMemberStore.getState().loadingMembers).toBe(false)
  })
})

describe('fetchStats', () => {
  it('loads stats from API into store', async () => {
    const mockStats = { activeCount: 2, revenue: 125, newSignupsToday: 1, totalMembers: 3 }
    apiGetStats.mockResolvedValue(mockStats)
    await useMemberStore.getState().fetchStats()
    expect(useMemberStore.getState().stats).toEqual(mockStats)
  })

  it('sets loadingStats true while fetching, false after', async () => {
    let capturedDuring = null
    apiGetStats.mockImplementation(async () => {
      capturedDuring = useMemberStore.getState().loadingStats
      return { activeCount: 0, revenue: 0, newSignupsToday: 0, totalMembers: 0 }
    })
    await useMemberStore.getState().fetchStats()
    expect(capturedDuring).toBe(true)
    expect(useMemberStore.getState().loadingStats).toBe(false)
  })
})

describe('addMember', () => {
  it('prepends new member returned from API', async () => {
    useMemberStore.setState({ members: SEED })
    apiGetStats.mockResolvedValue({ activeCount: 4, revenue: 135, newSignupsToday: 2, totalMembers: 4 })
    const newMember = { id: '99', name: 'Dave', email: 'dave@test.com', membershipType: 'Basic', status: 'Active', joinedAt: new Date().toISOString().split('T')[0] }
    apiAddMember.mockResolvedValue(newMember)

    await useMemberStore.getState().addMember({ name: 'Dave', email: 'dave@test.com', membershipType: 'Basic' })

    const members = useMemberStore.getState().members
    expect(members[0].name).toBe('Dave')
    expect(members).toHaveLength(4)
  })

  it('sets addingMember true while posting, false after', async () => {
    let capturedDuring = null
    apiGetStats.mockResolvedValue({ activeCount: 0, revenue: 0, newSignupsToday: 0, totalMembers: 0 })
    apiAddMember.mockImplementation(async () => {
      capturedDuring = useMemberStore.getState().addingMember
      return { id: '99', name: 'X', email: 'x@x.com', membershipType: 'Basic', status: 'Active', joinedAt: '2025-01-01' }
    })

    await useMemberStore.getState().addMember({ name: 'X', email: 'x@x.com', membershipType: 'Basic' })
    expect(capturedDuring).toBe(true)
    expect(useMemberStore.getState().addingMember).toBe(false)
  })

  it('throws and resets addingMember on API error', async () => {
    apiAddMember.mockRejectedValue(new Error('A member with this email already exists.'))
    await expect(
      useMemberStore.getState().addMember({ name: 'Alice', email: 'alice@test.com', membershipType: 'Pro' })
    ).rejects.toThrow('A member with this email already exists.')
    expect(useMemberStore.getState().addingMember).toBe(false)
  })
})

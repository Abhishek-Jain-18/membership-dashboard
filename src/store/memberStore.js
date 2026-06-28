import { create } from 'zustand'
import { apiGetMembers, apiGetStats, apiAddMember } from '../data/mockApi'

export const useMemberStore = create((set, get) => ({
  members:  [],
  stats:    { activeCount: 0, revenue: 0, newSignupsToday: 0, totalMembers: 0 },

  // Per-action loading flags
  loadingMembers: false,
  loadingStats:   false,
  addingMember:   false,

  fetchMembers: async () => {
    set({ loadingMembers: true })
    try {
      const members = await apiGetMembers()
      set({ members })
    } finally {
      set({ loadingMembers: false })
    }
  },

  fetchStats: async () => {
    set({ loadingStats: true })
    try {
      const stats = await apiGetStats()
      set({ stats })
    } finally {
      set({ loadingStats: false })
    }
  },

  addMember: async (data) => {
    set({ addingMember: true })
    try {
      const newMember = await apiAddMember(data)
      // Optimistically prepend + refresh stats
      set(state => ({
        members: [newMember, ...state.members],
      }))
      // Refresh stats from API so revenue & counts update
      get().fetchStats()
      return newMember
    } finally {
      set({ addingMember: false })
    }
  },
}))

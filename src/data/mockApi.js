/**
 * mockApi.js
 * Simulates a REST API with realistic network latency.
 * All functions return Promises, just like a real fetch() call would.
 */

import { initialMembers } from '../data/mockMembers'

// In-memory "database" — shared across all API calls in a session.
// On first load we seed from initialMembers; after that mutations are reflected.
let db = null

function getDb() {
  if (!db) {
    db = JSON.parse(localStorage.getItem('memberstack-api-db'))
      ?? initialMembers.map(m => ({ ...m }))
  }
  return db
}

function saveDb() {
  localStorage.setItem('memberstack-api-db', JSON.stringify(db))
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay(min = 300, max = 700) {
  return delay(Math.floor(Math.random() * (max - min + 1)) + min)
}

// ─── GET /members ────────────────────────────────────────────────────────────
export async function apiGetMembers() {
  await randomDelay(400, 800)
  return [...getDb()]
}

// ─── POST /members ───────────────────────────────────────────────────────────
export async function apiAddMember(data) {
  await randomDelay(500, 900)

  const db = getDb()

  // Duplicate email check (server-side simulation)
  if (db.some(m => m.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('A member with this email already exists.')
  }

  const newMember = {
    id: crypto.randomUUID(),
    ...data,
    status: 'Active',
    joinedAt: new Date().toISOString().split('T')[0],
  }

  db.unshift(newMember)
  saveDb()

  return newMember
}

// ─── GET /stats ──────────────────────────────────────────────────────────────
// Stats are derived server-side so the client just receives numbers.
import { MEMBERSHIP_PRICES } from '../data/mockMembers'

export async function apiGetStats() {
  await randomDelay(300, 600)
  const members = getDb()
  const today = new Date().toISOString().split('T')[0]
  const active = members.filter(m => m.status === 'Active')

  return {
    activeCount:      active.length,
    revenue:          active.reduce((sum, m) => sum + (MEMBERSHIP_PRICES[m.membershipType] ?? 0), 0),
    newSignupsToday:  members.filter(m => m.joinedAt === today).length,
    totalMembers:     members.length,
  }
}

// ─── Utility: reset DB (useful for tests) ───────────────────────────────────
export function resetApiDb() {
  db = initialMembers.map(m => ({ ...m }))
  localStorage.removeItem('memberstack-api-db')
}
